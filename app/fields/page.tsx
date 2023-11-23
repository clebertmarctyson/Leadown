import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Field } from "@/types";
import FieldItem from "./FieldItem";

const Fields = async () => {
  const { data: fields } = await axios.get<Field[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/fields`
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Fields</h1>

      {fields.length === 0 && (
        <p className="text-gray-600 mb-6">No fields available.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="flex justify-center items-center p-6 border border-dashed rounded-md border-blue-400">
          <Link href="/fields/new">
            <Button>Create New Field</Button>
          </Link>
        </li>

        {fields.map((field, index) => (
          <FieldItem key={field?.id} field={field} />
        ))}
      </ul>
    </div>
  );
};

export default Fields;
