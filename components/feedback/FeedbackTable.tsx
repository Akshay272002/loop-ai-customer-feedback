"use client";

import { useRouter } from "next/navigation";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string | null;
  priority: string | null;
  status: string;
};

export default function FeedbackTable({
  feedback,
}: {
  feedback: Feedback[];
}) {
  const router = useRouter();

  async function handleEdit(item: Feedback) {
    const customer = prompt("Customer Name", item.customer);

    if (!customer) return;

    const message = prompt("Feedback", item.message);

    if (!message) return;

    const res = await fetch("/api/feedback", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        customer,
        message,
      }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update feedback");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    const res = await fetch("/api/feedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete feedback");
    }
  }
  async function reclassifyFeedback(id: string) {
  try {
    const res = await fetch("/api/feedback/reclassify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to reclassify");
    }

    router.refresh();

    alert("✅ Feedback reclassified successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to reclassify feedback.");
  }
}
async function updateStatus(
  id: string,
  status: "NEW" | "REVIEWED" | "RESOLVED"
) {
  try {
    const res = await fetch("/api/feedback/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Failed to update feedback status.");
  }
}
  function priorityBadge(priority: string | null) {
    switch (priority) {
      case "Critical":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            🔴 Critical
          </span>
        );

      case "High":
        return (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
            🟠 High
          </span>
        );

      case "Medium":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            🟡 Medium
          </span>
        );

      case "Low":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            🟢 Low
          </span>
        );

      default:
        return (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            -
          </span>
        );
    }
  }

  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Customer</th>
            <th className="text-left p-4">Feedback</th>
            <th className="text-left p-4">Sentiment</th>
            <th className="text-left p-4">Priority</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {feedback.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 text-black">{item.customer}</td>

              <td className="p-4 text-black">{item.message}</td>

              <td className="p-4">
                {item.sentiment ?? "Not analyzed"}
              </td>

              <td className="p-4">
                {priorityBadge(item.priority)}
              </td>

              <td className="p-4">
  <select
    value={item.status}
    onChange={(e) =>
      updateStatus(
        item.id,
        e.target.value as "NEW" | "REVIEWED" | "RESOLVED"
      )
    }
    className={`px-3 py-2 rounded-lg font-semibold border outline-none
      ${
        item.status === "NEW"
          ? "bg-blue-100 text-blue-700 border-blue-300"
          : item.status === "REVIEWED"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
          : "bg-green-100 text-green-700 border-green-300"
      }`}
  >
    <option value="NEW">NEW</option>
    <option value="REVIEWED">REVIEWED</option>
    <option value="RESOLVED">RESOLVED</option>
  </select>
</td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
  onClick={() => reclassifyFeedback(item.id)}
  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
>
  🔄 Re-classify
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}