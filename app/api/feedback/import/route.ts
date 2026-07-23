import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { rows } = await req.json();

    const workspace = await prisma.workspace.findFirst();

    if (!workspace) {
      return NextResponse.json(
        { message: "No workspace found" },
        { status: 400 }
      );
    }

    for (const row of rows) {
      let sentiment = "Unknown";
      let category = "Other";
      let priority = "Medium";
      let summary = "";

      try {
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
- Low: Cosmetic changes.

Customer Feedback:
${row.Message}
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

        sentiment = result.sentiment;
        category = result.category;
        priority = result.priority;
        summary = result.summary;
      } catch (err) {
        console.error("AI Error:", err);
      }

      await prisma.feedback.create({
        data: {
          customer: row.Customer,
          message: row.Message,
          workspaceId: workspace.id,
          sentiment,
          category,
          priority,
          summary,
        },
      });
    }

    return NextResponse.json({
      message: "Feedback imported successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Import failed" },
      { status: 500 }
    );
  }
}