"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/types";
import { EditIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const FieldItem = ({ field }: { field: Field }) => {
  const { data: session } = useSession();

  return (
    <li className="p-6 border rounded-md border-blue-500 transition duration-300 shadow-lg">
      <h1 className="text-lg font-semibold mb-2">{field.name}</h1>

      <p className="text-sm mb-2 italic">
        {field?.courses?.length === 0 ? (
          <span className="text-gray-600">
            No courses available for this field
          </span>
        ) : (
          <span>
            {field?.courses?.length === 1
              ? "1 course available for this field"
              : `${field?.courses?.length} courses available for this field`}
          </span>
        )}
      </p>

      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/fields/${field.slug}`}>
            <Button>View Details</Button>
          </Link>

          {field.creatorId === session?.user.id && (
            <div className="flex items-center gap-2">
              <Link href={`/fields/${field.slug}/edit`}>
                <EditIcon className="w-5 h-5" />
              </Link>

              <TrashIcon className="w-5 h-5" />
            </div>
          )}
        </div>

        <p className="text-sm mt-2">
          Created by:{" "}
          {field.creatorId === session?.user.id ? (
            <span className="text-gray-600">You</span>
          ) : (
            <span className="text-gray-600">{field?.creator?.name}</span>
          )}
        </p>
      </div>
    </li>
  );
};

export default FieldItem;
