"use client";
import ky from "ky";
import React, { useEffect, useState } from "react";
import { connectionToKiwoom } from "../../../../serverActions/stock";

const Stock = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [stockData, setStockData] = useState(null);
  const [stockCode, setStockCode] = useState("005930"); // 삼성전자
  const [loading, setLoading] = useState(false);

  const connectToKiwoom = async () => {
    try {
      setLoading(true);
      const res = await ky.get("api/stock");

      const result = await res.json();
      console.log("결과 : ", result);
      setLoading(false);
    } catch (err) {
      setConnectionStatus("error");
      console.error("연결 요청 실패:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    connectToKiwoom();
  }, []);
  return <div>증권</div>;
};

export default Stock;
