export class WeatherDateGroup {
  date: string;
  times: WeatherTimeGroup[];

  constructor({ date, times }: { date: string; times: WeatherTimeGroup[] }) {
    this.date = date;
    this.times = times;
  }
}

export class WeatherTimeGroup {
  time: string;
  items: DisplayWeather;
  constructor({ time, items }: { time: string; items: DisplayWeather }) {
    this.time = time;
    this.items = items;
  }
}

export class DisplayWeather {
  popValue?: string;
  skyValue?: string;
  tmpValue?: string;
  time?: string;

  constructor({
    popValue,
    skyValue,
    tmpValue,
    time,
  }: {
    popValue?: string;
    skyValue?: string;
    tmpValue?: string;
    time?: string;
  }) {
    this.popValue = popValue;
    this.skyValue = skyValue;
    this.tmpValue = tmpValue;
    this.time = time;
  }
}

export class WeatherData {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;

  constructor({
    baseDate,
    baseTime,
    category,
    fcstDate,
    fcstTime,
    fcstValue,
    nx,
    ny,
  }: {
    baseDate: string;
    baseTime: string;
    category: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    nx: number;
    ny: number;
  }) {
    this.baseDate = baseDate;
    this.baseTime = baseTime;
    this.category = category;
    this.fcstDate = fcstDate;
    this.fcstTime = fcstTime;
    this.fcstValue = fcstValue;
    this.nx = nx;
    this.ny = ny;
  }
}

const WeatherCategory = {
  POP: "강수확률",
  PTY: "강수형태",
  PCP: "1시간 강수량",
  TMP: "기온",
  TMN: "최저기온",
  TMX: "최고기온",
  REH: "습도",
  SKY: "하늘상태",
  SNO: "신적설",
  WSD: "풍속",
  VEC: "풍향",
  WAV: "파고",
  UUU: "풍속(동서)",
  VVV: "풍속(남북)",
} as const;

export type WeatherCategory =
  (typeof WeatherCategory)[keyof typeof WeatherCategory];
