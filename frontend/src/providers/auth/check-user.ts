"use server";

import { SignInResponseValidate } from "@/validations/user";
import { headers, cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`;

export async function checkUser(): Promise<User | null> {
  const headersList = headers();

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: headersList.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const validate = SignInResponseValidate.safeParse(data.user);

    if (!validate.success) {
      return null;
    }

    return validate.data;
  } catch (error) {
    return null;
  }
}
