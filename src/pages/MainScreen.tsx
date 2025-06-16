import { useState } from "react";
import useCustomWebSocket from "../hooks/useSocket";
import LineChart from "../components/chart/LineChart";
const MainScreen = () => {
  const { chatMessages, send, readyState } = useCustomWebSocket();
  const label = ["Giá trị"];
  return (
    <div>
      <h1>WebSocket Binance Dashboard</h1>
      <div>
        <LineChart labels={label} dataPoints={chatMessages} />
      </div>
    </div>
  );
};
export default MainScreen;
