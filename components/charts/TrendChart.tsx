"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface TrendChartProps {
  labels: string[];
  values: number[];
}

export default function TrendChart({
  labels,
  values,
}: TrendChartProps) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Feedback",
            data: values,
            borderColor: "#2563eb",
            backgroundColor: "#2563eb33",
            tension: 0.4,
            fill: true,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      }}
    />
  );
}