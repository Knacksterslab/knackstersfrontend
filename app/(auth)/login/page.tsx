import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Client Login - Knacksters",
  description: "Log in to your Knacksters client account to manage your projects and talent.",
};

export default function ClientLoginPage() {
  return (
    <AuthLayout>
      <LoginForm 
        userType="client"
        title="Client Portal"
        subtitle="Access your dashboard and manage your projects"
        showSignupLink={true}
      />
    </AuthLayout>
  );
}
