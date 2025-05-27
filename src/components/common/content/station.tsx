import { Input } from "@/components/ui/input";
import { useDataState } from "@/store/data-store";
import { StationData, Subway } from "@/types/arrival-info";
import React, { useEffect, useState } from "react";

const Station = () => {
  const { stationData, addStationArrivalData } = useDataState();
  const [station, setStation] = useState<string>("");
  // useEffect(() => {
  //   getStationArrivalData(station);
  // }, []);

  const handleAddStation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || station === null) return;
    addStationArrivalData(station);
    setStation("");
  };

  return (
    <div>
      <div className="p-2">
        <Input
          value={station}
          placeholder="잠실"
          onChange={(e) => setStation(e.target.value)}
          onKeyDown={(e) => handleAddStation(e)}
        />
      </div>
      <div>
        {stationData ? (
          stationData.map((s, i) => (
            <StationItem key={i} data={s}></StationItem>
          ))
        ) : (
          <span>역을 추가하세요.</span>
        )}
      </div>
    </div>
  );
};

interface StationItemProps {
  data: StationData;
}

const StationItem = ({ data }: StationItemProps) => {
  return (
    <div>
      <div>
        <span className="text-sm">{data.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        {data.subway.map((s, i) => (
          <SubwayLineItem key={i} data={s} />
        ))}
      </div>
    </div>
  );
};

interface SubwayLineItemProps {
  data: Subway;
}

const SubwayLineItem = ({ data }: SubwayLineItemProps) => {
  return (
    <div>
      <div>
        <span className="text-xs font-bold">{data.name}</span>
      </div>
      <div className="flex gap-8">
        {/* 상행 */}
        <div>
          {data.upLine.map((u, i) => (
            <div key={i}>
              <span className="text-xs">{u.bstatnNm}</span>
              <span className="text-xs">{u.barvlDt}</span>
            </div>
          ))}
        </div>
        {/* 하행 */}
        <div>
          {data.downLine.map((d, i) => (
            <div key={i}>
              <span className="text-xs">{d.bstatnNm}</span>
              <span className="text-xs">{d.barvlDt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Station;
