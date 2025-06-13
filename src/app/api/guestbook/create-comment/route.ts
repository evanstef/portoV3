import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_id, comment } = await req.json();

  await db.comment.create({
    data: {
      user_id,
      content: comment,
    },
  });

  return NextResponse.json({ message: "Comment created successfully" });
}
