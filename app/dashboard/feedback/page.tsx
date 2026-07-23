import { prisma } from "@/lib/prisma";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import Sidebar from "@/components/dashboard/Sidebar";

interface FeedbackPageProps {
  searchParams: Promise<{
    search?: string;
    sentiment?: string;
    category?: string;
    priority?: string;
    page?: string;
  }>;
}
export default async function feedBackPage({
  searchParams,
}: FeedbackPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const sentiment = params.sentiment ?? "";
  const category = params.category ?? "";
  const priority = params.priority ?? "";
  const currentPage = Number(params.page ?? "1");
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  const totalFeedback = await prisma.feedback.count({
    where: {
      AND: [
        search
          ? {
              OR: [
                {
                  customer: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  message: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},

        sentiment ? { sentiment } : {},
        category ? { category } : {},
        priority ? { priority } : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalFeedback / pageSize);

  const feedback = await prisma.feedback.findMany({
    select: {
      id: true,
      customer: true,
      message: true,
      sentiment: true,
      priority: true,
      status: true,
      createdAt: true,
    },

    where: {
      AND: [
        search
          ? {
              OR: [
                {
                  customer: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  message: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},

        sentiment
          ? {
              sentiment,
            }
          : {},

        category
          ? {
              category,
            }
          : {},
        priority
          ? {
              priority,
            }
          : {},
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: pageSize,
  });

  return (
    <div className="text-black flex">
    <Sidebar />
      <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-100 p-8">
        <form
        method="GET"
        className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4"
      >
        <input
          type="text"
          name="search"
          placeholder="Search customer or feedback..."
          defaultValue={search}
          className="border rounded-lg px-4 py-2 flex-1 min-w-[250px]"
        />

        <select
          name="sentiment"
          defaultValue={sentiment}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>

        <select
          name="category"
          defaultValue={category}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="Performance">Performance</option>
          <option value="UI">UI</option>
          <option value="Bug">Bug</option>
          <option value="Support">Support</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Pricing">Pricing</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="priority"
          defaultValue={priority}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Filter
        </button>
      </form>

      <FeedbackTable feedback={feedback} />
      <div className="flex justify-between items-center mt-8">
        <a
          href={`?search=${search}&sentiment=${sentiment}&category=${category}&priority=${priority}&page=${Math.max(
            currentPage - 1,
            1,
          )}`}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 pointer-events-none"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Previous
        </a>

        <span className="font-semibold">
          Page {currentPage} of {totalPages || 1}
        </span>

        <a
          href={`?search=${search}&sentiment=${sentiment}&category=${category}&priority=${priority}&page=${Math.min(
            currentPage + 1,
            totalPages || 1,
          )}`}
          className={`px-4 py-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-300 pointer-events-none"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next →
        </a>
      </div>
      </div>
    </div>
  );
}
