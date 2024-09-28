import React from "react";
import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";

type Props = {
  locale: string;
};

export const Main: React.FC<Props> = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
};
