import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  searchParams.set("ServiceKey", process.env.AUTH_HOLIDAY_KEY!);
  searchParams.set("_type", "json");
  searchParams.set("numOfRows", "100");

  const res = await ky.get(
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo",
    {
      searchParams: searchParams,
    }
  );

  const data = await res.text();

  return new NextResponse(data, { status: res.status });
}
