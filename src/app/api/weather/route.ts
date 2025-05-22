import api from "@/lib/api-manager";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  //process.env.AUTH_KMA_KEY 키없는 경우 리턴
  if (!process.env.AUTH_KMA_KEY) return console.log("기상청 조회 KEY 없음");

  const params = new URLSearchParams({
    ServiceKey: process.env.AUTH_KMA_KEY,
    dataType: "JSON",
    base_date: dayjs(new Date()).format("YYYYMMDD"),
    base_time: "0500",
    ...Object.fromEntries(searchParams.entries()),
  });
  console.log(params);
  try {
    const res = await api.get(
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
      {
        searchParams: params,
      }
    );
    console.log(res.url);
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
