// components/charts/CountChart.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import type { WebsocketMessage } from "../../types/binance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  dataPoints: WebsocketMessage[];
};

const LineChart = ({ dataPoints }: Props) => {
  const labels = dataPoints.map(
    (item) => new Date(item.T).toLocaleTimeString() // Hoặc dùng item.a hoặc index
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Giá tiền USDT",
        data: dataPoints.map((item) => parseFloat(item.p)),
        borderColor: "#4A90E2",
        backgroundColor: "#D4EDFB",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        // fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHitRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index" },
    },
    scales: {
      y: {
        // beginAtZero: true,
        ticks: {
          callback: (value) => value,
        },
        title: {
          display: true,
          text: "Giá ($)",
        },
      },
      // x: {
      //   ticks: {
      //     autoSkip: true,
      //     maxTicksLimit: 20,
      //   },
      // },
    },
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
