import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    // Get recent feedback
    const feedback = await prisma.feedback.findMany({
      take: 30,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        customer: true,
        message: true,
        sentiment: true,
        category: true,
        summary: true,
      },
    });

    const prompt = `
You are an AI Product Analyst.

You answer questions ONLY using the customer feedback below.

If the answer cannot be determined from the feedback, say:
"I don't have enough feedback to answer that."

Customer Feedback:
${JSON.stringify(feedback, null, 2)}

User Question:
${question}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return NextResponse.json({
      answer: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to process request.",
      },
      {
        status: 500,
      }
    );
  }
}