import { ButtonSecondary } from "@/components/ui/buttons";
import { Link } from "@/i18n/routing";

export const GetStarted: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="max-w-[520px] px-4 text-base tracking-wider text-font lg:px-0 lg:text-xl">
        Enhance your business's efficiency and customer experience with our QR
        menus solutions.
      </p>
      <Link href="/arts-1">
        <ButtonSecondary
          style={{
            width: "clamp(11.25rem, 10.4167rem + 4.1667vw, 13.75rem)",
            height: "clamp(2.75rem, 2.5rem + 1.25vw, 3.5rem)",
          }}
          className="rounded-lg border-primary-500 from-zinc-50 to-primary-50 text-xl shadow-lg shadow-primary-500/30 dark:border-primary-100 dark:from-zinc-900 dark:to-zinc-800 dark:shadow-primary-100/20 lg:text-2xl"
        >
          Try for Free
        </ButtonSecondary>
      </Link>
      <span className="font-custom-mono text-xs text-font-secondary">
        Start your 14-day free trial. <br /> No credit card required.
      </span>
    </div>
  );
};
