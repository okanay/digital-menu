"use client";

import { ButtonPrimary } from "@/components/ui/buttons";
import { FormErrorMessage } from "../ui/form-messages";
import { FormTitle } from "../ui/form-title";
import { TextInput } from "../ui/input-text";
import { InputWrapper } from "../ui/input-wrapper";
import { IconImage } from "@/components/ui/icon-image";
import { useLogin } from "./use-login";

export const SignInForm: React.FC = () => {
  const { emailRef, passwordRef, submitForm, status, error } = useLogin();

  return (
    <form className="flex w-full flex-col gap-8 px-4 pt-6">
      <FormTitle>Sign In</FormTitle>
      {/*  Email Input */}
      <InputWrapper>
        <TextInput
          ref={emailRef as any}
          name="email"
          type="email"
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
          ref={passwordRef as any}
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
      {/* Error Message */}
      {status === "error" && <FormErrorMessage>{error}</FormErrorMessage>}
      {/* Submit Button */}
      <ButtonPrimary
        disabled={status === "loading"}
        className="h-[52px] w-full text-lg font-semibold disabled:opacity-70"
        onClick={submitForm}
      >
        Sign In
      </ButtonPrimary>
    </form>
  );
};
