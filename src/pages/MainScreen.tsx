import useCustomWebSocket from "../hooks/useSocket";
import LineChart from "../components/chart/LineChart";
import CandlestickChart from "../components/chart/CandlestickChart";
import "./mainScreen.scss";
const MainScreen = () => {
  const { chatMessages, candleData } = useCustomWebSocket();
  return (
    <div className="container">
      <div className="chart-container">
        <h1>Nến - USDT ($)</h1>
        <div>
          <CandlestickChart dataPoints={candleData} />
        </div>
      </div>
      <div className="chart-container">
        <h1>Biến động giá - USDT ($)</h1>
        <div>
          <LineChart dataPoints={chatMessages} />
        </div>
      </div>
    </div>
  );
};
export default MainScreen;
