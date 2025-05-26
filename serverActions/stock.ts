import WebSocket from "ws";

export async function connectionToKiwoom(stockCode: string) {
  const ws = new WebSocket("wss://api.kiwoom.com:10000/api/dostk/websocket");

  return new Promise((resolve) => {
    ws.on("open", () => {
      ws.send(JSON.stringify({ stockCode }));
      resolve({ success: true });
    });
  });
}
