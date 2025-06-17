import { useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import type { CandlestickMessage, WebsocketMessage } from "../types/binance";

const useCustomWebSocket = () => {
  const [chatMessages, setChatMessages] = useState<WebsocketMessage[]>([]);
  const [candleData, setCandleData] = useState<CandlestickMessage[]>([]);
  const socketUrl =
    "wss://stream.binance.com:9443/stream?streams=btcusdt@aggTrade/btcusdt@kline_1m";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("WebSocket connection established"),
      onClose: () => console.log("WebSocket connection closed"),
      onError: (error) => {
        console.error("WebSocket error:", error);
      },
      shouldReconnect: (closeEvent) => true, // Automatically reconnect
    }
  );

  function throttle<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T {
    let lastCall = 0;
    return function (...args: any[]) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    } as T;
  }
  const throttledUpdate = useMemo(() => {
    return throttle((message: any) => {
      if (message) {
        console.log("socket data", message);
        if (message?.data?.e === "aggTrade") {
          setChatMessages((prev) => [...prev, message.data]);
        }

        if (message?.data?.e === "kline") {
          setCandleData((prev) => {
            const latest = message?.data.k; // cây nến mới từ socket

            const existingIndex = prev.findIndex((d) => d.k.t === latest.t);

            if (existingIndex !== -1) {
              // Nếu đã có cây nến cùng timestamp → cập nhật lại
              const updated = [...prev];
              updated[existingIndex] = { ...prev[existingIndex], k: latest };
              return updated;
            } else {
              // Nếu chưa có → thêm mới
              return [...prev, { ...message?.data }];
            }
          });
        }
      }
    }, 5000); // cập nhật 5s 1 lần
  }, []);

  useEffect(() => {
    if (lastJsonMessage) {
      throttledUpdate(lastJsonMessage);
    }
  }, [lastJsonMessage, throttledUpdate]);

  const send = (message: { type: string; content: string }) => {
    sendJsonMessage(message);
  };

  return {
    chatMessages,
    send,
    readyState,
    candleData,
  };
};

export default useCustomWebSocket;
