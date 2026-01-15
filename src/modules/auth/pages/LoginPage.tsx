'use client';

import LoginCard from "@/modules/auth/components/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--marketing-cream)]">
      <LoginCard className="max-w-md" />
    </div>
  );
}
