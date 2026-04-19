"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { updateOrderStatus, syncHistoricalOrders } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  amount_total: number;
  shipping_method: string;
  is_pickup: boolean;
  shipping_address: any;
  status: string;
  items_summary: string;
  fulfillment_status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data as Order[]);
    }
    setIsLoading(false);
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, fulfillment_status: newStatus } : o));
    } catch (e) {
      alert("Failed to update order status");
    }
  }

  async function handleSync() {
    setIsSyncing(true);
    try {
      const result = await syncHistoricalOrders();
      alert(`Successfully synced ${result.count} past order(s) from Stripe!`);
      // Re-fetch orders from supabase to show them
      await fetchOrders();
    } catch (e: any) {
      alert("Failed to sync historical orders: " + e.message);
    }
    setIsSyncing(false);
  }

  const generateMailto = (order: Order) => {
    if (order.is_pickup) {
      const subject = encodeURIComponent("Your Philocracy Order is Ready for Pickup!");
      const body = encodeURIComponent(`Hi ${order.customer_name},\n\nGreat news! Your pre-order is ready for pickup.\n\nItems:\n${order.items_summary}\n\nPlease let us know when you can stop by OSU Base.\n\nBest,\nPhilocracy Team`);
      return `mailto:${order.customer_email}?subject=${subject}&body=${body}`;
    } else {
      const subject = encodeURIComponent("Your Philocracy Order has Shipped!");
      const body = encodeURIComponent(`Hi ${order.customer_name},\n\nGreat news! Your pre-order has shipped via ${order.shipping_method}.\n\nItems:\n${order.items_summary}\n\nBest,\nPhilocracy Team`);
      return `mailto:${order.customer_email}?subject=${subject}&body=${body}`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unfulfilled":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Unfulfilled</Badge>;
      case "ready_for_pickup":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ready for Pickup</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Shipped</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-black text-charcoal">Pre-Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track customer pre-orders.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSync} disabled={isSyncing} className="shadow-sm border-amber-200 text-amber-700 hover:bg-amber-50">
            {isSyncing ? "Syncing..." : "Sync Past Orders"}
          </Button>
          <Button variant="outline" onClick={fetchOrders} className="shadow-sm">
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-soft-cream/50 border-b border-border text-xs uppercase tracking-wider text-charcoal font-bold">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items / Sizes</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-soft-cream/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-charcoal">{order.customer_name}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{order.customer_email}</div>
                      <div className="text-muted-foreground text-xs font-mono mt-1">
                        ${(order.amount_total / 100).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs text-charcoal font-medium whitespace-pre-wrap">
                        {order.items_summary || "No size data"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {order.is_pickup ? (
                          <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Pickup
                          </span>
                        ) : (
                          <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Ship
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 truncate max-w-[150px]">
                        {order.shipping_method}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.fulfillment_status)}
                    </td>
                    <td className="px-6 py-4 text-right space-y-2">
                      {order.fulfillment_status === "unfulfilled" && (
                        <Button 
                          onClick={() => handleStatusChange(order.id, order.is_pickup ? "ready_for_pickup" : "shipped")}
                          size="sm"
                          className="w-full bg-charcoal text-white hover:bg-charcoal/90 text-xs shadow-sm"
                        >
                          Mark {order.is_pickup ? "Ready" : "Shipped"}
                        </Button>
                      )}
                      
                      {(order.fulfillment_status === "ready_for_pickup" || order.fulfillment_status === "shipped") && (
                        <a href={generateMailto(order)} className="block">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full text-xs shadow-sm border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            Email Customer
                          </Button>
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
