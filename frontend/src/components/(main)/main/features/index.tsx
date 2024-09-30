import { SectionTitle } from "@/components/ui/section-title";
import { Features } from "./features";
import { FeatureExtra } from "./feature-extra";

export const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-t from-primary-50/25 from-[60%] to-primary-300/90 px-4 py-24 font-sans dark:from-black dark:to-primary-900/70 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle className="mb-12">Features</SectionTitle>
        <Features />
        <FeatureExtra />
      </div>
    </section>
  );
};
