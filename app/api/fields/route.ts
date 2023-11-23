import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const fields = await prisma.field.findMany({
    include: {
      courses: true,
      creator: true,
    },
  });
  return NextResponse.json(fields, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { name, creatorId } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!creatorId) {
    return NextResponse.json(
      { error: "CreatorId is required" },
      { status: 400 }
    );
  }

  const newField = await prisma.field.create({
    data: {
      creatorId,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").trim(),
    },
  });

  return NextResponse.json(newField, { status: 201 });
}
