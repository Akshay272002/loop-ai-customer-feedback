import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";

// Create Feedback
export async function POST(req: NextRequest) {
  try {
    const { customer, message } = await req.json();

    const workspace = await prisma.workspace.findFirst();

    if (!workspace) {
      return NextResponse.json(
        { message: "No workspace found" },
        { status: 400 }
      );
    }

    // Default AI values
    let sentiment = "Unknown";
    let category = "Other";
    let priority = "Medium";
    let summary = "";

    try {
      const prompt = `
Analyze the following customer feedback.

Return ONLY a raw JSON object.

Do NOT wrap the response in Markdown.
Return only the JSON object.

{
  "sentiment": "Positive | Neutral | Negative",
  "category": "Bug | Feature Request | UI | Performance | Pricing | Support | Other",
  "priority": "Critical | High | Medium | Low",
  "summary": "One sentence summary"
}

Priority Rules:
- Critical: App crashes, payment failures, data loss, security issues.
- High: Login problems, major bugs, severe performance issues.
- Medium: Missing features, usability improvements, workflow issues.
- Low: Cosmetic changes, minor UI suggestions, nice-to-have requests.

Customer Feedback:
${message}
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

      const aiText = aiResponse.choices[0].message.content ?? "";

// Remove Markdown code fences if Groq returns them
const cleanedText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("Cleaned AI Response:", cleanedText);

const aiResult = JSON.parse(cleanedText);

      sentiment = aiResult.sentiment;
      category = aiResult.category;
      priority = aiResult.priority;
      summary = aiResult.summary;
    } catch (aiError) {
      console.error("AI Analysis Failed:", aiError);
    }

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        workspaceId: workspace.id,
        sentiment,
        category,
        priority,
        summary,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update Feedback
export async function PUT(req: NextRequest) {
  try {
    const { id, customer, message } = await req.json();

    const feedback = await prisma.feedback.update({
      where: { id },
      data: {
        customer,
        message,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

// Delete Feedback
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.feedback.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}