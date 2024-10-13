import React, { forwardRef } from "react";
import { Check } from "lucide-react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="inline-flex items-center">
        <div className="relative flex cursor-pointer items-center">
          <input
            {...props}
            ref={ref as never}
            type="checkbox"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-slate-300 bg-primary-50 shadow transition-all checked:border-corner/10 checked:bg-primary-400 hover:shadow-md dark:bg-primary-950"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
            <Check className="size-3.5 text-primary-50 dark:text-primary-400" />
          </span>
        </div>
      </div>
    );
  },
);
