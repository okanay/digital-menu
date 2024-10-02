//

import React, { forwardRef } from "react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export const CheckboxInput = forwardRef<HTMLInputElement, Props>(
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 fill-primary-50 dark:fill-primary-400"
              viewBox="0 0 20 20"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  },
);
