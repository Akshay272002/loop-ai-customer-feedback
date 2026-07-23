"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoryChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Feedback Count",
            data: values,
            backgroundColor: [
              "#3B82F6",
              "#8B5CF6",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#06B6D4",
              "#EC4899",
              "#6366F1",
            ],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
