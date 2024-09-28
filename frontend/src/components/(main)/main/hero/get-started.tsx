import { ButtonPrimary } from "@/components/ui/buttons";

export const GetStarted: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="max-w-[520px] px-4 text-base tracking-wider text-font lg:px-0 lg:text-xl">
        Enhance your business's efficiency and customer experience with our QR
        menus solutions.
      </p>
      <ButtonPrimary className="rounded-lg px-8 text-xl lg:text-3xl">
        Try for Free
      </ButtonPrimary>
      <span className="font-custom-mono text-xs text-font-secondary">
        Start your 14-day free trial. <br /> No credit card required.
      </span>
    </div>
  );
};
