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
  addStationArrivalData: (name: string) => Promise<boolean>;
  deleteStation: (name: string) => void;
  selectAllStation: () => Promise<boolean>;
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

          if (!res.ok) return res.ok;

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

            // //호선별 그룹화
            // const subwayGroup = data.realtimeArrivalList.reduce(
            //   (acc: any, obj: any) => {
            //     let key = subwayIdTransfer(obj.subwayId);

            //     // console.log("키값 : ", key);
            //     if (!acc[key]) {
            //       acc[key] = { upLine: [], downLine: [] };
            //     }
            //     const upDown = obj.ordkey.slice(0, 1);
            //     // console.log("상하행 : ", upDown);
            //     if (upDown === "0") {
            //       //상행
            //       acc[key].upLine.push(
            //         new ArrivalInfo({
            //           subwayId: obj.subwayId,
            //           subwayName: name,
            //           updnLine: obj.updnLine,
            //           bstatnNm: obj.bstatnNm,
            //           barvlDt: obj.barvlDt,
            //         })
            //       );
            //     } else {
            //       acc[key].downLine.push(
            //         new ArrivalInfo({
            //           subwayId: obj.subwayId,
            //           subwayName: name,
            //           updnLine: obj.updnLine,
            //           bstatnNm: obj.bstatnNm,
            //           barvlDt: obj.barvlDt,
            //         })
            //       );
            //     }

            //     return acc;
            //   },
            //   {}
            // );

            // const subway = Object.entries(subwayGroup).map(([key, value]) => {
            //   return new Subway({
            //     name: key,
            //     upLine: subwayGroup[key].upLine,
            //     downLine: subwayGroup[key].downLine,
            //   });
            // });

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

          console.log(stationData);

          return res.ok;
        },

        deleteStation: (name) => {
          set((state) => ({
            stationData: state.stationData.filter((s) => s.name !== name),
          }));
        },

        selectAllStation: async () => {
          const { stationData } = get();
          if (stationData.length < 0) return false;

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

          return true;
        },
      }),
      { name: "data-store" }
    )
  )
);
