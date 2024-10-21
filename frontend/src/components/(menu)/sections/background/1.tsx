import React from "react";

type Props = {};

export const Background: React.FC<Props> = React.memo(() => {
  return (
    <div className="absolute left-0 top-0 -z-20 h-full w-full bg-black dark:bg-white" />
  );
});
