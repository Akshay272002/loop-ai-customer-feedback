import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    const prompt = `
Analyze the following customer feedback.

Return ONLY a raw JSON object.

{
  "sentiment":"Positive | Neutral | Negative",
  "category":"Bug | Feature Request | UI | Performance | Pricing | Support | Other",
  "priority":"Critical | High | Medium | Low",
  "summary":"One sentence summary"
}

Priority Rules:
- Critical: App crashes, payment failures, data loss, security issues.
- High: Login problems, major bugs, severe performance issues.
- Medium: Missing features, usability improvements.
- Low: Cosmetic suggestions.

Customer Feedback:
${feedback.message}
`;

    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const cleaned = (aiResponse.choices[0].message.content ?? "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);

    const updated = await prisma.feedback.update({
      where: { id },
      data: {
        sentiment: result.sentiment,
        category: result.category,
        priority: result.priority,
        summary: result.summary,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to reclassify feedback" },
      { status: 500 }
    );
  }
}