"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentChart({
  positive,
  neutral,
  negative,
}: {
  positive: number;
  neutral: number;
  negative: number;
}) {
  return (
    <Pie
      data={{
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            data: [positive, neutral, negative],
            backgroundColor: [
              "#22C55E", // Positive - Green
              "#FACC15", // Neutral - Yellow
              "#EF4444", // Negative - Red
            ],
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 12,
          },
        ],
      }}
    />
  );
}
