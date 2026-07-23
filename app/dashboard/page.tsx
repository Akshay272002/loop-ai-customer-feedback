export const dynamic = "force-dynamic";
import AIInsights from "@/components/dashboard/AIInsights";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import SentimentChart from "@/components/charts/SentimentChart";
import CategoryChart from "@/components/charts/CategoryChart";
import { prisma } from "@/lib/prisma";
import TrendChart from "@/components/charts/TrendChart";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import StatusChart from "@/components/charts/StatusChart";
import ExportPDF from "@/components/dashboard/ExportPDF";

export default async function Dashboard() {
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

  // Priority statistics
  const [
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
  ] = await Promise.all([
    prisma.feedback.count({
      where: { priority: "Critical" },
    }),

    prisma.feedback.count({
      where: { priority: "High" },
    }),

    prisma.feedback.count({
      where: { priority: "Medium" },
    }),

    prisma.feedback.count({
      where: { priority: "Low" },
    }),
  ]);

  // Recent feedback
  const feedbacks = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  // Category statistics
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
  // Trend Data (Daily)
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
const reviewed = await prisma.feedback.count({
  where: {
    status: "REVIEWED",
  },
});

const resolved = await prisma.feedback.count({
  where: {
    status: "RESOLVED",
  },
});
  return (
  <div className="flex">
    <Sidebar />

    <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-100 p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
  <div>
    <h1 className="text-4xl font-bold text-gray-900">
      Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Monitor customer feedback and AI-powered insights in real time.
    </p>
  </div>

  <ExportPDF />
</div>
<div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
  <h2 className="text-3xl font-bold">
    Welcome to LOOP AI 👋
  </h2>

  <p className="mt-2 text-blue-100">
    Monitor customer feedback, discover AI-powered insights, and improve customer satisfaction from one dashboard.
  </p>
</div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Feedback" value={totalFeedback} />
          <StatCard title="Positive" value={positive} />
          <StatCard title="Negative" value={negative} />
          <StatCard title="Pending Review" value={pending} />
        </div>

        {/* Priority Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-red-50 border border-red-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-red-600 font-semibold">🔴 Critical</p>
        <h2 className="text-4xl text-black font-bold mt-2">{criticalCount}</h2>
        <p className="text-sm text-red-500 mt-2">
          Needs immediate attention
        </p>
      </div>

      <div className="text-4xl">🚨</div>
    </div>
  </div>

  <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-orange-600 font-semibold">🟠 High</p>
        <h2 className="text-4xl font-bold text-black mt-2">{highCount}</h2>
        <p className="text-sm text-orange-500 mt-2">
          Should be resolved soon
        </p>
      </div>

      <div className="text-4xl">⚠️</div>
    </div>
  </div>

  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-yellow-700 font-semibold">🟡 Medium</p>
        <h2 className="text-4xl font-bold text-black mt-2">{mediumCount}</h2>
        <p className="text-sm text-yellow-600 mt-2">
          Monitor regularly
        </p>
      </div>

      <div className="text-4xl">📌</div>
    </div>
  </div>

  <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-green-700 font-semibold">🟢 Low</p>
        <h2 className="text-4xl font-bold text-black mt-2">{lowCount}</h2>
        <p className="text-sm text-green-600 mt-2">
          Low priority items
        </p>
      </div>

      <div className="text-4xl">✅</div>
    </div>
  </div>

</div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
  😊 Sentiment Distribution
</h2> 

            <SentimentChart
              positive={positive}
              neutral={neutral}
              negative={negative}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
  📂 Feedback Categories
</h2>

            <CategoryChart
              labels={categoryLabels}
              values={categoryValues}
            />
          </div>
        </div>
        {/* Trend & Status */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      📈 Feedback Trend
    </h2>

    <TrendChart
      labels={trendLabels}
      values={trendValues}
    />
  </div>

  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      📊 Feedback Status
    </h2>

    <StatusChart
      newCount={pending}
      reviewed={reviewed}
      resolved={resolved}
    />
  </div>

</div>

        {/* AI Executive Summary */}
<ExecutiveSummary />

{/* AI Insights */}
<AIInsights />

        {/* Recent Feedback */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Recent Feedback
          </h2>

          {feedbacks.length === 0 ? (
            <p className="text-gray-500">
              No feedback available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-700 uppercase text-sm">
                    <th className="text-left text-black p-3">Customer</th>
                    <th className="text-left text-black p-3">Message</th>
                    <th className="text-left p-3">Sentiment</th>
                    <th className="text-left p-3">Priority</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Summary</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr
                      key={feedback.id}
                      className="border-b hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-3 font-semibold text-gray-800">
                        {feedback.customer}
                      </td>

                      <td className="p-3 max-w-sm text-gray-800">
                        {feedback.message}
                      </td>

                      <td className="p-3 text-gray-800">
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
    {feedback.sentiment ?? "-"}
  </span>
</td>

                    <td className="p-3">
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
    {feedback.priority ?? "-"}
  </span>
</td>  

                      <td className="p-3 text-gray-800">
                        {feedback.category ?? "-"}
                      </td>

                      <td className="p-3 max-w-md text-gray-800">
                        {feedback.summary ?? "-"}
                      </td>

                      <td className="p-3">
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
      </main>
    </div>
  );
}
    