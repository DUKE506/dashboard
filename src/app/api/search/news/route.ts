import ky from "ky";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  try {
    const res = await ky.get("https://openapi.naver.com/v1/search/news", {
      searchParams: searchParams,
      headers: {
        "X-Naver-Client-Id": process.env.AUTH_NAVER_ID,
        "X-Naver-Client-Secret": process.env.AUTH_NAVER_CLIENT,
      },
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Naver API" },
      { status: 500 }
    );
  }
};
