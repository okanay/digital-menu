export async function LogoutRequest() {
  const LOGOUT_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`;

  try {
    await fetch(LOGOUT_URL, {
      method: "POST",
      body: JSON.stringify({ logoutAllDevices: false }),
      credentials: "include",
    });
  } catch (error) {
    console.error("[AUTH-ERROR] While deleting credentials", error);
  }
}
