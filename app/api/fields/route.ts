// import { prisma } from "../auth/[...nextauth]/route";
import { fields } from "@/data/data";
import { NextResponse } from "next/server";

export async function GET() {
  // const fields = await prisma.field.findMany();
  return NextResponse.json(fields, {
    status: 200,
  });
}
