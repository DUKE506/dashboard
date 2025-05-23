import { useDataState } from "@/store/data-store";
import { DisplayWeather, WeatherData } from "@/types/weather-data";
import ky from "ky";
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

  useEffect(() => {
    console.log(weatherData);
    console.log(weatherData[0].times.length);
  }, [weatherData]);

  return (
    <div className="flex gap-4 overflow-auto">
      {weatherData[0].times.map((t, i) => (
        <MiniBox key={i} data={t.items} />
      ))}
    </div>
  );
};

interface miniBoxProps {
  data: DisplayWeather;
}

const MiniBox = ({ data }: miniBoxProps) => {
  return (
    <div className="flex flex-col gap-1 p-2">
      <span className="text-xs text-center">{data.tmpValue}°C</span>
      <span className="text-xs text-center">{data.skyValue}</span>
      <span className="text-xs text-center">{data.popValue}</span>
      <span className="text-xs whitespace-nowrap text-center">{`${data.time?.slice(
        0,
        2
      )}시`}</span>
    </div>
  );
};

export default Weather;
