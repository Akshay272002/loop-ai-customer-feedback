import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const feedback = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(feedback);
}