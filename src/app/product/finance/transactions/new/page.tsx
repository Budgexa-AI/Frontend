"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, getCurrencySymbol } from "@/lib/utils";
import { addTransactionSchema, type AddTransactionFormValues } from "@/lib/validations";
import { detectCategory } from "@/lib/category";
import { createTransaction, scanReceiptForTransaction } from "@/lib/data-service";
import { fetchCategories } from "@/lib/data-service";
import { AIInsightPanel } from "@/components/ai/InsightPanel";
import { Sparkles, Search, ChevronDown, Plus, Check, ChevronRight, CheckCircle2, RefreshCcw } from "lucide-react";
import { PAYMENT_METHODS, BANKS } from "@/lib/mock-data";
import { Category } from "@/lib/types/src";
import { CategoryPicker, type CategoryPickerValue } from "@/components/product/CategoryPicker";
import { useCurrentUser } from "@/hooks/useUser";
import type { ScanReceiptResult, ScannedTransactionReview } from "@/lib/api-client";
import { ReceiptUpload } from "@/components/ai/RecieptUpload";

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function AddTransactionPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryPickerValue>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";

  // ── Receipt scan state ──────────────────────────────────────
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanReceiptResult | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  // Kept so a failed scan can be retried without asking the person to
  // re-select the file from their device.
  const [lastFile, setLastFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

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
      institution: "",
    },
  });

  const watched     = useWatch({ control });
  const description = useWatch({ control, name: "description" });
  const merchant    = useWatch({ control, name: "merchant" });

  // AI category suggestion — map suggestion label to a real category from the list
  const suggestion = detectCategory(description ?? "", merchant ?? "");
  const suggestedCategory =
    categories.find(
      (c) =>
        c.slug === suggestion.meta.value ||
        c.name.toLowerCase() === suggestion.meta.label.toLowerCase()
    ) ?? null;

  useEffect(() => {
    if (!selectedCategory && suggestedCategory) {
      setSelectedCategory({ type: "existing", category: suggestedCategory });
    }
  }, [selectedCategory, suggestedCategory]);

  // ── Prefill the form from a needsReview item ────────────────
  function applyReviewItem(item: ScannedTransactionReview) {
    setValue("direction", item.type === "income" ? "Income" : "Expense");
    setValue("amount", String(item.amount));
    if (item.date) setValue("date", item.date.slice(0, 10));
    if (item.description) setValue("description", item.description);
    if (item.merchant) setValue("merchant", item.merchant);
    if (item.institution) setValue("institution", item.institution);

    if (item.categorySlug) {
      const matched = categories.find((c) => c.slug === item.categorySlug);
      if (matched) {
        setSelectedCategory({ type: "existing", category: matched });
      }
    }
  }

  async function runScan(file: File) {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    try {
      const result = await scanReceiptForTransaction(file);
      setScanResult(result);
      setReviewIndex(0);

      if (result.needsReview.length > 0) {
        applyReviewItem(result.needsReview[0]);
      } else if (result.created.length > 0) {
        setTimeout(() => {
          router.push("/product/finance/transactions");
          router.refresh();
        }, 100);
      }
    } catch (error) {
      setScanError(
        error instanceof Error ? error.message : "Failed to scan receipt. Please try again or enter it manually."
      );
    } finally {
      setIsScanning(false);
    }
  }

  async function handleFileSelect(file: File | null) {
    if (!file) {
      // User removed the selected receipt — nothing to scan, clear prior results.
      setLastFile(null);
      setScanResult(null);
      setScanError(null);
      return;
    }

    setLastFile(file);
    await runScan(file);
  }

  async function handleRetryScan() {
    if (!lastFile) return;
    await runScan(lastFile);
  }

  function goToNextReviewItem() {
    if (!scanResult) return;
    const nextIndex = reviewIndex + 1;
    if (nextIndex < scanResult.needsReview.length) {
      setReviewIndex(nextIndex);
      applyReviewItem(scanResult.needsReview[nextIndex]);
    }
  }

  async function onSubmit(data: AddTransactionFormValues) {
    if (!selectedCategory) {
      setCategoryError("Please select or create a category");
      return;
    }
    setCategoryError(null);

    try {
      setServerError(null);

      const payload =
        selectedCategory.type === "existing"
          ? {
              amount: Number(data.amount.replace(/,/g, "")),
              date: data.date,
              description: data.description,
              type: data.direction.toLowerCase() as "income" | "expense",
              merchant: data.merchant || undefined,
              institution: data.institution || undefined,
              categoryId: selectedCategory.category.id,
            }
          : {
              amount: Number(data.amount.replace(/,/g, "")),
              date: data.date,
              description: data.description,
              type: data.direction.toLowerCase() as "income" | "expense",
              merchant: data.merchant || undefined,
              institution: data.institution || undefined,
              category: selectedCategory.name,
              // parentSlug omitted → backend defaults to "other"
            };

      await createTransaction(payload as any);

      // If there are more scanned items still waiting for review, stay on
      // this page and move to the next one instead of navigating away.
      if (scanResult && reviewIndex + 1 < scanResult.needsReview.length) {
        goToNextReviewItem();
        return;
      }

      router.push("/product/finance/transactions");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to save transaction"
      );
    }
  }

  const remainingReviewCount = scanResult ? scanResult.needsReview.length - reviewIndex - 1 : 0;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-rayo-green">Add Transaction</h1>
          <p className="mt-1 text-sm text-rayo-green/70">Record your income or expense to keep track of your finances.</p>
        </div>

        {/* ── Receipt scanner ── */}
        <div className="mb-6 rounded-2xl border border-rayo-ash bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rayo-sage-dark" />
            <h2 className="text-sm font-semibold text-rayo-green">Scan a receipt (optional)</h2>
          </div>

          <ReceiptUpload onFileSelect={handleFileSelect} />

          {isScanning && (
            <div className="mt-4 flex items-center gap-2 text-sm text-rayo-green/70">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing receipt...
            </div>
          )}

          {scanError && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span>{scanError}</span>
              {lastFile && (
                <button
                  type="button"
                  onClick={handleRetryScan}
                  disabled={isScanning}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                >
                  <RefreshCcw size={12} />
                  Retry
                </button>
              )}
            </div>
          )}

          {scanResult && scanResult.created.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>
                {scanResult.created.length === 1
                  ? "1 transaction was automatically added."
                  : `${scanResult.created.length} transactions were automatically added.`}
              </span>
            </div>
          )}

          {scanResult && scanResult.needsReview.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <p>
                We prefilled the form below from your receipt, but a few details need
                your confirmation: {scanResult.needsReview[reviewIndex].reasons.join(", ")}.
              </p>
              {remainingReviewCount > 0 && (
                <p className="mt-1 text-xs text-amber-700">
                  {remainingReviewCount} more transaction{remainingReviewCount === 1 ? "" : "s"} from this receipt
                  {remainingReviewCount === 1 ? " is" : " are"} waiting after this one — save this one to continue.
                </p>
              )}
            </div>
          )}
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="order-1 rounded-2xl border border-rayo-ash bg-white p-6 shadow-sm">

            {/* Direction tabs — unchanged */}
            <Controller
              control={control}
              name="direction"
              render={({ field }) => (
                <div className="mb-6 flex rounded-xl bg-rayo-ash p-1 gap-1">
                  {(["Expense", "Income"] as const).map((dir) => (
                    <button key={dir} type="button" onClick={() => field.onChange(dir)}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition",
                        field.value === dir
                          ? dir === "Expense" ? "border-red-200 bg-red-100 text-red-600 shadow-sm" : "border-green-200 bg-green-100 text-green-700 shadow-sm"
                          : dir === "Income" ? "text-rayo-grey hover:text-green-400" : "text-rayo-grey hover:text-red-500"
                      )}
                    >
                      {dir === "Expense" ? (
                        <><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>Expense (Money Out)</>
                      ) : (
                        <><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" /></svg>Income (Money In)</>
                      )}
                    </button>
                  ))}
                </div>
              )}
            />

            {/* Amount + Date — unchanged */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-rayo-green">Amount <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 select-none">
                    {getCurrencySymbol(currency)}
                  </span>
                  <input {...register("amount")} type="text" inputMode="decimal" placeholder="0.00"
                    className={cn("w-full rounded-lg border bg-white py-2.5 pl-7 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200", errors.amount ? "border-red-300" : "border-gray-200")}
                  />
                </div>
                {errors.amount ? <p className="text-xs text-red-500">{errors.amount.message}</p> : <p className="text-xs text-gray-400">Enter the exact amount.</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-rayo-green">Date <span className="text-red-500">*</span></label>
                <input {...register("date")} type="date"
                  className={cn("w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200", errors.date ? "border-red-300" : "border-gray-200")}
                />
                {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
              </div>
            </div>

            {/* Description — unchanged */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label className="text-xs font-medium text-rayo-green">What was this for? <span className="text-red-500">*</span></label>
              <textarea {...register("description")} rows={3} maxLength={150}
                placeholder="E.g., Lunch at Chicken Republic, Rent payment, Data bundle"
                className={cn("w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200", errors.description ? "border-red-300" : "border-gray-200")}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Help your future self remember why you spent this.</p>
                <span className="text-xs text-gray-400">{(description ?? "").length} / 150</span>
              </div>
            </div>

            {/* Merchant + Bill type — unchanged */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-rayo-green">Who was involved? (Merchant / Recipient)</label>
                <input {...register("merchant")} type="text" placeholder="E.g., Chicken Republic, MTN, Tobi"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-rayo-green">Transaction Type <span className="font-normal text-gray-400">(Optional)</span></label>
                <select {...register("billType")} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200">
                  <option value="">Select type</option>
                  {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            </div>

            {/* ── Category picker ── */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium text-rayo-green">
                <Sparkles className="h-4 w-4 text-rayo-sage-dark" />
                Category <span className="font-normal text-gray-400">*</span>
              </label>

              {categoriesLoading ? (
                <div className="h-10 rounded-lg bg-gray-100 animate-pulse" />
              ) : (
                <CategoryPicker
                  categories={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                />
              )}

              {categoryError && <p className="text-xs text-red-500">{categoryError}</p>}

              {selectedCategory?.type === "custom" && (
                <p className="text-xs text-rayo-green/60">
                  "{selectedCategory.name}" will be saved as a custom category under "Other" and available next time.
                </p>
              )}
              {!selectedCategory && suggestedCategory && (
                <p className="text-xs text-gray-400">
                  AI suggests <span className="font-medium">{suggestedCategory.name}</span> — select it above or pick another.
                </p>
              )}
            </div>

            {/* Institution — unchanged */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium text-rayo-green">🏦 Institution <span className="font-normal text-gray-400">(Optional)</span></label>
              <select {...register("institution")} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-rayo-grey outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200">
                <option value="">Select bank / institution</option>
                {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {serverError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()} disabled={isSubmitting}
                className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-rayo-grey/20 active:scale-[0.99] disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting}
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-rayo-green py-2.5 text-sm font-medium text-white transition hover:bg-rayo-green-dark active:scale-[0.99] disabled:opacity-60">
                {isSubmitting ? (
                  <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>
                ) : remainingReviewCount > 0 ? (
                  <>Save & Continue <ChevronRight size={16} /></>
                ) : (
                  <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Save Transaction</>
                )}
              </button>
            </div>
          </div>

          <div className="order-2">
            <AIInsightPanel
              values={watched}
              currency={currency}
              selectedCategoryLabel={
                selectedCategory?.type === "existing"
                  ? selectedCategory.category.name
                  : selectedCategory?.type === "custom"
                    ? selectedCategory.name
                    : null
              }
              selectedCategoryEmoji={
                selectedCategory?.type === "existing"
                  ? selectedCategory.category.emoji ?? null
                  : selectedCategory?.type === "custom"
                    ? "✏️"
                    : null
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}