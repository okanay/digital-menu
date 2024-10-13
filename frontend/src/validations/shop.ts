import { z } from "zod";

export const ShopResponseValidate = z.object({
  uniqueId: z.string(),
  name: z.string(),
  slug: z.string(),
  menuCount: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateShopValidate = z.object({
  name: z.string().min(3).max(255),
});

export const UpdateShopValidate = z.object({
  name: z.string().min(3).max(255),
});
