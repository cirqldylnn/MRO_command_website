"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

// Dummy data
const dummyOrders = [
  { id: "RFQ-4418", title: "Vacuum Pump Rebuild Kit", status: "quotes", quotes: 3, equipment: "Becker VTLF 2.250" },
  { id: "PO-8821", title: "Bearing SKF 6205-2RS (x4)", status: "transit", eta: "Tomorrow, 2pm" },
  { id: "RFQ-4420", title: "Motor Coupling L-100", status: "pending", vendors: 4 },
]

const dummyQuotes = [
  { vendor: "Industrial Supply Co", price: 847, ship: "2 days", stock: true, best: true },
  { vendor: "MRO Direct", price: 892, ship: "1 day", stock: true },
  { vendor: "Grainger", price: 923, ship: "3 days", stock: true },
]

const dummyEquipment = [
  { id: "EQ-001", name: "Becker VTLF 2.250", location: "Line 3", lastService: "2 weeks ago" },
  { id: "EQ-002", name: "Grundfos CR 15-2", location: "Pump House", lastService: "1 month ago" },
  { id: "EQ-003", name: "ABB ACS880 VFD", location: "MCC-4", lastService: "3 days ago" },
]

type Screen = "home" | "create" | "create-photo" | "create-confirm" | "scan" | "scan-result" | "equipment" | "quotes" | "concierge"

