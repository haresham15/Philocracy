import Link from "next/link";
import { ShieldCheck, Package, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-soft-cream">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-white shadow-sm flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight text-charcoal flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blush-pink-deep" />
            Philocracy Admin
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link 
            href="/admin/orders" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-charcoal bg-soft-cream hover:bg-warm-tan-light transition-colors"
          >
            <Package className="h-4 w-4" />
            Orders
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-charcoal/50 cursor-not-allowed">
            <Settings className="h-4 w-4" />
            Settings
          </div>
        </nav>

        <div className="p-4 border-t border-border">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-charcoal transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
