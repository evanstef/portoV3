import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const comments = await db.comment.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    data: comments,
  });
}