export default function KioskDemoPage() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedOrder, setSelectedOrder] = useState(dummyOrders[0])
  const [isScanning, setIsScanning] = useState(false)
  const [chatMessages, setChatMessages] = useState<{text: string, from: "user" | "agent"}[]>([])
  const [requestText, setRequestText] = useState("")

  // Simulated QR scan
  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setScreen("scan-result")
    }, 2000)
  }

  // Simulated concierge response
  const sendChatMessage = (text: string) => {
    setChatMessages(prev => [...prev, { text, from: "user" }])
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "Thanks for reaching out! I can see you're looking at the Becker pump. Let me pull up the service history...", 
        from: "agent" 
      }])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Demo mode indicator */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500/20 border border-amber-500/50 rounded-full px-4 py-1.5">
        <span className="font-mono text-xs text-amber-400 uppercase tracking-wider">Demo Mode</span>
      </div>

      {/* Status bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">Online</span>
        </div>
        <div className="font-mono text-xs text-zinc-500">
          MRO Command Kiosk
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">LTE</span>
          <svg className="w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Main content area */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        
        {/* HOME SCREEN */}
        {screen === "home" && (
          <div className="animate-fadeIn">
            {/* Welcome */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Welcome back</div>
                <div className="text-3xl sm:text-4xl font-bold mt-1">Mike T.</div>
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="font-mono text-sm text-orange-500">3 Updates</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setScreen("create")}
                className="bg-orange-500 text-black rounded-2xl p-6 sm:p-8 text-center active:scale-95 transition-transform touch-manipulation"
              >
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-bold text-lg sm:text-xl">New Request</span>
              </button>
              <button
                onClick={() => { setScreen("scan"); handleScan(); }}
                className="bg-zinc-800 border-2 border-zinc-700 rounded-2xl p-6 sm:p-8 text-center active:scale-95 transition-transform touch-manipulation"
              >
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                </svg>
                <span className="font-bold text-lg sm:text-xl">Scan QR</span>
              </button>
            </div>

            {/* Active Orders */}
            <div className="mb-6">
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">Active Orders</div>
              <div className="space-y-3">
                {dummyOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => { setSelectedOrder(order); setScreen("quotes"); }}
                    className={cn(
                      "w-full text-left rounded-xl p-4 sm:p-5 border transition-all active:scale-[0.98] touch-manipulation",
                      order.status === "quotes" 
                        ? "bg-emerald-500/10 border-emerald-500/30" 
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        "font-mono text-sm font-medium",
                        order.status === "quotes" ? "text-emerald-400" : "text-zinc-400"
                      )}>{order.id}</span>
                      <span className={cn(
                        "font-mono text-xs px-2 py-1 rounded",
                        order.status === "quotes" && "bg-emerald-500/20 text-emerald-400",
                        order.status === "transit" && "bg-cyan-500/20 text-cyan-400",
                        order.status === "pending" && "bg-amber-500/20 text-amber-400"
                      )}>
                        {order.status === "quotes" && `${order.quotes} QUOTES`}
                        {order.status === "transit" && "IN TRANSIT"}
                        {order.status === "pending" && "PENDING"}
                      </span>
                    </div>
                    <div className="text-lg font-medium mb-1">{order.title}</div>
                    <div className="font-mono text-xs text-zinc-500">
                      {order.status === "quotes" && "Ready for review →"}
                      {order.status === "transit" && order.eta}
                      {order.status === "pending" && `Sent to ${order.vendors} vendors`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setScreen("equipment")}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center active:scale-95 transition-transform touch-manipulation"
              >
                <svg className="w-6 h-6 mx-auto mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                </svg>
                <span className="font-mono text-sm text-zinc-400">Equipment</span>
              </button>
              <button
                onClick={() => setScreen("concierge")}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center active:scale-95 transition-transform touch-manipulation"
              >
                <div className="relative w-6 h-6 mx-auto mb-2">
                  <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                </div>
                <span className="font-mono text-sm text-zinc-400">Live Help</span>
              </button>
            </div>

            {/* Back to website link */}
            <div className="mt-8 text-center">
              <a href="/" className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                ← Back to mrocommand.com
              </a>
            </div>
          </div>
        )}

        {/* CREATE REQUEST - Step 1 */}
        {screen === "create" && (
          <div className="animate-fadeIn">
            <button onClick={() => setScreen("home")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">What do you need?</h1>
            <p className="font-mono text-sm text-zinc-500 mb-8">Describe the part or issue</p>
            
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="e.g., Need replacement seal kit for Becker vacuum pump, model VTLF 2.250. Leaking from shaft..."
              className="w-full h-40 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-lg placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 resize-none"
            />
            
            <div className="grid grid-cols-3 gap-3 mt-6 mb-8">
              <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center active:scale-95 transition-transform">
                <svg className="w-8 h-8 mx-auto mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                <span className="font-mono text-xs text-zinc-400">Voice</span>
              </button>
              <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center active:scale-95 transition-transform">
                <svg className="w-8 h-8 mx-auto mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span className="font-mono text-xs text-zinc-400">Camera</span>
              </button>
              <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center active:scale-95 transition-transform">
                <svg className="w-8 h-8 mx-auto mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
                </svg>
                <span className="font-mono text-xs text-zinc-400">Scan</span>
              </button>
            </div>

            <button
              onClick={() => setScreen("create-photo")}
              disabled={!requestText.trim()}
              className={cn(
                "w-full rounded-xl p-5 font-bold text-lg transition-all active:scale-[0.98]",
                requestText.trim() 
                  ? "bg-orange-500 text-black" 
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              )}
            >
              Continue
            </button>
          </div>
        )}

        {/* CREATE REQUEST - Step 2: Photo */}
        {screen === "create-photo" && (
          <div className="animate-fadeIn">
            <button onClick={() => setScreen("create")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Add a photo?</h1>
            <p className="font-mono text-sm text-zinc-500 mb-8">Helps vendors identify the right part</p>
            
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 sm:p-12 text-center mb-6">
              <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              <p className="text-zinc-500 font-mono text-sm">Tap to take photo</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setScreen("create-confirm")}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 font-mono text-sm active:scale-95 transition-transform"
              >
                Skip for now
              </button>
              <button
                onClick={() => setScreen("create-confirm")}
                className="bg-orange-500 text-black rounded-xl p-4 font-bold active:scale-95 transition-transform"
              >
                Use Photo
              </button>
            </div>
          </div>
        )}

        {/* CREATE REQUEST - Step 3: Confirm */}
        {screen === "create-confirm" && (
          <div className="animate-fadeIn">
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Request Submitted!</h1>
              <p className="font-mono text-sm text-zinc-500 mb-2">RFQ #4421 created</p>
              <p className="font-mono text-sm text-zinc-400 mb-8">Sending to 5 vendors now...</p>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left max-w-md mx-auto mb-8">
                <div className="font-mono text-xs text-zinc-500 uppercase mb-2">Your request</div>
                <p className="text-sm">{requestText || "Seal kit for Becker vacuum pump VTLF 2.250"}</p>
              </div>

              <button
                onClick={() => { setScreen("home"); setRequestText(""); }}
                className="bg-orange-500 text-black rounded-xl px-8 py-4 font-bold text-lg active:scale-95 transition-transform"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* SCAN QR */}
        {screen === "scan" && (
          <div className="animate-fadeIn text-center py-12">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">Scanning...</h1>
            
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 border-2 border-orange-500 rounded-2xl" />
              <div className={cn(
                "absolute left-0 right-0 h-1 bg-orange-500 transition-all duration-1000",
                isScanning ? "animate-scan" : "top-1/2"
              )} />
              <svg className="absolute inset-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
              </svg>
            </div>
            
            <p className="font-mono text-sm text-zinc-500">Point at equipment QR code</p>
            
            <button
              onClick={() => setScreen("home")}
              className="mt-8 font-mono text-sm text-zinc-400 underline"
            >
              Cancel
            </button>
          </div>
        )}

        {/* SCAN RESULT */}
        {screen === "scan-result" && (
          <div className="animate-fadeIn">
            <button onClick={() => setScreen("home")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-emerald-400 uppercase">Equipment Found</div>
                <div className="text-xl font-bold">Becker VTLF 2.250</div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-mono text-xs text-zinc-500">Location</div>
                  <div>Line 3, Station 2</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-zinc-500">Asset ID</div>
                  <div>EQ-VP-003</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-zinc-500">Last Service</div>
                  <div>2 weeks ago</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-zinc-500">Open RFQs</div>
                  <div className="text-orange-500">1 active</div>
                </div>
              </div>
            </div>

            {/* Parts diagram mini */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
              <div className="font-mono text-xs text-zinc-500 uppercase mb-3">Common Parts</div>
              <div className="space-y-2">
                {["Rebuild Kit", "Shaft Seal", "Rotor Vanes", "Oil Filter"].map((part) => (
                  <button
                    key={part}
                    onClick={() => setScreen("create")}
                    className="w-full flex items-center justify-between bg-zinc-800 rounded-lg p-3 active:scale-[0.98] transition-transform"
                  >
                    <span className="font-mono text-sm">{part}</span>
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setScreen("create")}
              className="w-full bg-orange-500 text-black rounded-xl p-5 font-bold text-lg active:scale-[0.98] transition-transform"
            >
              Request a Part
            </button>
          </div>
        )}

        {/* EQUIPMENT LIST */}
        {screen === "equipment" && (
          <div className="animate-fadeIn">
            <button onClick={() => setScreen("home")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Equipment</h1>
            <p className="font-mono text-sm text-zinc-500 mb-8">Select to view parts & history</p>

            <div className="space-y-3">
              {dummyEquipment.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => setScreen("scan-result")}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left active:scale-[0.98] transition-transform touch-manipulation"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{eq.name}</span>
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
                    <span>{eq.location}</span>
                    <span>•</span>
                    <span>Serviced {eq.lastService}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUOTES */}
        {screen === "quotes" && (
          <div className="animate-fadeIn">
            <button onClick={() => setScreen("home")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>

            <div className="font-mono text-xs text-zinc-500 uppercase">{selectedOrder.id}</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Compare Quotes</h1>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
              <div className="font-bold mb-1">{selectedOrder.title}</div>
              <div className="font-mono text-xs text-zinc-500">For: {selectedOrder.equipment} · Qty: 1</div>
            </div>

            <div className="space-y-3 mb-6">
              {dummyQuotes.map((quote, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-full text-left rounded-xl p-4 border-2 transition-all active:scale-[0.98] relative",
                    quote.best 
                      ? "bg-emerald-500/10 border-emerald-500/50" 
                      : "bg-zinc-900 border-zinc-800"
                  )}
                >
                  {quote.best && (
                    <div className="absolute -top-2 right-3 bg-emerald-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      BEST VALUE
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{quote.vendor}</span>
                    <span className={cn(
                      "text-2xl font-bold",
                      quote.best ? "text-emerald-400" : "text-white"
                    )}>${quote.price}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                    <span>Ships: {quote.ship}</span>
                    <span>•</span>
                    <span className="text-emerald-400">In Stock</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setScreen("create-confirm")}
              className="w-full bg-orange-500 text-black rounded-xl p-5 font-bold text-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Award to Industrial Supply
            </button>
          </div>
        )}

        {/* CONCIERGE */}
        {screen === "concierge" && (
          <div className="animate-fadeIn h-[calc(100vh-120px)] flex flex-col">
            <button onClick={() => { setScreen("home"); setChatMessages([]); }} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono text-sm">Back</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </div>
              <div>
                <div className="font-bold">Live Support</div>
                <div className="font-mono text-xs text-emerald-400">Online now</div>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-y-auto mb-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <p className="font-mono text-sm text-zinc-500">Tap a quick action or type below</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={cn(
                  "max-w-[80%] rounded-xl p-3",
                  msg.from === "user" 
                    ? "bg-orange-500 text-black ml-auto" 
                    : "bg-zinc-800 text-white"
                )}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {["Line down - urgent!", "Need a part number", "Track my order"].map((q) => (
                <button
                  key={q}
                  onClick={() => sendChatMessage(q)}
                  className="flex-shrink-0 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2 font-mono text-xs active:scale-95 transition-transform"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    sendChatMessage(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
              <button className="bg-orange-500 text-black rounded-xl px-6 font-bold active:scale-95 transition-transform">
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
