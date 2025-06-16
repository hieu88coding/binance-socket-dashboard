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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

type Props = {
  labels: string[];
  dataPoints: string[];
};

const LineChart = ({ labels, dataPoints }: Props) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Tổng số giao dịch",
        data: dataPoints,
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
        beginAtZero: true,
        ticks: {
          callback: (value) => value,
        },
        title: {
          display: true,
          text: "Lượng giao dịch",
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
