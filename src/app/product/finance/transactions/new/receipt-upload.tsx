"use client";
import { useState, useRef } from "react";
import { scanReceipt } from "@/lib/api-client";
import { createTransaction } from "@/lib/data-service";
import { Upload, Loader2, Check, X } from "lucide-react";

export function ScanReceiptModal({ onClose, categories }) {
  const [scanning, setScanning]   = useState(false);
  const [results, setResults]     = useState(null);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState(null);
  const inputRef = useRef(null);

  async function handleFile(file) {
    setScanning(true);
    setError(null);
    try {
      const data = await scanReceipt(file);
      setResults(data.transactions);
    } catch (e) {
      setError(e.message);
    } finally {
      setScanning(false);
    }
  }

  async function handleSaveAll() {
    setSaving(true);
    try {
      await Promise.all(
        results.map((t) =>
          createTransaction({
            amount: t.amount,
            type: t.type,
            description: t.description || "Scanned transaction",
            date: t.date || new Date().toISOString().split("T")[0],
            merchant: t.merchant || undefined,
            institution: t.institution || undefined,
            category: t.category || undefined,
          })
        )
      );
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-rayo-green">Scan Receipt / Statement</h2>
          <button onClick={onClose}><X size={16} /></button>
        </div>

        {!results && !scanning && (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-rayo-ash rounded-xl p-10 text-center cursor-pointer hover:border-rayo-green/40 transition"
          >
            <Upload size={24} className="mx-auto text-rayo-green/30 mb-2" />
            <p className="text-sm text-rayo-green/60">Upload a receipt or bank statement</p>
            <p className="text-xs text-rayo-green/40 mt-1">JPG, PNG, or PDF · Max 10MB</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        )}

        {scanning && (
          <div className="flex flex-col items-center py-10 gap-3">
            <Loader2 size={28} className="animate-spin text-rayo-green" />
            <p className="text-sm text-rayo-green/60">Rayo is reading your receipt…</p>
          </div>
        )}

        {results && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-rayo-green">
              Found {results.length} transaction{results.length !== 1 ? "s" : ""}
            </p>
            <div className="max-h-72 overflow-y-auto space-y-2">
              {results.map((t, i) => (
                <div key={i} className="rounded-xl border border-rayo-ash p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-rayo-green">{t.description || "Transaction"}</span>
                    <span className={t.type === "income" ? "text-emerald-600 font-bold" : "text-red-500 font-bold"}>
                      {t.type === "income" ? "+" : "-"}₦{t.amount?.toLocaleString("en-NG")}
                    </span>
                  </div>
                  <div className="text-rayo-green/50 mt-1 flex gap-3">
                    {t.date && <span>{t.date}</span>}
                    {t.merchant && <span>· {t.merchant}</span>}
                    {t.category && <span>· {t.category}</span>}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="w-full h-11 rounded-xl bg-rayo-green text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? "Saving…" : `Save All ${results.length} Transaction${results.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}