type MembershipType = "Basic" | "Pro" | "Premium" | "Admin";

interface User {
  id: number;
  email: string;
  membership: MembershipType;
  emailVerified: boolean;
}
