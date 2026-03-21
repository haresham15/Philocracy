import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-cream px-4">
      <div className="w-full max-w-md text-center">
        {/* Success icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blush-pink-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blush-pink-deep"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your order is confirmed. A portion of your purchase is heading
          straight to our charity partners.
        </p>

        <div className="mt-6 rounded-2xl border border-blush-pink-light bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-blush-pink-deep">
            You just made a difference.
          </p>
          <p className="mt-2 text-2xl">🌱💚✨</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Every purchase supports verified non-profit organizations working on
            hunger, mental health, sustainability, and more.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-charcoal/90 hover:shadow-lg"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-blush-pink px-8 py-4 text-sm font-semibold uppercase tracking-widest text-charcoal transition-all hover:bg-blush-pink-light"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
