import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { lineColor } from "@/lib/station";
import { useDataState } from "@/store/data-store";
import { StationData, Subway } from "@/types/arrival-info";
import dayjs from "dayjs";
import { RotateCcw, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RefreshButton } from "./contents";

const Station = () => {
  const { stationData, addStationArrivalData, selectAllStation } =
    useDataState();
  const [views, setViews] = useState<Date>();
  const [station, setStation] = useState<string>("");

  const handleAddStation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || station === null) return;
    addStationArrivalData(station);
    setStation("");
  };

  useEffect(() => {
    handleAllSelect();
  }, []);

  const handleAllSelect = () => {
    selectAllStation();
    setViews(new Date());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2">
        <Input
          value={station}
          placeholder="잠실"
          onChange={(e) => setStation(e.target.value)}
          onKeyDown={(e) => handleAddStation(e)}
        />
      </div>
      <RefreshButton date={views} onClick={handleAllSelect} />
      <ScrollArea className="h-full min-h-0">
        <div
          className="h-full flex flex-col gap-2
      "
        >
          {stationData.length > 0 ? (
            stationData.map((s, i) => (
              <StationItem key={i} data={s}></StationItem>
            ))
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm ">지하철역을 추가하세요.</span>
            </div>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

interface StationItemProps {
  data: StationData;
}

const StationItem = ({ data }: StationItemProps) => {
  const { deleteStation } = useDataState();

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{data.name}</span>
        <XIcon
          className="w-4 h-4 text-gray-500 hover:text-gray-600 hover:cursor-pointer"
          onClick={() => deleteStation(data.name)}
        />
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        {data
          ? data.subway?.map((s, i) => <SubwayLineItem key={i} data={s} />)
          : null}
      </div>
    </div>
  );
};

interface SubwayLineItemProps {
  data: Subway;
}

const SubwayLineItem = ({ data }: SubwayLineItemProps) => {
  const [backColor, setBackColor] = useState<string>("#000000");
  useEffect(() => {
    const getColor = async () => {
      const color = await lineColor(data.name); // await 추가
      setBackColor(color);
    };
    getColor();
  }, [data.name]);
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex items-center">
        <span
          className={`text-xs text-white rounded-3xl text-center px-2 `}
          style={{ backgroundColor: backColor }}
        >
          {data.name}
        </span>
      </div>
      <div className="flex gap-2 f-ull">
        {/* 상행 */}
        <div className="flex-1 flex flex-col gap-1">
          {data.upLine.map((u, i) => {
            const time = Math.floor(parseInt(u.barvlDt) / 60);
            return (
              <div key={i} className="w-full flex justify-between">
                <span className="text-xs">{u.bstatnNm}</span>
                <span className="text-xs">{time}분</span>
              </div>
            );
          })}
        </div>
        <div className="h-full w-[1px] bg-gray-300" />
        {/* 하행 */}
        <div className="flex-1 flex flex-col gap-1">
          {data.downLine.map((d, i) => {
            const time = Math.floor(parseInt(d.barvlDt) / 60);
            return (
              <div key={i} className="w-full flex justify-between">
                <span className="text-xs">{d.bstatnNm}</span>
                <span className="text-xs">{time}분</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Station;
