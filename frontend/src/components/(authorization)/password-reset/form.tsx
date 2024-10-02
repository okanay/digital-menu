"use client";

import { ButtonPrimary } from "@/components/ui/buttons";
import { FormErrorMessage, FormSuccessMessage } from "../ui/form-messages";
import { FormTitle } from "../ui/form-title";
import { TextInput } from "../ui/input-text";
import { InputWrapper } from "../ui/input-wrapper";
import { IconImage } from "@/components/ui/icon-image";
import { usePasswordReset } from "./use-password-reset";

export const PasswordResetForm: React.FC = () => {
  const {
    passwordRef,
    confirmPasswordRef,
    status,
    message,
    handleResetPassword,
  } = usePasswordReset();

  return (
    <form className="flex w-full flex-col gap-8 px-4 pt-6">
      <FormTitle>Sign Up</FormTitle>
      {/*  Password Input */}
      <InputWrapper>
        <TextInput
          ref={passwordRef}
          name="password"
          type="password"
          required
          placeholder="New password"
        />
        <IconImage
          src={"/svgs/password.svg"}
          alt={"email-svg-icon"}
          className="absolute right-2 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
        />
      </InputWrapper>
      {/*  Confirm Password Input */}
      <InputWrapper>
        <TextInput
          ref={confirmPasswordRef}
          name="confirm-password"
          type="password"
          required
          placeholder="Confirm password"
        />
        <IconImage
          src={"/svgs/password.svg"}
          alt={"password-svg-icon"}
          className="absolute right-2 top-0 size-5 translate-y-[50%] contrast-[60%] dark:invert"
        />
      </InputWrapper>
      {/*  Success Message */}
      {status === "success" && (
        <FormSuccessMessage>{message}</FormSuccessMessage>
      )}
      {/*  Error Message */}
      {status === "error" && <FormErrorMessage>{message}</FormErrorMessage>}
      {/* Submit Button */}
      <ButtonPrimary
        disabled={status === "loading"}
        className="h-[52px] w-full text-lg font-semibold disabled:opacity-70"
        onClick={handleResetPassword}
      >
        Reset Password
      </ButtonPrimary>
    </form>
  );
};
