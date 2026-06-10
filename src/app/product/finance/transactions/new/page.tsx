"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  addTransactionSchema,
  type AddTransactionFormValues,
} from "@/lib/validations";
import { detectCategory, CATEGORIES } from "@/lib/category";
import { createTransaction } from "@/lib/data-service";
import { AIInsightPanel } from "@/components/ai/InsightPanel";
import { ReceiptUpload } from "./receipt-upload";
import { Sparkle, Sparkles } from "lucide-react";
import { PAYMENT_METHODS, BANKS } from "@/lib/mock-data";

export default function AddTransactionPage() {
  const router = useRouter();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
  register,
  handleSubmit,
  control,
  setValue,
  formState: { errors, isSubmitting },
} = useForm<AddTransactionFormValues>({
  resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      direction: "Expense",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      merchant: "",
      billType: undefined,
      category: "",
      institution: "",
    },
  });

  // Live-watch values for the AI panel — does NOT trigger re-renders on every
  // keystroke for the whole form, only the panel re-renders.
  const watched = useWatch({ control });

  // Auto-detect category when description/merchant changes
  const description = useWatch({ control, name: "description" });
  const merchant = useWatch({ control, name: "merchant" });
  const direction = useWatch({ control, name: "direction" });
  const bill_type = useWatch({ control, name: "billType" });

  const suggestion = detectCategory(description ?? "", merchant ?? "");

  // Keep the category field in sync with the AI suggestion
  // (user can still override by selecting manually)
  const handleDescriptionBlur = useCallback(() => {
    if (!watched.category) {
      setValue("category", suggestion.meta.value, { shouldValidate: false });
    }
  }, [watched.category, suggestion.meta.value, setValue]);

  async function onSubmit(data: AddTransactionFormValues) {
    try {
      setServerError(null);
      await createTransaction({
        amount: Number(data.amount.replace(/,/g, "")),
        date: data.date,
        description: data.description,
        category: data.category,
        type: data.direction.toLowerCase() as "income" | "expense", // ← data.direction, not watched
      });
      router.push("/product/finance/transactions");
      router.refresh();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Failed to save transaction");
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-rayo-green">
            Add Transaction
          </h1>
          <p className="mt-1 text-sm text-rayo-green/70">
            Record your income or expense to keep track of your finances.
          </p>
        </div>

    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]"
    >
      {/* ── Left column: form ─────────────────────────────────────────── */}
      <div className="order-1 rounded-2xl border border-rayo-ash bg-white p-6 shadow-sm">

        {/* Direction tabs */}
        <Controller
          control={control}
          name="direction"
          render={({ field }) => (
            <div className="mb-6 flex rounded-xl bg-rayo-ash p-1 gap-1">
              {(["Expense", "Income"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => field.onChange(dir)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition",
                    field.value === dir
                      ? dir === "Expense"
                        ? "border-red-200 bg-red-100 text-red-600 shadow-sm"
                        : "border-green-200 bg-green-100 text-green-700 shadow-sm"
                      : dir === "Income"
                      ? "text-rayo-grey hover:text-green-400"
                      : "text-rayo-grey hover:text-red-500"
                  )}
                >
                  {dir === "Expense" ? (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                      Expense (Money Out)
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                      </svg>
                      Income (Money In)
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        />

        {/* Amount + Date */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 select-none">
                ₦
              </span>
              <input
                {...register("amount")}
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={cn(
                  "w-full rounded-lg border bg-white py-2.5 pl-7 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-300",
                  "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
                  errors.amount ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-gray-200"
                )}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
            {!errors.amount && (
              <p className="text-xs text-gray-400">Enter the exact amount.</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              {...register("date")}
              type="date"
              className={cn(
                "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition",
                "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
                errors.date ? "border-red-300" : "border-gray-200"
              )}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-rayo-green">
              What was this for?{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <textarea
            {...register("description")}
            onBlur={handleDescriptionBlur}
            rows={3}
            maxLength={150}
            placeholder="E.g., Lunch at Chicken Republic, Rent payment, Data bundle"
            className={cn(
              "w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300",
              "focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
              errors.description ? "border-red-300 focus:ring-red-100" : "border-gray-200"
            )}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Help your future self remember why you spent this.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {(description ?? "").length} / 150
              </span>
              {errors.description && (
                <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-xs text-red-600">
                  Required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Merchant + Transaction type */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Who was involved? (Merchant / Recipient)
            </label>
            <input
              {...register("merchant")}
              type="text"
              placeholder="E.g., Chicken Republic, MTN, Tobi"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <p className="text-xs text-gray-400">
              The person or business you paid or sent money to.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Transaction Type{" "}
              <span className="font-normal text-gray-400">(Optional)</span>
            </label>
            <select
              {...register("billType")}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Select type</option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400">
              Helps us understand this transaction better.
            </p>
          </div>
        </div>

        {/* AI Category */}
        <div className="mb-5 flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-rayo-green">
            <Sparkles className="text-rayo-sage-dark h-4 w-4"> </Sparkles> AI Category{" "}
            <span className="font-normal text-gray-400">(Suggested)</span>
          </label>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-rayo-beige-dark px-4 py-2.5">
            <div className="flex items-center gap-2 text-sm font-medium text-rayo-green">
              <span className="text-lg">{suggestion.meta.emoji}</span>
              {suggestion.meta.label}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  suggestion.confidence === "High" &&
                    "border border-green-200 bg-green-50 text-green-700",
                  suggestion.confidence === "Medium" &&
                    "border border-yellow-200 bg-yellow-50 text-yellow-700",
                  suggestion.confidence === "Low" &&
                    "border border-gray-200 bg-gray-100 text-gray-500"
                )}
              >
                {suggestion.confidence} confidence
              </span>
              {/* Hidden but keeps the form value registered */}
              <select
                {...register("category")}
                className="hidden"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            We&apos;ll learn from your choices and get better over time.
          </p>
        </div>

        {/* Institution */}
        <div className="mb-5 flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-rayo-green">
            🏦 Institution{" "}
            <span className="font-normal text-gray-400">(Optional)</span>
          </label>
          <select
            {...register("institution")}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-rayo-grey outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Select bank / institution</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400">
            Where the transaction was made.
          </p>
        </div>

        {/* Receipt upload */}
        <div className="mb-6 flex flex-col gap-1.5">
          <label className="text-xs font-medium text-rayo-green">
            Upload Receipt{" "}
            <span className="font-normal text-gray-400">(Optional)</span>
          </label>
          <ReceiptUpload
            onUpload={() => {}}
            isUploading={false}
          />
        </div>

        {/* Server error */}
        {serverError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-rayo-grey/20 active:scale-[0.99] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-rayo-green py-2.5 text-sm font-medium text-white transition hover:bg-rayo-green-dark active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Transaction
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Right column: AI panel ────────────────────────────────────── */}
      <div className="order-2">
        <AIInsightPanel values={watched} />
      </div>
    </form>
      </div>
    </div>
  );
}