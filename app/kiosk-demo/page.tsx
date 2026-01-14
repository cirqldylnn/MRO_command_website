"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Dummy data matching your real kiosk
const users = [
  { initials: "JR", name: "John", pending: 3 },
  { initials: "JW", name: "James", pending: 1 },
  { initials: "MT", name: "Mike", pending: 1 },
  { initials: "SC", name: "Sarah", pending: 1 },
  { initials: "LM", name: "Linda", pending: 0 },
]

const requests = [
  { id: 1, title: "New Quote Request", priority: "MEDIUM", status: "DRAFT", user: "John" },
  { id: 2, title: "New Quote Request", priority: "MEDIUM", status: "DRAFT", user: "John" },
  { id: 3, title: "New Quote Request", priority: "MEDIUM", status: "DRAFT", user: "John" },
  { id: 4, title: "Chiller Annual Service", priority: "LOW", status: "DRAFT", user: "Mike" },
  { id: 5, title: "Conveyor Drive Bearings - URGENT", priority: "HIGH", status: "PENDING", user: "James" },
  { id: 6, title: "Becker VT 4.40 Rebuild Kit", priority: "MEDIUM", status: "QUOTED", user: "Sarah", quotes: 2 },
]

const equipment = [
  { id: "EQ-001", name: "Becker VTLF 2.250", location: "Line 3", status: "operational" },
  { id: "EQ-002", name: "Grundfos CR 15-2", location: "Pump House", status: "maintenance" },
  { id: "EQ-003", name: "ABB ACS880 VFD", location: "MCC-4", status: "operational" },
  { id: "EQ-004", name: "Conveyor Drive Motor", location: "Line 1", status: "alert" },
  { id: "EQ-005", name: "Chiller Unit #2", location: "Utility", status: "operational" },
]

const inventoryItems = [
  { sku: "BRG-6205", name: "Bearing SKF 6205-2RS", qty: 12, reorder: 5 },
  { sku: "SL-VP-01", name: "Vacuum Pump Seal Kit", qty: 3, reorder: 2 },
  { sku: "FLT-HYD", name: "Hydraulic Filter Element", qty: 8, reorder: 4 },
  { sku: "BLT-V42", name: "V-Belt A42", qty: 6, reorder: 3 },
  { sku: "MOT-CPL", name: "Motor Coupling L-100", qty: 2, reorder: 3 },
  { sku: "OIL-HYD", name: "Hydraulic Oil ISO 46", qty: 15, reorder: 10 },
  { sku: "GRS-LTH", name: "Lithium Grease Cartridge", qty: 24, reorder: 12 },
  { sku: "FLT-AIR", name: "Air Filter Element", qty: 4, reorder: 4 },
]

type Tab = "requests" | "equipment" | "inventory" | "notes"
type Screen = "main" | "request-detail" | "new-request" | "new-request-confirm"

