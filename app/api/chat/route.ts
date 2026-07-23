import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    console.log("1. Chat request received");

    const { question } = await req.json();
    console.log("2. Question:", question);

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

    console.log("3. Feedback count:", feedback.length);

    const prompt = `
You are an AI Product Analyst.

Answer ONLY using the feedback below.

Customer Feedback:
${JSON.stringify(feedback)}

Question:
${question}
`;

    console.log("4. Calling Groq...");

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

    console.log("5. Groq replied");

    return NextResponse.json({
      answer: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}