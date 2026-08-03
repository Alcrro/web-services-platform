"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Breadcrumbs = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors cursor-pointer w-fit"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default Breadcrumbs;
