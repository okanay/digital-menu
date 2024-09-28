import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons";

export const GetStarted: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="max-w-[520px] px-4 text-base tracking-wider text-font lg:px-0 lg:text-xl">
        Enhance your business's efficiency and customer experience with our QR
        menus solutions.
      </p>
      <ButtonSecondary className="dark:to- h-fit rounded-lg border-primary-400 px-8 py-3 text-xl shadow shadow-primary-200 dark:border-primary-50 dark:from-zinc-950 dark:to-primary-950 dark:shadow-primary-50/50 lg:text-2xl">
        Try for Free
      </ButtonSecondary>
      <span className="font-custom-mono text-xs text-font-secondary">
        Start your 14-day free trial. <br /> No credit card required.
      </span>
    </div>
  );
};
