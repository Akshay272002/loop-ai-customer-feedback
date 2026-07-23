import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function GET() {
  const feedback = await prisma.feedback.findMany({
    select: {
      sentiment: true,
      priority: true,
      category: true,
      summary: true,
    },
  });

  const prompt = `
Analyze this customer feedback dataset.

${JSON.stringify(feedback)}

Write a concise executive summary (5 bullet points) including:
- Overall sentiment
- Biggest issues
- Critical priorities
- Trends
- Business recommendation
`;

  try {
  const ai = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({
    summary: ai.choices[0].message.content,
  });
} catch (error) {
  console.error(error);

  return NextResponse.json({
    summary:
      "⚠️ AI summary is temporarily unavailable because the Groq API rate limit has been reached.",
  });
}
}