import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { feedback } = await req.json();

    const prompt = `
Analyze the following customer feedback.

Return ONLY valid JSON in this format:

{
  "sentiment": "Positive | Neutral | Negative",
  "category": "Bug | Feature Request | UI | Performance | Pricing | Support | Other",
  "summary": "One sentence summary"
}

Customer Feedback:
${feedback}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}