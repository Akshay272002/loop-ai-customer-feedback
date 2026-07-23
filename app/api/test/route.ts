import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const workspaces = await prisma.workspace.findMany();

  return NextResponse.json(workspaces);
}