import Sidebar from "@/components/dashboard/Sidebar";
import CSVUpload from "@/components/feedback/CSVUpload";

export default function ImportPage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-100 p-10">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-bold text-gray-900">
            📂 Import Customer Feedback
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Upload a CSV file to bulk import customer feedback into LOOP AI.
          </p>

          <CSVUpload />

        </div>

      </main>
    </div>
  );
}