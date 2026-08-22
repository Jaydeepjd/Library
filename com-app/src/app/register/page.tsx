import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Create an account | ${SITE_NAME}`,
  description: "Create a free account to track orders and manage artwork uploads.",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">Create an account</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Track your orders, re-upload artwork, and download invoices.
      </p>
      <RegisterForm />
    </div>
  );
}
