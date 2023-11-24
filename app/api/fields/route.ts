import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const fields = await prisma.field.findMany({
    include: {
      courses: {
        include: {
          chapters: true,
        },
      },
      creator: true,
    },
  });
  return NextResponse.json(fields, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const { name, creatorId } = await request.json();

  if (!name) {
    return NextResponse.json("You must provide the name of the field.", {
      status: 400,
    });
  }

  if (!creatorId) {
    return NextResponse.json("You must be logged in to create a field.", {
      status: 400,
    });
  }

  const newField = await prisma.field.create({
    data: {
      creatorId,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").trim(),
    },
  });

  return NextResponse.json(
    {
      field: newField,
      message: `Field ${newField.name} has been created successfully`,
    },
    { status: 201 }
  );
};
