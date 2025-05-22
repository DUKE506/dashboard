import ky from "ky";
import React, { useEffect, useState } from "react";

const getWeather = async (url: string) => {
  const res = await ky.get(url);
  const data = await res.json();
  console.log(data);
  return data;
};

const Weather = () => {
  const [queryString, setQueryString] = useState<Record<string, string>>({
    pageNo: "1",
    numOfRows: "1000",
    nx: "60",
    ny: "127",
  });
  const WEATHER_API_URL = `/api/weather?pageNo=${queryString.pageNo}&numOfRows=${queryString.numOfRows}&nx=${queryString.nx}&ny=${queryString.ny}`;

  useEffect(() => {
    const fetch = async () => {
      await getWeather(WEATHER_API_URL);
    };
    fetch();
  }, []);

  return <div>Weather</div>;
};

export default Weather;
