"use client";

import { useEffect, useState } from "react";

export default function AIInsights() {
  const [insights, setInsights] = useState("Generating AI insights...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      try {
        const res = await fetch("/api/insights");
        const data = await res.json();
        setInsights(data.insights);
      } catch {
        setInsights("Failed to load AI insights.");
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
  <div className="bg-purple-600 text-white p-2 rounded-xl">
    💡
  </div>

  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      AI Insights
    </h2>

    <p className="text-gray-500 text-sm">
      Smart recommendations from customer feedback
    </p>
  </div>
</div>

      {loading ? (
        <div className="animate-pulse space-y-3">
  <div className="h-4 bg-gray-200 rounded w-full"></div>
  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
  <div className="h-4 bg-gray-200 rounded w-3/5"></div>
</div>
      ) : (
        <div className="bg-white rounded-xl border border-purple-100 p-5">
  <p className="text-gray-700 leading-8 whitespace-pre-line">
    {insights}
  </p>
</div>
      )}
    </div>
  );
}