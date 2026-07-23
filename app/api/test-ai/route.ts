import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function GET() {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "Reply with only the word: Working",
        },
      ],
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