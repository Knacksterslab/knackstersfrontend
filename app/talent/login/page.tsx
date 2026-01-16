import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Talent Login - Knacksters",
  description: "Talent access to Knacksters platform.",
  robots: "noindex, nofollow", // Don't index this page
};

export default function TalentLoginPage() {
  return (
    <AuthLayout>
      <LoginForm 
        userType="talent"
        title="Talent Portal"
        subtitle="Access your assignments and timesheets"
        showSignupLink={false}
      />
    </AuthLayout>
  );
}
