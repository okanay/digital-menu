"use client";

import React, { useRef, useState } from "react";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { useShops } from "../use-shops";
import { ErrorMessage } from "@/components/(dashboard)/dialogues/error-message";
import { Form } from "@/components/(dashboard)/dialogues/form";
import { Input } from "@/components/(dashboard)/dialogues/input";
import { Label } from "@/components/(dashboard)/dialogues/label";
import { LabelWrapper } from "@/components/(dashboard)/dialogues/label-wrapper";
import { SubmitButton } from "@/components/(dashboard)/dialogues/submit-button";
import { DialogWrapper } from "@/components/(dashboard)/dialogues/wrapper";
import { CreateShopValidate } from "@/validations/shop";

export const CreateShopDialog: React.FC = () => {
  const [status, setStatus] = useState<FetchStatus>("initial");
  const [error, setError] = useState<string | null>(null);

  const { createShop } = useShops();
  const { setDialog } = useDialog();
  const ref = useRef<HTMLInputElement>(null);

  const handleShopCreate = async () => {
    if (!ref.current || ref.current.value === "") {
      setError("Shop name is required");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("loading");

    const valid = CreateShopValidate.safeParse({ name: ref.current.value });
    if (!valid.success) {
      setError(valid.error.errors[0].message);
      setStatus("error");
      return;
    }

    const response = await createShop({ name: valid.data.name });

    if (response.status === "success") {
      setDialog("idle");
      setStatus("success");
      return;
    }

    setStatus("error");
    setError(response.error);
  };

  return (
    <DialogWrapper title="Create New Shop">
      <Form submit={handleShopCreate}>
        <LabelWrapper>
          <Label required>Shop Name</Label>
          <Input ref={ref} placeholder="My shop name.." />
        </LabelWrapper>
        <SubmitButton
          type="submit"
          disabled={status === "loading"}
          loading={status === "loading"}
          variant="primary"
        >
          Create
        </SubmitButton>
        {status === "error" && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </DialogWrapper>
  );
};
