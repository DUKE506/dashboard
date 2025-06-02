import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  console.log(searchParams.get("name"));
  if (!searchParams)
    return NextResponse.json(
      { error: "지하철명을 입력해주세요." },
      { status: 500 }
    );
  try {
    const res = await ky.get(
      `http://swopenapi.seoul.go.kr/api/subway/${process.env.AUTH_STATION_KEY
      }/json/realtimeStationArrival/1/5/${searchParams.get("name")}`
    );
    const data = await res.text();

    return new NextResponse(data, { status: res.status });
  } catch (err) { }
}
