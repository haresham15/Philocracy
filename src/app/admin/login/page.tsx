"use client";

import { useActionState, useEffect } from "react";
import { loginAdmin } from "../actions";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [error, formAction, isPending] = useActionState(async (state: any, formData: FormData) => {
    try {
      await loginAdmin(formData);
      return null;
    } catch (e: any) {
      return e.message;
    }
  }, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-cream px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-border">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-black tracking-tight text-charcoal">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the master passcode to manage orders.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="passcode"
              className="text-xs font-bold uppercase tracking-widest text-charcoal"
            >
              Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              required
              className="flex h-12 w-full rounded-xl border border-input/50 bg-white/50 px-4 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-full bg-charcoal font-bold uppercase tracking-widest text-white hover:bg-charcoal/90"
          >
            {isPending ? "Unlocking..." : "Enter Secure Portal"}
          </Button>
        </form>
      </div>
    </div>
  );
}