export default function KioskDemoPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState<Tab>("requests")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [screen, setScreen] = useState<Screen>("main")
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null)
  const [requestText, setRequestText] = useState("")
  const [syncTime, setSyncTime] = useState(new Date())

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate sync every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => setSyncTime(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const filteredRequests = requests.filter(r => {
    if (selectedUser && r.user !== selectedUser) return false
    if (urgentOnly && r.priority !== "HIGH") return false
    return true
  })

  const urgentRequest = requests.find(r => r.priority === "HIGH")
  const secondsSinceSync = Math.floor((currentTime.getTime() - syncTime.getTime()) / 1000)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "bg-red-600"
      case "MEDIUM": return "bg-orange-500"
      case "LOW": return "bg-blue-500"
      default: return "bg-zinc-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT": return "bg-zinc-700 text-zinc-300"
      case "PENDING": return "bg-red-900/50 text-red-400 border border-red-700"
      case "QUOTED": return "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
      default: return "bg-zinc-700 text-zinc-300"
    }
  }

  // MAIN SCREEN
  if (screen === "main") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Urgent Alert Banner */}
        {urgentRequest && (
          <div className="bg-red-700 px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white text-red-700 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center">1</span>
              </div>
              <div className="min-w-0">
                <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider truncate">1 URGENT REQUEST NEED ATTENTION</div>
                <div className="font-mono text-[10px] sm:text-xs text-red-200 truncate">{urgentRequest.title} — {urgentRequest.user}</div>
              </div>
            </div>
            <button 
              onClick={() => { setSelectedRequest(urgentRequest); setScreen("request-detail"); }}
              className="flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider hover:underline flex-shrink-0"
            >
              <span className="hidden sm:inline">TAP TO VIEW</span>
              <span className="sm:hidden">VIEW</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-zinc-800 gap-4">
          <div className="font-bold text-xl sm:text-2xl tracking-tight leading-tight flex-shrink-0">
            <span className="text-white">MRO</span><br />
            <span className="text-white">COMMAND</span>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900 rounded-lg p-0.5 sm:p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("requests")}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm transition-all whitespace-nowrap",
                activeTab === "requests" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              Requests
              <span className="bg-orange-500 text-black text-[10px] sm:text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded">{requests.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm transition-all whitespace-nowrap",
                activeTab === "equipment" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
              </svg>
              Equipment
              <span className="text-zinc-500 text-[10px] sm:text-xs">{equipment.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm transition-all whitespace-nowrap",
                activeTab === "inventory" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              Inventory
              <span className="text-zinc-500 text-[10px] sm:text-xs">{inventoryItems.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm transition-all whitespace-nowrap",
                activeTab === "notes" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              Notes
            </button>
          </div>

          {/* Clock */}
          <div className="text-right flex-shrink-0 hidden md:block">
            <div className="font-mono text-3xl lg:text-4xl font-light tracking-wider">{formatTime(currentTime)}</div>
            <div className="font-mono text-xs sm:text-sm text-zinc-500">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* User Filter Row */}
        {activeTab === "requests" && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 overflow-x-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all min-w-[70px] sm:min-w-[80px] flex-shrink-0",
                selectedUser === null 
                  ? "bg-orange-500/10 border-orange-500 text-orange-500" 
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
              )}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <span className="font-mono text-xs sm:text-sm font-bold">All</span>
              <span className="font-mono text-[10px] sm:text-xs">{requests.length} total</span>
            </button>
            {users.map((user) => (
              <button
                key={user.initials}
                onClick={() => setSelectedUser(selectedUser === user.name ? null : user.name)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all min-w-[70px] sm:min-w-[80px] flex-shrink-0",
                  selectedUser === user.name 
                    ? "bg-orange-500/10 border-orange-500 text-orange-500" 
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                )}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-700 flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold">
                  {user.initials}
                </div>
                <span className="font-mono text-xs sm:text-sm">{user.name}</span>
                <span className="font-mono text-[10px] sm:text-xs">{user.pending} pending</span>
              </button>
            ))}
          </div>
        )}

        {/* Filter Bar */}
        {activeTab === "requests" && (
          <div className="px-4 sm:px-6 py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setUrgentOnly(false)}
                className={cn(
                  "px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[10px] sm:text-sm uppercase tracking-wider transition-all",
                  !urgentOnly ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                All Requests
              </button>
              <button
                onClick={() => setUrgentOnly(true)}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[10px] sm:text-sm uppercase tracking-wider transition-all",
                  urgentOnly ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="hidden sm:inline">Urgent Only</span>
                <span className="sm:hidden">Urgent</span>
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-500">
                <span>SYNC: {formatTime(syncTime).replace(' ', '')}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{secondsSinceSync}s</span>
              </div>
              <button 
                onClick={() => setSyncTime(new Date())}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <a href="/" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-zinc-700 font-mono text-[10px] sm:text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-all">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                EXIT
              </a>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 px-4 sm:px-6 py-4 overflow-auto">
          {/* REQUESTS TAB */}
          {activeTab === "requests" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredRequests.map((request) => (
                <button
                  key={request.id}
                  onClick={() => { setSelectedRequest(request); setScreen("request-detail"); }}
                  className={cn(
                    "text-left rounded-xl p-3 sm:p-4 border transition-all active:scale-[0.98] touch-manipulation",
                    request.priority === "HIGH" 
                      ? "bg-red-950/30 border-red-900/50" 
                      : request.status === "QUOTED"
                        ? "bg-emerald-950/20 border-emerald-900/50"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={cn("px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono font-bold uppercase", getPriorityColor(request.priority))}>
                      {request.priority}
                    </span>
                    <span className={cn("px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-mono uppercase", getStatusColor(request.status))}>
                      {request.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{request.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-500">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="font-mono text-xs sm:text-sm">{request.user}</span>
                    </div>
                    {request.status === "QUOTED" && request.quotes && (
                      <span className="font-mono text-xs sm:text-sm text-emerald-400">{request.quotes} quotes</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* EQUIPMENT TAB */}
          {activeTab === "equipment" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {equipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-500">{eq.id}</span>
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      eq.status === "operational" && "bg-emerald-500",
                      eq.status === "maintenance" && "bg-amber-500",
                      eq.status === "alert" && "bg-red-500 animate-pulse"
                    )} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">{eq.name}</h3>
                  <p className="font-mono text-xs sm:text-sm text-zinc-500">{eq.location}</p>
                </div>
              ))}
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === "inventory" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {inventoryItems.map((item) => (
                <div
                  key={item.sku}
                  className={cn(
                    "bg-zinc-900 border rounded-xl p-3 sm:p-4",
                    item.qty <= item.reorder ? "border-amber-700" : "border-zinc-800"
                  )}
                >
                  <div className="font-mono text-[10px] sm:text-xs text-zinc-500 mb-1 sm:mb-2">{item.sku}</div>
                  <h3 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-mono text-xl sm:text-2xl font-bold",
                      item.qty <= item.reorder ? "text-amber-500" : "text-white"
                    )}>{item.qty}</span>
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-500">Reorder: {item.reorder}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              <p className="font-mono text-zinc-500">No notes yet</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 sm:p-6">
          <button
            onClick={() => setScreen("new-request")}
            className="w-full bg-orange-500 text-black rounded-xl p-4 sm:p-5 font-mono font-bold text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-3 active:scale-[0.98] transition-transform touch-manipulation"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Start New Request
          </button>
        </div>

        {/* Demo badge */}
        <div className="fixed bottom-20 sm:bottom-24 right-4 bg-amber-500/20 border border-amber-500/50 rounded-full px-3 py-1">
          <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">Demo</span>
        </div>
      </div>
    )
  }

  // REQUEST DETAIL SCREEN
  if (screen === "request-detail" && selectedRequest) {
    return (
      <div className="min-h-screen bg-black text-white p-4 sm:p-6">
        <button onClick={() => setScreen("main")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-mono text-sm">Back</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 mb-6 flex-wrap">
          <span className={cn("px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-mono font-bold uppercase", getPriorityColor(selectedRequest.priority))}>
            {selectedRequest.priority}
          </span>
          <span className={cn("px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-mono uppercase", getStatusColor(selectedRequest.status))}>
            {selectedRequest.status}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{selectedRequest.title}</h1>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-zinc-400 mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="font-mono">Assigned to {selectedRequest.user}</span>
          </div>
          <p className="text-zinc-400 font-mono text-sm">Request details would appear here with full description, attachments, and activity history.</p>
        </div>

        {selectedRequest.status === "QUOTED" && (
          <div className="space-y-3 mb-6">
            <h3 className="font-mono text-sm text-zinc-500 uppercase">Quotes Received</h3>
            <div className="bg-emerald-950/30 border border-emerald-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">Industrial Supply Co</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400">$847</span>
              </div>
              <div className="font-mono text-xs text-zinc-500">Ships in 2 days • In Stock</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">MRO Direct</span>
                <span className="text-xl sm:text-2xl font-bold">$892</span>
              </div>
              <div className="font-mono text-xs text-zinc-500">Ships in 1 day • In Stock</div>
            </div>
          </div>
        )}

        <button
          onClick={() => setScreen("main")}
          className="w-full bg-orange-500 text-black rounded-xl p-4 font-mono font-bold uppercase tracking-wider active:scale-[0.98] transition-transform touch-manipulation"
        >
          {selectedRequest.status === "QUOTED" ? "Award Quote" : "View Details"}
        </button>
      </div>
    )
  }

  // NEW REQUEST SCREEN
  if (screen === "new-request") {
    return (
      <div className="min-h-screen bg-black text-white p-4 sm:p-6">
        <button onClick={() => setScreen("main")} className="flex items-center gap-2 text-zinc-400 mb-6 touch-manipulation">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-mono text-sm">Back</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">New Request</h1>
        <p className="font-mono text-zinc-500 mb-6 sm:mb-8">Describe what you need</p>

        <textarea
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          placeholder="e.g., Need replacement bearings for conveyor drive motor..."
          className="w-full h-32 sm:h-40 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-base sm:text-lg placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 resize-none mb-4 sm:mb-6"
        />

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 sm:p-4 text-center active:scale-95 transition-transform touch-manipulation">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400">Voice</span>
          </button>
          <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 sm:p-4 text-center active:scale-95 transition-transform touch-manipulation">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400">Camera</span>
          </button>
          <button className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 sm:p-4 text-center active:scale-95 transition-transform touch-manipulation">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
            </svg>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-400">Scan QR</span>
          </button>
        </div>

        <button
          onClick={() => setScreen("new-request-confirm")}
          disabled={!requestText.trim()}
          className={cn(
            "w-full rounded-xl p-4 sm:p-5 font-mono font-bold text-base sm:text-lg uppercase tracking-wider active:scale-[0.98] transition-transform touch-manipulation",
            requestText.trim() ? "bg-orange-500 text-black" : "bg-zinc-800 text-zinc-600"
          )}
        >
          Continue
        </button>
      </div>
    )
  }

  // CONFIRMATION SCREEN
  if (screen === "new-request-confirm") {
    return (
      <div className="min-h-screen bg-black text-white p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Request Created!</h1>
        <p className="font-mono text-zinc-500 mb-6 sm:mb-8 text-center">RFQ #4427 • Sending to vendors...</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 w-full max-w-md mb-6 sm:mb-8">
          <div className="font-mono text-xs text-zinc-500 uppercase mb-2">Your request</div>
          <p className="text-sm sm:text-base">{requestText || "New quote request"}</p>
        </div>

        <button
          onClick={() => { setScreen("main"); setRequestText(""); }}
          className="bg-orange-500 text-black rounded-xl px-6 sm:px-8 py-3 sm:py-4 font-mono font-bold text-base sm:text-lg uppercase tracking-wider active:scale-[0.98] transition-transform touch-manipulation"
        >
          Done
        </button>
      </div>
    )
  }

  return null
}
