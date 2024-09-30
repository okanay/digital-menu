import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonPrimary } from "@/components/ui/buttons";
import { IconImage } from "@/components/ui/icon-image";
import { Link } from "@/providers/i18n/routing";
import Image from "next/image";
import ilDark from "../../../../public/illustration/il-1-dark.svg";
import ilLight from "../../../../public/illustration/il-1-light.svg";

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
        <form className="flex w-full flex-col gap-8 px-4 pt-6">
          <h3 className="text-3xl font-semibold tracking-wide text-primary-400">
            Sign In
          </h3>

          <div className="relative flex items-center">
            <input
              name="email"
              type="text"
              required
              className="w-full rounded-none border-b border-corner/20 bg-white/0 px-2 py-3 text-sm outline-none focus:border-primary-500 focus:outline-none dark:bg-black/0"
              placeholder="Enter email"
            />
            <IconImage
              src={"/svgs/email.svg"}
              alt={"email-svg-icon"}
              className="absolute right-0 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
            />
          </div>

          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-none border-b border-corner/20 bg-white/0 px-2 py-3 text-sm outline-none focus:border-primary-500 focus:outline-none dark:bg-black/0"
              placeholder="Enter password"
            />
            <IconImage
              src={"/svgs/password.svg"}
              alt={"password-svg-icon"}
              className="absolute right-0 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
            />
          </div>

          <ButtonPrimary className="h-[52px] w-full text-lg font-semibold">
            Sign In
          </ButtonPrimary>

          <div className="flex flex-col items-center gap-1 text-center text-sm">
            <Link
              href={"forgot-password"}
              className="font-semibold text-primary-400"
            >
              Forgot password?
            </Link>
            <p>
              Don't have an account{" "}
              <Link href={"sign-up"} className="font-semibold text-primary-400">
                register here.
              </Link>
            </p>
          </div>
        </form>
        <hr className="my-6 border-corner/10" />
        <div className="flex items-center justify-center">
          <BrandLogo className="contrast-[60%]" />
        </div>
      </div>
    </div>
  );
};
