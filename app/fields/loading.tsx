import { Skeleton } from "@/components/ui/skeleton";

const LoadingFieldsPage = () => {
  return (
    <section className="w-full min-h-screen">
      {/* Title */}
      <Skeleton className="w-20 h-9 my-6" />

      {/* Add Button */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Skeleton className="w-full md:w-32 h-10" />
      </div>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 })?.map((_, index) => (
          <li
            key={index}
            className="flex flex-col p-4 border rounded-md border-blue-500 transition duration-300 shadow-lg"
          >
            <div className="flex items-center justify-start gap-2 mb-3">
              {/* Avatar */}
              <Skeleton className="w-10 h-10 rounded-full" />

              {/* Descriptions: Name, Email */}
              <div className="flex flex-col justify-center gap-3">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-48 h-2" />
              </div>
            </div>

            {/* Field Name */}
            <Skeleton className="w-48 h-6 mb-5" />

            {/* Courses Number Available */}
            <Skeleton className="w-56 h-4 mb-3" />

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                {/* View Field Details Button */}
                <Skeleton className="w-28 h-10" />

                {/* Actions Buttons: Edit, Delete */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6" />
                  <Skeleton className="w-6 h-6" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LoadingFieldsPage;
