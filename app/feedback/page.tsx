import { prisma } from "@/lib/prisma";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import Link from "next/link";

interface FeedbackPageProps {
  searchParams: Promise<{
    search?: string;
    sentiment?: string;
    category?: string;
    priority?: string;
    page?: string;
  }>;
}
export default async function FeedbackPage({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 text-black">
      <Link
  href="/"
  className="inline-flex items-center gap-2 text-black-600 hover:text-blue-800 font-medium mb-6"
>
  ← Back to Home
</Link><main className="p-10 text-black">
      <h1 className="text-4xl font-bold mb-6">Customer Feedback</h1>

      <FeedbackForm />

      {/* Filters */}
      
    </main></div>
  );
}
