import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, creatorId, fieldId } = await request.json();

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

  if (!fieldId) {
    return NextResponse.json("You must provide the id of the field.", {
      status: 400,
    });
  }

  const field = await prisma.field.findUnique({
    where: {
      id: fieldId,
    },
  });

  if (!field) {
    return NextResponse.json("Field not found.", { status: 404 });
  }

  if (field?.creatorId !== creatorId) {
    return NextResponse.json("You are not authorized to create a course.", {
      status: 403,
    });
  }

  const existingCourse = await prisma.course.findFirst({
    where: {
      name,
    },
  });

  if (existingCourse) {
    return NextResponse.json("Course already exists.", { status: 409 });
  }

  const course = await prisma.course.create({
    data: {
      fieldId,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").trim(),
    },
  });

  return NextResponse.json(
    {
      course: course,
      message: `Course ${course.name} has been added to the field ${field?.name} successfully`,
    },
    { status: 201 }
  );
};
