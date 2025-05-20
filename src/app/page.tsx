"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  // console.log("데이터 : ", data);
  // console.log("상태 : ", status);

  return <div>{data ? <span>{data.user?.name}님 환영합니다.</span> : ""}</div>;
}
