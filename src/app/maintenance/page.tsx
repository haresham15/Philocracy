import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
          Store Closed
        </h1>
        <p className="text-lg text-muted-foreground">
          Thank you for visiting Philocracy. Our store is currently closed for maintenance and we are not accepting new orders at this time.
        </p>
        <div className="pt-4">
          <Button asChild className="rounded-full bg-charcoal px-8 py-6 text-sm font-semibold tracking-widest text-white hover:bg-charcoal/90">
            <Link href="mailto:support@philocracy.com">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
