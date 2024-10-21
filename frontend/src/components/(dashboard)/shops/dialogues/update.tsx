"use client";

import React, { useRef, useState } from "react";
import { useShops } from "../use-shops";
import { ErrorMessage } from "@/components/(dashboard)/dialogues/error-message";
import { Form } from "@/components/(dashboard)/dialogues/form";
import { Input } from "@/components/(dashboard)/dialogues/input";
import { Label } from "@/components/(dashboard)/dialogues/label";
import { LabelWrapper } from "@/components/(dashboard)/dialogues/label-wrapper";
import { SubmitButton } from "@/components/(dashboard)/dialogues/submit-button";
import { DialogWrapper } from "@/components/(dashboard)/dialogues/wrapper";
import { UpdateShopValidate } from "@/validations/shop";
import { useDialog } from "@/providers/dialogue/use-dialogu";

export const UpdateShopDialog: React.FC = () => {
  const [status, setStatus] = useState<StatusTypes>("initial");
  const [error, setError] = useState<string | null>(null);

  const { updateShop } = useShops();
  const { setDialog, value } = useDialog();
  const ref = useRef<HTMLInputElement>(null);

  const handleShopUpdate = async () => {
    if (!ref.current || ref.current.value === "" || !value.shop.uniqueId) {
      setError("Shop name is required");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("loading");

    const valid = UpdateShopValidate.safeParse({ name: ref.current.value });
    if (!valid.success) {
      setError(valid.error.errors[0].message);
      setStatus("error");
      return;
    }

    const response = await updateShop({
      uniqueId: value.shop.uniqueId,
      name: ref.current.value,
    });

    if (response.status === "success") {
      setDialog("idle");
      setStatus("success");
      return;
    }

    setStatus("error");
    setError(response.error);
  };

  return (
    <DialogWrapper title="Update Shop">
      <Form submit={handleShopUpdate}>
        <LabelWrapper>
          <Label required>Shop Name</Label>
          <Input
            error={error !== null}
            ref={ref}
            placeholder={value.shop.name ?? "My shop name.."}
          />
        </LabelWrapper>
        <SubmitButton
          type="submit"
          disabled={status === "loading"}
          loading={status === "loading"}
          variant="primary"
        >
          Update
        </SubmitButton>
        {status === "error" && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </DialogWrapper>
  );
};
