"use client";

import { ButtonPrimary } from "@/components/ui/buttons";
import { IconImage } from "@/components/ui/icon-image";
import { Link } from "@/i18n/routing";
import { FormErrorMessage } from "../ui/form-messages";
import { FormTitle } from "../ui/form-title";
import { CheckboxInput } from "../ui/input-checkbox";
import { TextInput } from "../ui/input-text";
import { InputWrapper } from "../ui/input-wrapper";
import { useRegister } from "./use-register";

export const SignUpForm: React.FC = () => {
  const { emailRef, passwordRef, termsRef, submitForm, status, error } =
    useRegister();

  return (
    <form className="flex w-full flex-col gap-8 px-4 pt-6">
      <FormTitle>Sign Up</FormTitle>
      {/*  Email Input */}
      <InputWrapper>
        <TextInput
          ref={emailRef}
          name="email"
          type="text"
          required
          placeholder="Enter email"
        />
        <IconImage
          src={"/svgs/email.svg"}
          alt={"email-svg-icon"}
          className="absolute right-2 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
        />
      </InputWrapper>
      {/*  Password Input */}
      <InputWrapper>
        <TextInput
          ref={passwordRef}
          name="password"
          type="password"
          required
          placeholder="Enter password"
        />
        <IconImage
          src={"/svgs/password.svg"}
          alt={"password-svg-icon"}
          className="absolute right-2 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
        />
      </InputWrapper>
      {/* Terms and Conditions */}
      <div className="flex items-start justify-start gap-2.5">
        <CheckboxInput id="terms-checkbox" ref={termsRef} />
        <label htmlFor="terms-checkbox" className="text-sm">
          I agree to the{" "}
          <Link
            href={"terms"}
            className="font-semibold text-primary-400 hover:underline"
          >
            terms and conditions
          </Link>
          , and{" "}
          <Link
            href={"privacy"}
            className="font-semibold text-primary-400 hover:underline"
          >
            privacy policy.
          </Link>
        </label>
      </div>
      {/* Error Message */}
      {status === "error" && <FormErrorMessage>{error}</FormErrorMessage>}
      {/* Submit Button */}
      <ButtonPrimary
        disabled={status === "loading"}
        className="h-[52px] w-full text-lg font-semibold disabled:opacity-70"
        onClick={submitForm}
      >
        Sign Up
      </ButtonPrimary>
      {/* Send verification email or login */}
      <div className="flex flex-col items-center gap-1 text-center text-sm">
        <Link
          href={"/email-verify-request"}
          className="font-semibold text-primary-400"
        >
          Send verification email.
        </Link>
        <p className="max-w-[320px] text-wrap">
          Already have an account?{" "}
          <Link href={"sign-in"} className="font-semibold text-primary-400">
            Login here.
          </Link>
        </p>
      </div>
    </form>
  );
};
