import { LucideLoader } from "lucide-react";

const LoadingNewFieldForm = () => {
  return (
    <section className="p-8 flex flex-col items-center justify-center">
      <LucideLoader className="w-10 h-10 animate-spin" />
    </section>
  );
};

export default LoadingNewFieldForm;
