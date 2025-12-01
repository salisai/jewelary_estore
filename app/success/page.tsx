'use client';

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshOrders, clearCart } = useStore();

  useEffect(() => {
    refreshOrders();
    clearCart();
  }, [refreshOrders, clearCart]);

  const sessionId = searchParams.get("session_id");

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif">Thank You.</h1>
        <p className="text-gray-600">
          Your order is being crafted. A confirmation email has been sent{sessionId ? ` (ref: ${sessionId})` : ""}.
        </p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
      >
        Return Home
      </button>
    </div>
  );
};

export default SuccessPage;

