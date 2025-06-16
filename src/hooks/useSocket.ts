import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
interface WebsocketMessage {
  type: string;
  notifications: string[];
}

const useCustomWebSocket = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const socketUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
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

  useEffect(() => {
    if (lastJsonMessage) {
      // console.log("📩 Message from socket:", lastJsonMessage);
      // const trade = lastJsonMessage as any;
      // const price = trade?.p;
      // if (price) {
      //   setChatMessages((prev) => [...prev, `${price}`]);
      // }
    }
  }, [lastJsonMessage]);

  const send = (message: { type: string; content: string }) => {
    sendJsonMessage(message);
  };

  return {
    chatMessages,
    send,
    readyState,
  };
};

export default useCustomWebSocket;
