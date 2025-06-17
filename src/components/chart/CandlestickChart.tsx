import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import type { CandlestickMessage } from "../../types/binance";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  CandlestickController,
  CandlestickElement
);

type Props = {
  dataPoints: CandlestickMessage[];
};

const CandlestickChart = ({ dataPoints }: Props) => {
  const data = {
    datasets: [
      {
        label: "Biểu đồ nến BTC/USDT",
        data: dataPoints.map((item) => ({
          x: item.k.t,
          o: item.k.o,
          h: item.k.h,
          l: item.k.l,
          c: item.k.c,
        })),
        color: {
          up: "#26a69a",
          down: "#ef5350",
          unchanged: "#999",
        },
      },
    ],
  };
  const options: ChartOptions<"candlestick"> = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "HH:mm:ss dd/MM",
          unit: "minute",
        },
        title: {
          display: true,
          text: "Thời gian",
        },
      },
      y: {
        title: {
          display: true,
          text: "Giá",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const { o, h, l, c } = context.raw as any;
            return [`Mở: ${o}`, `Cao: ${h}`, `Thấp: ${l}`, `Đóng: ${c}`];
          },
        },
      },
    },
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Chart type="candlestick" data={data} options={options} />
    </div>
  );
};

export default CandlestickChart;
