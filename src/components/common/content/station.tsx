import { Input } from "@/components/ui/input";
import { useDataState } from "@/store/data-store";
import React, { useEffect, useState } from "react";

const Station = () => {
  const { stationData, getStationArrivalData } = useDataState();
  const [station, setStation] = useState<string>("");
  useEffect(() => {
    getStationArrivalData(station);
  }, []);
  return (
    <div>
      <div className="p-2">
        <Input value={station} onChange={(e) => setStation(e.target.value)} />
      </div>
      <div>
        {stationData ? (
          stationData.map((s, i) => <div key={i}>{s.name}</div>)
        ) : (
          <span>역을 추가하세요.</span>
        )}
      </div>
    </div>
  );
};

export default Station;
