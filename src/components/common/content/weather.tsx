import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDataState } from "@/store/data-store";
import { DisplayWeather, WeatherData } from "@/types/weather-data";
import { format } from "date-fns";
import ky from "ky";
import {
  CloudMoon,
  CloudSun,
  Cloudy,
  RotateCcwIcon,
  Sun,
  SunMoon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { RefreshButton } from "./contents";

const getWeather = async (url: string) => {
  const res = await ky.get(url);
  const data: Record<string, any> = await res.json();

  return data;
};

const Weather = () => {
  const [selectDate, setSelectDate] = useState<Date>();
  const { weatherData, getWeatherData } = useDataState();
  // 옵션 수정할 수 있도록 할지말지 고민중
  const [queryString, setQueryString] = useState<Record<string, string>>({
    pageNo: "1",
    numOfRows: "1000",
    nx: "60",
    ny: "127",
  });
  const WEATHER_API_URL = `/api/weather?pageNo=${queryString.pageNo}&numOfRows=${queryString.numOfRows}&nx=${queryString.nx}&ny=${queryString.ny}`;

  useEffect(() => {
    handleSelectWeather();
  }, []);

  const handleSelectWeather = () => {
    getWeatherData(WEATHER_API_URL);
    setSelectDate(new Date());
  };

  return (
    <div>
      <RefreshButton date={selectDate} onClick={handleSelectWeather} />
      <ScrollArea className="flex h-full ">
        <div className="flex gap-4 overflow-auto h-full">
          {weatherData !== null && weatherData[0]?.times
            ? weatherData
                .slice(0, 3)
                .map((dayData, dayIndex) =>
                  dayData.times.map((timeData, timeIndex) => (
                    <MiniBox
                      key={`${dayIndex}-${timeIndex}`}
                      data={timeData.items}
                    />
                  ))
                )
            : null}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

interface miniBoxProps {
  data: DisplayWeather;
}

const MiniBox = ({ data }: miniBoxProps) => {
  const renderSkyIcon = (skyValue: string, time: string) => {
    const v = parseInt(skyValue);
    const t = parseInt(time);
    switch (v) {
      case 1 || 2:
        return (t >= 18 && t < 24) || t <= 6 ? (
          <SunMoon className="text-blue-800" />
        ) : (
          <Sun className="text-yellow-500" />
        );

      case 3:
        return (t >= 18 && t < 24) || t <= 6 ? (
          <CloudMoon className="text-gray-500" />
        ) : (
          <CloudSun className="text-gray-500" />
        );
      case 4:
        return <Cloudy className="text-gray-500" />;
      default:
        return <Cloudy />;
    }
  };
  return (
    <div className="flex flex-col justify-between p-2 flex-1 gap-2">
      <span className="text-xs text-center">{data.tmpValue}°C</span>
      <span className="text-xs text-center">
        {renderSkyIcon(data.skyValue!, data.time!.slice(0, 2))}{" "}
      </span>
      <span className="text-xs text-center">{data.popValue}%</span>
      <span className="text-xs whitespace-nowrap text-center">{`${data.time?.slice(
        0,
        2
      )}시`}</span>
    </div>
  );
};

export default Weather;
