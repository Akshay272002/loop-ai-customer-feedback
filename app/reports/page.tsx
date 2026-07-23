import AIInsights from "@/components/dashboard/AIInsights";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import SentimentChart from "@/components/charts/SentimentChart";
import CategoryChart from "@/components/charts/CategoryChart";
import TrendChart from "@/components/charts/TrendChart";
import StatusChart from "@/components/charts/StatusChart";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import ExportPDF from "@/components/dashboard/ExportPDF";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  // Statistics
  const totalFeedback = await prisma.feedback.count();

  const positive = await prisma.feedback.count({
    where: { sentiment: "Positive" },
  });

  const neutral = await prisma.feedback.count({
    where: { sentiment: "Neutral" },
  });

  const negative = await prisma.feedback.count({
    where: { sentiment: "Negative" },
  });

  const pending = await prisma.feedback.count({
    where: { status: "NEW" },
  });

  const reviewed = await prisma.feedback.count({
    where: { status: "REVIEWED" },
  });

  const resolved = await prisma.feedback.count({
    where: { status: "RESOLVED" },
  });

  // Category data
  const categoryData = await prisma.feedback.groupBy({
    by: ["category"],
    _count: {
      category: true,
    },
  });

  const categoryLabels = categoryData.map(
    (item) => item.category ?? "Unknown"
  );

  const categoryValues = categoryData.map(
    (item) => item._count.category
  );

  // Trend data
  const allFeedback = await prisma.feedback.findMany({
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const trendMap = new Map<string, number>();

  allFeedback.forEach((feedback) => {
    const date = feedback.createdAt.toLocaleDateString("en-IN");

    trendMap.set(date, (trendMap.get(date) || 0) + 1);
  });

  const trendLabels = Array.from(trendMap.keys());
  const trendValues = Array.from(trendMap.values());

  // Latest feedback
  const feedbacks = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
  });

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br text-black from-slate-100 via-gray-50 to-blue-100 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              AI Reports
            </h1>

            <p className="text-gray-500 mt-2">
              Comprehensive AI-generated customer feedback report.
            </p>
          </div>

          <ExportPDF />
        </div>

        {/* Overview */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl mb-8">

          <h2 className="text-3xl font-bold">
            📊 Voice of Customer Report
          </h2>

          <p className="mt-3 text-blue-100">
            This report summarizes customer sentiment,
            trends, priorities, categories and AI-powered
            recommendations.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Total Feedback"
            value={totalFeedback}
          />

          <StatCard
            title="Positive"
            value={positive}
          />

          <StatCard
            title="Negative"
            value={negative}
          />

          <StatCard
            title="Pending Review"
            value={pending}
          />

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl font-semibold mb-4">
              😊 Sentiment Distribution
            </h2>

            <SentimentChart
              positive={positive}
              neutral={neutral}
              negative={negative}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg border p-6">

            <h2 className="text-2xl font-semibold mb-4">
              📂 Feedback Categories
            </h2>

            <CategoryChart
              labels={categoryLabels}
              values={categoryValues}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg border p-6">

            <h2 className="text-2xl font-semibold mb-4">
              📈 Feedback Trend
            </h2>

            <TrendChart
              labels={trendLabels}
              values={trendValues}
            />

          </div>

          <div className="bg-white rounded-2xl shadow-lg border p-6">

            <h2 className="text-2xl font-semibold mb-4">
              📊 Status Overview
            </h2>

            <StatusChart
              newCount={pending}
              reviewed={reviewed}
              resolved={resolved}
            />

          </div>

        </div>
                {/* Executive Summary */}

        <div className="mt-10">
          <ExecutiveSummary />
        </div>

        {/* AI Insights */}

        <div className="mt-8">
          <AIInsights />
        </div>

        {/* Report Data */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                📋 Report Data
              </h2>

              <p className="text-gray-500 mt-1">
                Latest analyzed customer feedback included in this report.
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              {feedbacks.length} Records
            </span>

          </div>

          {feedbacks.length === 0 ? (

            <div className="py-12 text-center">

              <h3 className="text-xl font-semibold text-gray-700">
                No feedback available
              </h3>

              <p className="text-gray-500 mt-2">
                Import feedback to generate reports.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead>

                  <tr className="border-b bg-gray-50">

                    <th className="text-left p-4">Customer</th>

                    <th className="text-left p-4">
                      Sentiment
                    </th>

                    <th className="text-left p-4">
                      Priority
                    </th>

                    <th className="text-left p-4">
                      Category
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {feedbacks.map((feedback) => (

                    <tr
                      key={feedback.id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="p-4 font-semibold text-gray-800">
                        {feedback.customer}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            feedback.sentiment === "Positive"
                              ? "bg-green-100 text-green-700"
                              : feedback.sentiment === "Negative"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {feedback.sentiment}
                        </span>

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            feedback.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : feedback.priority === "High"
                              ? "bg-orange-100 text-orange-700"
                              : feedback.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {feedback.priority}
                        </span>

                      </td>

                      <td className="p-4">
                        {feedback.category}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            feedback.status === "NEW"
                              ? "bg-blue-100 text-blue-700"
                              : feedback.status === "REVIEWED"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {feedback.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
                {/* Report Footer */}

        <div className="mt-10 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-3">
            📄 Report Summary
          </h2>

          <p className="text-gray-600 leading-7">
            This report was automatically generated by
            <span className="font-semibold text-blue-600">
              {" "}LOOP AI Customer Feedback Intelligence Platform
            </span>.
            It combines customer sentiment analysis, feedback categories,
            priority levels, status tracking, trend analysis, and AI-generated
            insights to help organizations improve customer satisfaction and
            make data-driven decisions.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
              Total Feedback: {totalFeedback}
            </div>

            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">
              Positive: {positive}
            </div>

            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium">
              Negative: {negative}
            </div>

            <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium">
              Resolved: {resolved}
            </div>

          </div>

          <div className="mt-8 border-t pt-6 text-center text-gray-500 text-sm">
            Generated by <span className="font-semibold">LOOP AI</span> •
            Customer Feedback Intelligence Platform
          </div>

        </div>

      </main>
    </div>
  );
}