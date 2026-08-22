import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sign in | ${SITE_NAME}`,
  description: "Sign in to your account to view orders and manage artwork uploads.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">Sign in</h1>
      <p className="mb-6 text-sm text-neutral-600">Welcome back.</p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
