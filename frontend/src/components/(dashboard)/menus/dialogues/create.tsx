"use client";

import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "@/components/(dashboard)/dialogues/error-message";
import { Form } from "@/components/(dashboard)/dialogues/form";
import { Input } from "@/components/(dashboard)/dialogues/input";
import { Label } from "@/components/(dashboard)/dialogues/label";
import { LabelWrapper } from "@/components/(dashboard)/dialogues/label-wrapper";
import { SubmitButton } from "@/components/(dashboard)/dialogues/submit-button";
import { DialogWrapper } from "@/components/(dashboard)/dialogues/wrapper";
import InitialMenuDesignData from "@/constants/dummy-data";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { InputEventWrapper } from "../../dialogues/input-event-wrapper";
import { Select } from "../../dialogues/select";
import { useShops } from "../../shops/use-shops";
import { useMenus } from "../use-menus";

export const CreateMenuDialog: React.FC = () => {
  const { shops, refreshShops, status: shopsStatus } = useShops();
  const { createMenu } = useMenus();
  const { setDialog } = useDialog();

  const [status, setStatus] = useState<FetchStatus>("initial");
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const shopRef = useRef<HTMLSelectElement>(null);

  const handleCreateMenu = async () => {
    if (
      !nameRef.current ||
      !shopRef.current ||
      parseInt(shopRef.current.value) === -1
    )
      return;

    setStatus("loading");
    const name = nameRef.current.value;
    const shopUniqueId = shopRef.current.value;

    if (!name || !shopUniqueId) {
      setError("Please fill out all fields.");
      setStatus("error");
      return;
    }

    const response = await createMenu({
      shopUniqueId,
      name,
      type: 1,
      json: JSON.stringify(InitialMenuDesignData),
    });

    if (response.status === "error") {
      setError(response.error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setDialog("idle");
  };

  useEffect(() => {
    if (shopsStatus !== "success") {
      refreshShops();
    }
  }, []);

  const restaurantOptions = [
    { value: "", label: "Select a shop.." },
    ...shops.map((restaurant) => ({
      value: restaurant.uniqueId,
      label: restaurant.name,
    })),
  ];

  return (
    <DialogWrapper title="Create New Menu">
      <Form submit={handleCreateMenu}>
        <LabelWrapper>
          <Label required>Menu Name</Label>
          <Input
            ref={nameRef}
            placeholder="My menu name.."
            defaultValue={"Alacarte"}
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label required>Restaurant</Label>
          <InputEventWrapper
            onClick={() => {
              setStatus("loading");
              setError(null);
              refreshShops()
                .then(() => setStatus("success"))
                .catch((err) => {
                  setError(err.message);
                  setStatus("error");
                });
            }}
            disabled={status === "loading"}
          >
            <Select
              options={restaurantOptions}
              ref={shopRef}
              defaultValue={
                restaurantOptions[restaurantOptions.length - 1].value
              }
            />
          </InputEventWrapper>
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
