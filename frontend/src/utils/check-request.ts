import { SignInResponse } from "@/validations/user";

const CheckRequest = async () : Promise<User | null> => {
  const CHECK_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`;

  try {
    const response = await fetch(CHECK_URL, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check user");
    }

    const data = await response.json();
    const validResponse = SignInResponse.safeParse(data.user);

    if (!validResponse.success) {
      throw new Error("Failed to check user");
    }

    return validResponse.data;

  } catch (error) {
    return null;
  }
};

export default CheckRequest;
