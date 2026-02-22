import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { AlertTriangle, Camera, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export function LeakAlert() {
  const [leaks, setLeaks] = useState([
    {
      id: "LEAK-2024-007",
      gasLevel: 78,
      location: "Section A-7",
      timestamp: new Date(Date.now() - 15 * 60000).toLocaleString(),
      status: "pending",
    },
    {
      id: "LEAK-2024-006",
      gasLevel: 65,
      location: "Section B-3",
      timestamp: new Date(Date.now() - 45 * 60000).toLocaleString(),
      status: "pending",
    },
  ]);

  const [selectedLeak, setSelectedLeak] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
  });

  const [alertPulse, setAlertPulse] = useState(true);

  // Simulate alert pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertPulse(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (leak, action) => {
    setSelectedLeak(leak);
    setConfirmDialog({ open: true, action });
  };

  const confirmAction = () => {
    if (!selectedLeak || !confirmDialog.action) return;

    setLeaks(prev =>
      prev.map(leak =>
        leak.id === selectedLeak.id
          ? { ...leak, status: confirmDialog.action === "approve" ? "approved" : "rejected" }
          : leak
      )
    );

    setConfirmDialog({ open: false, action: null });
    setSelectedLeak(null);
  };

  const pendingLeaks = leaks.filter(l => l.status === "pending");
  const hasActiveLeak = pendingLeaks.some(l => l.gasLevel > 50);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Leak Alerts</h1>
        <p className="text-[#94a3b8]">Gas leak detection and sealing approval</p>
      </div>

      {/* Critical Alert Banner */}
      <AnimatePresence>
        {hasActiveLeak && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-6 rounded-lg border-2 ${
              alertPulse ? "bg-[#ef4444]/20 border-[#ef4444]" : "bg-[#ef4444]/10 border-[#ef4444]/50"
            } transition-all duration-500`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ef4444] rounded-lg animate-pulse">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">⚠️ GAS LEAK DETECTED</h2>
                <p className="text-[#94a3b8]">
                  {pendingLeaks.length} active leak{pendingLeaks.length !== 1 ? "s" : ""} requiring immediate attention
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#94a3b8]">Highest Level</p>
                <p className="text-3xl font-bold text-[#ef4444]">
                  {Math.max(...pendingLeaks.map(l => l.gasLevel))}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leak Cards */}
      <div className="space-y-6">
        {leaks.map((leak) => (
          <motion.div
            key={leak.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={`bg-[#1a1f2e] border-[#2d3748] p-6 ${
                leak.status === "pending" && leak.gasLevel > 50 
                  ? "border-[#ef4444] shadow-lg shadow-[#ef4444]/20" 
                  : ""
              }`}
            >
              <div className="flex items-start gap-6">
                {/* Image Placeholder */}
                <div className="w-48 h-32 bg-[#0a0e1a] rounded-lg border border-[#2d3748] flex items-center justify-center flex-shrink-0">
                  <Camera className="w-12 h-12 text-[#94a3b8]" />
                </div>

                {/* Leak Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{leak.id}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3b82f6]" />
                          <span className="text-[#94a3b8]">{leak.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#3b82f6]" />
                          <span className="text-[#94a3b8]">{leak.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-4 py-2 rounded-lg ${
                      leak.status === "pending" 
                        ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                        : leak.status === "approved"
                        ? "bg-[#10b981]/20 text-[#10b981]"
                        : "bg-[#94a3b8]/20 text-[#94a3b8]"
                    }`}>
                      {leak.status === "pending" && "⏳ Pending"}
                      {leak.status === "approved" && "✓ Sealed"}
                      {leak.status === "rejected" && "✗ Rejected"}
                    </div>
                  </div>

                  {/* Gas Level */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#94a3b8]">Gas Concentration</span>
                      <span className={`text-lg font-bold ${
                        leak.gasLevel > 75 ? "text-[#ef4444]" :
                        leak.gasLevel > 50 ? "text-[#f59e0b]" :
                        "text-[#10b981]"
                      }`}>
                        {leak.gasLevel}%
                      </span>
                    </div>
                    <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          leak.gasLevel > 75 ? "bg-[#ef4444]" :
                          leak.gasLevel > 50 ? "bg-[#f59e0b]" :
                          "bg-[#10b981]"
                        }`}
                        style={{ width: `${leak.gasLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {leak.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAction(leak, "approve")}
                        className="flex-1 px-4 py-3 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Approve Sealing
                      </button>
                      <button
                        onClick={() => handleAction(leak, "reject")}
                        className="flex-1 px-4 py-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors border border-[#2d3748] flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject / Manual Inspection
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {leaks.length === 0 && (
          <Card className="bg-[#1a1f2e] border-[#2d3748] p-12 text-center">
            <CheckCircle className="w-16 h-16 text-[#10b981] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Active Leaks</h3>
            <p className="text-[#94a3b8]">All systems operating normally</p>
          </Card>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ open, action: null })}>
        <DialogContent className="bg-[#1a1f2e] border-[#2d3748] text-white">
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.action === "approve" ? "Confirm Sealing Activation" : "Confirm Rejection"}
            </DialogTitle>
            <DialogDescription className="text-[#94a3b8]">
              {confirmDialog.action === "approve"
                ? "This will activate the sealing mechanism at the leak location. This action cannot be undone."
                : "This will mark the leak for manual inspection. The robot will continue monitoring without automatic sealing."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialog({ open: false, action: null })}
              className="bg-[#1e293b] border-[#2d3748] text-white hover:bg-[#334155]"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className={
                confirmDialog.action === "approve"
                  ? "bg-[#10b981] hover:bg-[#059669]"
                  : "bg-[#ef4444] hover:bg-[#dc2626]"
              }
            >
              {confirmDialog.action === "approve" ? "Activate Sealing" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
