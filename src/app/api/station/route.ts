import ky from "ky";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await ky.get(
      `http://swopenapi.seoul.go.kr/api/subway/${process.env.AUTH_SEOUL_KEY}/json/realtimeStationArrival/1/5/%EA%B0%80%EC%B2%9C%EB%8C%80`
    );
    const data = await res.text();

    return new NextResponse(data, { status: res.status });
  } catch (err) {}
}
