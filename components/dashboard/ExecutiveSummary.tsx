"use client";

import { useEffect, useState } from "react";

export default function ExecutiveSummary() {
  const [summary, setSummary] = useState("");
const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data.summary))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
  <div className="bg-blue-600 text-white p-2 rounded-xl">
    🤖
  </div>

  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      AI Executive Summary
    </h2>

    <p className="text-gray-500 text-sm">
      Generated using AI analysis
    </p>
  </div>
</div>

      {loading ? (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
  </div>
) : (
  <div className="bg-white rounded-xl border border-blue-100 p-5">
    <p className="text-gray-700 leading-8 whitespace-pre-line">
      {summary}
    </p>
  </div>
)}
    </div>
  );
}