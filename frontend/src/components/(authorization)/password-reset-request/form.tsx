"use client";
import { ButtonPrimary } from "@/components/ui/buttons";
import { FormErrorMessage, FormSuccessMessage } from "../ui/form-messages";
import { FormTitle } from "../ui/form-title";
import { TextInput } from "../ui/input-text";
import { InputWrapper } from "../ui/input-wrapper";
import { IconImage } from "@/components/ui/icon-image";
import { Link } from "@/i18n/routing";
import { usePasswordLink } from "./use-password-link";

export const PasswordResetRequestForm = () => {
  const { emailRef, handleRequest, status, message } = usePasswordLink();

  return (
    <form className="flex w-full flex-col gap-8 px-4 pt-6">
      <FormTitle>Reset Your Password</FormTitle>
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
      {/*  Success Message */}
      {status === "success" && (
        <FormSuccessMessage>{message}</FormSuccessMessage>
      )}
      {/*  Error Message */}
      {status === "error" && <FormErrorMessage>{message}</FormErrorMessage>}
      {/* Submit Button */}
      <ButtonPrimary
        disabled={status === "loading"}
        onClick={handleRequest}
        className="h-[52px] w-full text-lg font-semibold"
      >
        Send Verification Link
      </ButtonPrimary>
      {/*  Login Link */}
      <div className="flex flex-col items-center gap-1 text-center text-sm">
        <p>
          If you remember your password, you can{" "}
          <Link href={"sign-in"} className="font-semibold text-primary-400">
            login here.
          </Link>
        </p>
      </div>
    </form>
  );
};
