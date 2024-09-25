import { SignInResponse } from "@/validations/user";

type Response = { status: number; error: string };
type Request = ( auth: Auth, userCredentials: { email: string; password: string }) => Promise<Response>;

const LoginRequest: Request = async (auth, userCredentials) => {
  try {
    const LOGIN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(userCredentials),
      credentials: "include",
    });

    const responseData = await response.json();
    const parsedResponse = SignInResponse.safeParse(responseData.user);

    if (parsedResponse.success) {
      auth.signIn(parsedResponse as any);
    }

    return {
      status: response.status,
      error: parsedResponse.error?.message || "An error occurred",
    };
  } catch (error) {
    return {
      status: 500,
      error: "An unexpected error occurred",
    };
  }
};

export default LoginRequest;
