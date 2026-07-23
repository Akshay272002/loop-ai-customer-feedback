import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { status } = await request.json();
  const { id } = await params;

  const feedback = await prisma.feedback.update({
    where: {
      id
    },
    data: {
      status,
    },
  });

  return NextResponse.json(feedback);
}