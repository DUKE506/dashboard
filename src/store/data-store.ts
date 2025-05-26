import { StationData } from "@/types/arrival-info";
import {
  DisplayWeather,
  WeatherData,
  WeatherDateGroup,
  WeatherTimeGroup,
} from "@/types/weather-data";
import ky from "ky";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DataState {
  //네이버 뉴스
  naverData: NaverNewsData | undefined;
  setNaverData: (data: NaverNewsData) => void;

  //단기예보
  weatherData: WeatherDateGroup[];
  setWeatherData: (data: WeatherDateGroup) => void;
  getWeatherData: (url: string) => Promise<boolean>;

  //지하철 도착
  stationData: StationData[];
  getStationArrivalData: (name: string) => Promise<boolean>;
}

export const useDataState = create<DataState>()(
  devtools(
    persist<DataState>(
      (set) => ({
        naverData: undefined,
        setNaverData: (data) => {
          set({ naverData: data });
        },
        weatherData: [],
        stationData: [],
        setWeatherData: () => {},
        getWeatherData: async (url) => {
          const res = await ky.get(url);

          const data: Record<string, any> = await res.json();

          var weather: WeatherData[] = data.response.body.items.item;

          weather = weather.filter((w) => {
            // console.log(w.category);
            // console.log(["POP", "SKY", "TMP"].includes(w.category));
            return ["POP", "SKY", "TMP"].includes(w.category);
          });

          const dateMap = new Map<string, Map<string, DisplayWeather>>();

          for (const w of weather) {
            const date = w.fcstDate;
            const time = w.fcstTime;

            //현재 동일 날짜가 없는 경우 생성
            if (!dateMap.has(date)) {
              dateMap.set(date, new Map());
            }

            const timeMap = dateMap.get(date);

            //현재 날짜에 시간이 존재하지않는 경우
            if (!timeMap?.has(time)) {
              timeMap?.set(time, {});
            }

            const timeObj = timeMap?.get(time);

            if (!timeObj) continue;
            timeObj.time = time;

            if (w.category === "POP") {
              timeObj.popValue = w.fcstValue;
            }
            if (w.category === "SKY") {
              timeObj.skyValue = w.fcstValue;
            }
            if (w.category === "TMP") {
              timeObj.tmpValue = w.fcstValue;
            }
          }

          const result: WeatherDateGroup[] = [];

          for (const [date, timeMap] of dateMap.entries()) {
            const timeGroups: WeatherTimeGroup[] = [];

            for (const [time, items] of timeMap.entries()) {
              timeGroups.push({ time, items });
            }

            result.push({ date: date, times: timeGroups });
          }

          set({ weatherData: result });

          return await res.ok;
        },
        getStationArrivalData: async (name) => {
          const res = await ky.get(`api/station?name=${name}`);
          const data: Record<string, any> = await res.json();

          if (!res.ok) return res.ok;

          const newStationData: StationData = {
            name,
            arrivalInfo: data.realtimeArrivalList.map(
              (a: Record<string, any>) => {
                const { subwayId, updnLine, barvlDt } = a;
                return {
                  subwayId,
                  updnLine,
                  barvlDt,
                  subwayName: name,
                };
              }
            ),
          };

          set((state) => ({
            stationData: [...state.stationData, newStationData],
          }));

          return res.ok;
        },
      }),
      { name: "data-store" }
    )
  )
);
