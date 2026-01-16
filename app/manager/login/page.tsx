import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Manager Login - Knacksters",
  description: "Manager access to Knacksters platform.",
  robots: "noindex, nofollow", // Don't index this page
};

export default function ManagerLoginPage() {
  return (
    <AuthLayout>
      <LoginForm 
        userType="manager"
        title="Manager Portal"
        subtitle="Internal access only"
        showSignupLink={false}
      />
    </AuthLayout>
  );
}
