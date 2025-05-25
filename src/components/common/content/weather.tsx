import { ScrollArea } from "@/components/ui/scroll-area";
import { useDataState } from "@/store/data-store";
import { DisplayWeather, WeatherData } from "@/types/weather-data";
import ky from "ky";
import { CloudMoon, CloudSun, Cloudy, Sun, SunMoon } from "lucide-react";
import React, { useEffect, useState } from "react";

const getWeather = async (url: string) => {
  const res = await ky.get(url);
  const data: Record<string, any> = await res.json();

  return data;
};

const Weather = () => {
  const { weatherData, getWeatherData } = useDataState();
  const [queryString, setQueryString] = useState<Record<string, string>>({
    pageNo: "1",
    numOfRows: "1000",
    nx: "60",
    ny: "127",
  });
  const WEATHER_API_URL = `/api/weather?pageNo=${queryString.pageNo}&numOfRows=${queryString.numOfRows}&nx=${queryString.nx}&ny=${queryString.ny}`;

  useEffect(() => {
    getWeatherData(WEATHER_API_URL);
  }, []);


  return (
    <div className="flex gap-4 overflow-auto">
      {
        weatherData !== null && weatherData[0]?.times ?
          weatherData.slice(0, 3).map((dayData, dayIndex) =>
            dayData.times.map((timeData, timeIndex) => (
              <MiniBox key={`${dayIndex}-${timeIndex}`} data={timeData.items} />
            ))
          )
          : null
      }
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
        return (t >= 18 && t < 24) || t <= 6 ? <SunMoon className="text-blue-800" /> : <Sun className="text-yellow-500" />

      case 3:
        return (t >= 18 && t < 24) || t <= 6 ? <CloudMoon className="text-gray-500" /> : <CloudSun className="text-gray-500" />
      case 4: return <Cloudy className="text-gray-500" />
      default:
        return <Cloudy />
    }
  }
  return (
    <div className="flex flex-col gap-2 p-2 ">
      <span className="text-xs text-center">{data.tmpValue}°C</span>
      <span className="text-xs text-center">{renderSkyIcon(data.skyValue!, data.time!.slice(
        0,
        2
      ))} </span>
      <span className="text-xs text-center">{data.popValue}%</span>
      <span className="text-xs whitespace-nowrap text-center">{`${data.time?.slice(
        0,
        2
      )}시`}</span>
    </div>
  );
};


export default Weather;
