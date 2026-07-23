"use client";

import { useState } from "react";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await res.json();

    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <textarea
        className="w-full border rounded-lg p-4"
        rows={4}
        placeholder="Ask anything about customer feedback..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Ask AI
      </button>

      {loading && (
        <p className="mt-4">Thinking...</p>
      )}

      {answer && (
        <div className="mt-6 whitespace-pre-line border rounded-lg p-4 bg-gray-50">
          {answer}
        </div>
      )}
    </div>
  );
}