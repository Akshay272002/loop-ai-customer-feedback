import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id, status } = await req.json();

  await prisma.feedback.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json({
    success: true,
  });
}