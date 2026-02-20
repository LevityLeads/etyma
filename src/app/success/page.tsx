"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the checkout session to get customer email
    if (sessionId) {
      fetch(`/api/order-status?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.email) setEmail(data.email);
        })
        .catch(() => {});
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#D4930D]/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#D4930D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold" style={{ color: "#2C2824" }}>Order Confirmed!</h1>
        <p className="text-[#8A8078] text-lg">
          Your Etyma print is being generated and will arrive in your inbox shortly.
        </p>
        {email && (
          <div className="bg-white rounded-xl p-4 border border-[#D4930D]/20">
            <p className="text-sm text-[#8A8078]">
              Delivering to: <strong className="text-[#2C2824]">{email}</strong>
            </p>
          </div>
        )}
        <div className="bg-[#D4930D]/5 rounded-xl p-4">
          <p className="text-sm text-[#8A8078]">
            📧 Check your inbox (and spam folder) within the next few minutes. 
            Your high-resolution A2 PDF will be attached directly to the email.
          </p>
        </div>
        {sessionId && (
          <p className="text-xs text-[#C4BAB0]">
            Order ref: {sessionId.slice(-8).toUpperCase()}
          </p>
        )}
        <a
          href="/create"
          className="inline-block px-8 py-3 rounded-full text-white font-medium transition-all"
          style={{ backgroundColor: "#D4930D" }}
        >
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
