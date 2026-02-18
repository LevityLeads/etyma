"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#D4930D]/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#D4930D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold">Order Confirmed!</h1>
        <p className="text-[#8A8078] text-lg">
          Thank you for your purchase. Your Etyma Digital Print is being prepared and will be delivered to your email shortly.
        </p>
        {sessionId && (
          <p className="text-xs text-[#C4BAB0]">
            Order reference: {sessionId.slice(-8).toUpperCase()}
          </p>
        )}
        <a href="/create" className="btn-primary inline-block">
          Create Another Print
        </a>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF6EC]" />}>
      <SuccessContent />
    </Suspense>
  );
}
