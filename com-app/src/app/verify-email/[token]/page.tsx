import Link from "next/link";
import type { Metadata } from "next";
import { verifyEmailToken } from "@/lib/actions/auth";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Verify email | ${SITE_NAME}`,
};

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const verified = await verifyEmailToken(token);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      {verified ? (
        <>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">Email verified</h1>
          <p className="mb-6 text-sm text-neutral-600">
            Your email address has been verified. You can now sign in.
          </p>
          <Link
            href="/login"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Sign in
          </Link>
        </>
      ) : (
        <>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">Link expired or invalid</h1>
          <p className="mb-6 text-sm text-neutral-600">
            This verification link is no longer valid. Try registering again or contact support.
          </p>
          <Link
            href="/register"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Back to sign up
          </Link>
        </>
      )}
    </div>
  );
}
