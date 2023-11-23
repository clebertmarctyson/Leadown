import { Skeleton } from "@/components/ui/skeleton";

const LoadingFields = () => {
  return (
    <div>
      <Skeleton className="w-20 h-10 text-3xl font-semibold mb-6" />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="flex justify-center items-center p-6 border border-dashed rounded-md border-blue-400">
          <Skeleton className="w-36 h-10" />
        </li>

        {[...Array(5)].map((_, index) => {
          const randomCurrentUser = Math.floor(Math.random() * 5) + 1;

          return (
            <li
              key={index}
              className="p-6 border rounded-md border-blue-500 transition duration-300 shadow-lg"
            >
              <Skeleton className="w-52 h-8 mb-2" />
              <Skeleton className="w-64 h-4 mb-2" />
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="w-28 h-10" />

                {randomCurrentUser % 2 === 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LoadingFields;
