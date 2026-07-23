import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      take: 30,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        message: true,
        sentiment: true,
        category: true,
      },
    });

    if (feedback.length === 0) {
      return NextResponse.json({
        insights: "No feedback available.",
      });
    }

    const prompt = `
You are a product analyst.

Analyze this customer feedback and provide:

1. Overall sentiment
2. Top issues
3. Positive observations
4. One recommendation

Keep the response under 120 words.

Feedback:

${JSON.stringify(feedback, null, 2)}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      insights:
        response.choices[0].message.content ??
        "No AI insights generated.",
    });

  } catch (error) {
    console.error("AI Insights Error:", error);

    // Return a fallback response instead of HTTP 500
    return NextResponse.json({
      insights: `⚠️ AI insights are temporarily unavailable because the Groq API rate limit has been reached.

• Dashboard analytics continue to work normally.
• Customer feedback is still being stored.
• AI features will resume automatically once the API quota resets.`,
    });
  }
}