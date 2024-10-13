import { z } from "zod";

export const MenuResponseValidate = z.object({
  shopUniqueId: z.string(),
  uniqueId: z.string(),
  name: z.string(),
  type: z.number(),
  json: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateMenuValidate = z.object({
  name: z.string().min(3).max(255),
});

export const UpdateMenuValidate = z.object({
  name: z.string().min(3).max(255),
});
