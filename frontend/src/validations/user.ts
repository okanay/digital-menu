import { z } from "zod";

export const MembershipType = z.enum(["Basic", "Pro", "Premium", "Admin"]);

export const SignInResponseValidate = z.object({
  id: z.number(),
  email: z.string().email(),
  membership: MembershipType,
  emailVerified: z.boolean(),
});
