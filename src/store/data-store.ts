import { subwayIdTransfer, subwayItemCasting } from "@/lib/station";
import { ArrivalInfo, StationData, Subway } from "@/types/arrival-info";
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
  addStationArrivalData: (name: string) => Promise<string>;
  deleteStation: (name: string) => void;
  selectAllStation: () => Promise<string>;
}

export const useDataState = create<DataState>()(
  devtools(
    persist<DataState>(
      (set, get) => ({
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
        addStationArrivalData: async (name) => {
          const res = await ky.get(`api/station?name=${name}`);
          const data: Record<string, any> = await res.json();

          //res.ok => 인증키가 잘못돼도 true

          // code: "ERROR-338"
          // developerMessage: ""
          // link: ""
          // message: "해당 인증키로는 실시간 서비스를 사용할 수 없습니다."
          // status: 500
          // total:0

          if (data.status === 500) return data.message;

          /**
           * 1.역이 동일한지
           * 2-1 동일한경우 =>  하위값변경
           * 2-2 다른경우 => 신규 추가
           */
          set((state) => {
            const existing = state.stationData.find((s) => s.name === name);

            const subwayItems = subwayItemCasting({
              newData: data.realtimeArrivalList,
            });

            return {
              stationData: existing
                ? state.stationData.map((s) =>
                    s.name === name
                      ? {
                          ...s,
                          selectedAt: new Date(),
                          subway: subwayItems,
                        }
                      : s
                  )
                : [
                    ...state.stationData,
                    new StationData({
                      name,
                      subway: subwayItems,
                      selectedAt: new Date(),
                    }),
                  ],
            };
          });
          const { stationData } = get();

          return data.errorMessage.message;
        },

        deleteStation: (name) => {
          set((state) => ({
            stationData: state.stationData.filter((s) => s.name !== name),
          }));
        },

        selectAllStation: async () => {
          const { stationData } = get();
          if (stationData.length < 0) return "조회할 역이 존재하지 않습니다.";

          const req = stationData.map((s) =>
            ky.get(`api/station?name=${s.name}`)
          );

          await Promise.all(req).then((responses) => {
            Promise.all(
              responses.map(async (res) => {
                console.log(res);
                const searchParams = new URL(res.url).searchParams;
                console.log(searchParams.get("name"));
                const data: Record<string, any> = await res.json();

                const subwayItems = subwayItemCasting({
                  newData: data.realtimeArrivalList,
                });

                set((state) => ({
                  stationData: state.stationData.map((s) =>
                    s.name === searchParams.get("name")
                      ? { ...s, selectedAt: new Date(), subway: subwayItems }
                      : s
                  ),
                }));
              })
            );
          }).catch;

          return "정상 처리되었습니다";
        },
      }),
      { name: "data-store" }
    )
  )
);
