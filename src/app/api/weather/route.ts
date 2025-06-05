import api from "@/lib/api-manager";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  //process.env.AUTH_KMA_KEY 키없는 경우 리턴
  if (!process.env.AUTH_KMA_KEY) return console.log("기상청 조회 KEY 없음");

  var base_time = "0500";

  const curTime = parseInt(dayjs(new Date()).format("HHmm"));
  if (curTime > 214 && curTime < 515) {
    base_time = "0200";
  }
  if (curTime > 514 && curTime < 815) {
    base_time = "0500";
  }
  if (curTime > 814 && curTime < 1115) {
    base_time = "0800";
  }
  if (curTime > 1114 && curTime < 1415) {
    base_time = "1100";
  }
  if (curTime > 1414 && curTime < 1715) {
    base_time = "1400";
  }
  if (curTime > 1714 && curTime < 2015) {
    base_time = "1700";
  }
  if (curTime > 2014 && curTime < 2315) {
    base_time = "2000";
  }
  if (curTime > 2314 || curTime < 215) {
    base_time = "2300";
  }

  const params = new URLSearchParams({
    ServiceKey: process.env.AUTH_KMA_KEY,
    dataType: "JSON",
    base_date: dayjs(new Date()).format("YYYYMMDD"),
    base_time,
    ...Object.fromEntries(searchParams.entries()),
  });

  try {
    const res = await api.get(
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
      {
        searchParams: params,
      }
    );

    const data = await res.text();

    return new NextResponse(data, { status: res.status });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Naver API" },
      { status: 500 }
    );
  }
}
