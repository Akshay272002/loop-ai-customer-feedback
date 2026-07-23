"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);
interface StatusChartProps {
  newCount: number;
  reviewed: number;
  resolved: number;
}

export default function StatusChart({
  newCount,
  reviewed,
  resolved,
}: StatusChartProps)
 {
 return (
  <div className="flex justify-center">
    <div className="w-72 h-72">
      <Doughnut
        data={{
          labels: ["New", "Reviewed", "Resolved"],
          datasets: [
            {
              data: [
                newCount,
                reviewed,
                resolved,
              ],
              backgroundColor: [
                "#ef4444",
                "#f59e0b",
                "#22c55e",
              ],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          cutout: "65%",
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  </div>
);
}