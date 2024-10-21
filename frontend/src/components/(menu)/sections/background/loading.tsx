import React from "react";

type Props = {};

export const BackgroundLoading: React.FC<Props> = React.memo(() => {
  return (
    <div className="absolute left-0 top-0 -z-20 h-full w-full animate-pulse" />
  );
});
