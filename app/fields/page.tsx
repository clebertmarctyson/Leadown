import Link from "next/link";

import { Button } from "@/components/ui/button";

import FieldItem from "./FieldItem";
import prisma from "@/lib/prisma";

import { Field } from "@/types";

const Fields = async () => {
  const fields: Field[] = await prisma.field.findMany({
    include: {
      courses: true,
      creator: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <section className="w-full min-h-screen">
      <h1 className="text-3xl font-semibold my-6">Fields</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Link href="/fields/new">
          <Button className="w-full">Create New Field</Button>
        </Link>
      </div>

      {fields?.length === 0 && (
        <p className="text-gray-600 mb-6">No fields available.</p>
      )}

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields?.map((field) => (
          <FieldItem key={field?.id} field={field} />
        ))}
      </ul>
    </section>
  );
};

export default Fields;
