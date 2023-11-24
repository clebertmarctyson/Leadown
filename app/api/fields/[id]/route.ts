import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const field = await prisma.field.findFirst({
    where: {
      id,
    },
    include: {
      courses: {
        include: {
          chapters: true,
        },
      },
      creator: true,
    },
  });

  if (!field) {
    return NextResponse.json("Field not found.", { status: 404 });
  }

  return NextResponse.json(field, { status: 201 });
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const { name, creatorId }: { name: string; creatorId: string } =
    await request.json();

  if (!creatorId) {
    return NextResponse.json("You must be logged in to delete a field.", {
      status: 400,
    });
  }

  const field = await prisma.field.findFirst({
    where: {
      id,
    },
  });

  if (!field) {
    return NextResponse.json("Field not found.", { status: 404 });
  }

  if (field.creatorId !== creatorId) {
    return NextResponse.json("You are not authorized to delete this field.", {
      status: 403,
    });
  }

  if (
    await prisma.field.findFirst({
      where: {
        AND: [{ name }, { creatorId }, { id: { not: id } }],
      },
    })
  ) {
    return NextResponse.json("You already have a field with this name.", {
      status: 400,
    });
  }

  const updatedField = await prisma.field.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(
    {
      field: updatedField,
      message: `Field ${updatedField.name} has been updated successfully`,
    },
    { status: 201 }
  );
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const { creatorId }: { creatorId: string } = await request.json();

  if (!creatorId) {
    return NextResponse.json("You must be logged in to delete a field.", {
      status: 400,
    });
  }

  const field = await prisma.field.findUnique({
    where: {
      id,
    },
  });

  if (!field) {
    return NextResponse.json("Field not found.", { status: 404 });
  }

  if (field.creatorId !== creatorId) {
    return NextResponse.json("You are not authorized to delete this field.", {
      status: 403,
    });
  }

  const deletedField = await prisma.field.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(
    {
      field: deletedField,
      message: `Field ${deletedField.name} has been deleted successfully`,
    },
    { status: 201 }
  );
};
