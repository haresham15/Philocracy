"use client";

import { useState } from "react";
import { 
  Store, 
  MapPin, 
  Bell, 
  Lock, 
  CheckCircle2,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "shipping", label: "Shipping & Pickup", icon: MapPin },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-black text-charcoal">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your store preferences and admin controls.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className={`text-sm font-semibold text-green-600 flex items-center gap-1.5 transition-all duration-300 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <CheckCircle2 className="h-4 w-4" />
            Changes saved
          </span>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="shadow-sm bg-charcoal text-white hover:bg-charcoal/90 transition-all font-semibold px-6 gap-2"
          >
            {isSaving ? "Saving..." : <><Save className="h-4 w-4" /> Save Settings</>}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="w-64 shrink-0">
          <div className="sticky top-8 flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-white shadow-sm border border-border text-charcoal" 
                      : "text-muted-foreground hover:bg-white/50 hover:text-charcoal border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blush-pink-deep" : "opacity-70"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-border overflow-hidden min-h-[500px]">
          
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-border pb-4">Store Configuration</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">Store Name</label>
                  <input 
                    type="text" 
                    defaultValue="Philocracy"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">Support Email</label>
                  <input 
                    type="email" 
                    defaultValue="support@philocracy.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium"
                  />
                  <p className="text-xs text-muted-foreground mt-1">This email acts as the "From" address for customer emails.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">Currency</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === "shipping" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-border pb-4">Shipping & Local Pickup</h2>
              
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">OSU Base Pickup Address</label>
                  <textarea 
                    rows={3}
                    defaultValue="The Ohio State University&#10;Columbus, OH 43210&#10;United States"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">This address will be shown to customers when their pickup order is ready.</p>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">Free Shipping Threshold</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input 
                      type="number" 
                      defaultValue="100"
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-charcoal">Automatic Shippo Label Generation</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Generate tracking info immediately after purchase.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-border pb-4">Automated Emails</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm text-charcoal">Order Confirmation</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Send a receipt immediately after checkout.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm text-charcoal">Ready for Pickup Alert</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Email customer when you mark order as "Ready for Pickup".</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm text-charcoal">Admin Alert</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Email support@philocracy.com upon new order</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-xl font-bold text-charcoal mb-6 border-b border-border pb-4">Security & Access</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-xl text-sm mb-6">
                  <strong className="block font-semibold mb-1">Administrative Access</strong>
                  Anyone with the Master Passcode can access this dashboard. Keep it highly secure.
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">Current Passcode</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-tight text-charcoal/80 uppercase text-[10px]">New Passcode</label>
                  <input 
                    type="password" 
                    placeholder="Enter new 8+ character passcode"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-soft-cream/30 focus:bg-white focus:ring-2 focus:ring-blush-pink-deep/20 focus:border-blush-pink-deep outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
