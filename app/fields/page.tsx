import { Field } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Fields = async () => {
  const response = await fetch(`http://localhost:3000/api/fields`);
  const fields: Field[] = await response.json();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Fields</h1>

      {fields.length === 0 && (
        <p className="text-gray-600">No fields available.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="flex justify-center items-center p-6 border border-dashed rounded-md border-blue-900">
          <Link href="/fields/create">
            <Button>Create Field</Button>
          </Link>
        </li>

        {fields.map((field, index) => (
          <li
            key={index}
            className="p-6 border rounded-md border-blue-800 transition duration-300 hover:shadow-lg"
          >
            <h1 className="text-lg font-semibold mb-2">{field.name}</h1>

            <p className="text-sm mb-2">
              {field?.courses?.length === 0 ? (
                <span>No courses available for this field</span>
              ) : (
                <span className="italic">
                  {field?.courses?.length === 1
                    ? "1 course available for this field"
                    : `${field?.courses?.length} courses available for this field`}
                </span>
              )}
            </p>

            <Link href={`/fields/${field.slug}`}>
              <Button>View Details</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fields;
