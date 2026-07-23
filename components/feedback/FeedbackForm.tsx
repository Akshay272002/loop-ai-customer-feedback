"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackForm() {
  const router = useRouter();

  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        message,
      }),
    });

    if (res.ok) {
      alert("Feedback saved!");

      setCustomer("");
      setMessage("");

      // Refresh the feedback list
      router.refresh();
    } else {
      alert("Failed to save feedback");
    }
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl"
    >
      <input
        className="w-full border rounded p-3"
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        required
      />

      <textarea
        className="w-full border rounded p-3"
        rows={5}
        placeholder="Customer Feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        className="bg-green-600 text-white px-5 py-3 rounded"
        type="submit"
      >
        Save Feedback
      </button>
    </form>
    </>
  );
}