import { BrandLogo } from "@/components/ui/brand-logo";
import { FormHR } from "../ui/form-hr";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import ilDark from "../../../../public/illustration/il-1-dark.svg";
import ilLight from "../../../../public/illustration/il-1-light.svg";
import { SignInForm } from "./form";

type Props = {
  locale: string;
};

export const SignIn: React.FC<Props> = () => {
  return (
    <div className="relative flex h-full items-center justify-center bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-950 sm:min-h-screen sm:py-4">
      <div className="relative mx-auto grid w-screen justify-center overflow-hidden rounded-lg border-corner/10 pb-6 sm:max-w-[440px] sm:border">
        <Image
          src={ilLight}
          alt="login-image-light"
          className="-mt-12 block h-[360px] w-screen bg-primary-100/50 object-fill dark:hidden"
          priority
        />
        <Image
          src={ilDark}
          alt="login-image-dark"
          className="-mt-12 hidden h-[360px] w-screen bg-primary-950/50 object-fill dark:block"
          priority
        />
        <SignInForm />
        {/* Forgot Password or Register */}
        <div className="mt-4 flex flex-col items-center gap-1 text-center text-sm">
          <Link
            href={"password-reset-request"}
            className="font-semibold text-primary-400"
          >
            Forgot password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link href={"sign-up"} className="font-semibold text-primary-400">
              Register here.
            </Link>
          </p>
        </div>
        <FormHR />
        <div className="flex items-center justify-center">
          <BrandLogo />
        </div>
      </div>
    </div>
  );
};
