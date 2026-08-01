import Sidebar from "@/components/dashboard/Sidebar";
import FeedbackForm from "@/components/feedback/FeedbackForm";

export default function CustomerFeedbackPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-100 p-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          Customer Feedback
        </h1>

        <p className="text-gray-600 mb-8">
          Submit customer feedback for AI-powered sentiment analysis.
        </p>

        <FeedbackForm />
      </main>
    </div>
  );
}