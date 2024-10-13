import React from "react";
import { Construction } from "lucide-react";
import Link from "next/link";

interface Props {
  pageName: string;
}

export const ComingSoon: React.FC<Props> = ({ pageName }) => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-font-primary">
      <div className="w-full max-w-md rounded border border-corner/5 bg-fill p-8 shadow">
        <div className="flex justify-center">
          <Construction className="size-16 text-primary-500/80" />
        </div>
        <h1 className="mt-6 text-center font-custom-serif text-3xl font-bold">
          Under Construction
        </h1>
        <p className="mt-4 text-center text-sm">
          The{" "}
          <span className="font-semibold text-primary-500/80 dark:text-primary-400">
            {pageName}
          </span>{" "}
          page is currently under development.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href={"/shops"}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500/80 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600 active:scale-95"
          >
            Keep Creating!
          </Link>
        </div>
      </div>
    </div>
  );
};
