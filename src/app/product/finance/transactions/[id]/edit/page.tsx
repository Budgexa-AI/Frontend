"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Check,
  AlertCircle,
  Loader2,
  Trash2,
  Building2,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { cn, formatCurrency, getCurrencySymbol } from "@/lib/utils";
import { addTransactionSchema, type AddTransactionFormValues } from "@/lib/validations";
import {
  fetchTransaction,
  updateTransaction,
  deleteTransaction,
  fetchCategories,
} from "@/lib/data-service";
import type { Category, Transaction } from "@/lib/types/src";
import { CategoryPicker, type CategoryPickerValue } from "@/components/product/CategoryPicker";
import { useCurrentUser } from "@/hooks/useUser";
import { PAYMENT_METHODS, BANKS } from "@/lib/mock-data";

// ─────────────────────────────────────────────────────────────
// Delete Modal
// ─────────────────────────────────────────────────────────────

function DeleteModal({
  label,
  onCancel,
  onConfirm,
  deleting,
}: {
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-Budgexa-ash">
        <h3 className="text-base font-semibold text-Budgexa-green">Delete transaction?</h3>
        <p className="mt-2 text-sm text-Budgexa-green/60">
          <span className="font-medium text-Budgexa-green">"{label}"</span> will be permanently removed. This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 rounded-xl border border-Budgexa-green/10 py-2.5 text-sm font-medium text-Budgexa-green transition hover:bg-Budgexa-beige"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Skeleton Loader
// ─────────────────────────────────────────────────────────────

function EditSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-56 rounded bg-Budgexa-ash/60 animate-pulse mb-3 px-5" />

        {/* Title skeleton */}
        <div className="space-y-2 mb-6 px-5">
          <div className="h-8 w-64 rounded-lg bg-Budgexa-ash/60 animate-pulse" />
          <div className="h-4 w-96 rounded bg-Budgexa-ash/40 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] 2xl:grid-cols-[1fr_420px] gap-6 mt-6">
          {/* Main card skeleton */}
          <div className="rounded-2xl border border-Budgexa-ash bg-white p-6 shadow-sm space-y-6">
            <div className="h-11 rounded-xl bg-Budgexa-ash/50 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 rounded-lg bg-Budgexa-ash/40 animate-pulse" />
              <div className="h-10 rounded-lg bg-Budgexa-ash/40 animate-pulse" />
            </div>
            <div className="h-28 rounded-lg bg-Budgexa-ash/40 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 rounded-lg bg-Budgexa-ash/40 animate-pulse" />
              <div className="h-10 rounded-lg bg-Budgexa-ash/40 animate-pulse" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            <div className="h-72 rounded-2xl border border-Budgexa-ash bg-white p-5 animate-pulse" />
            <div className="h-32 rounded-2xl border border-Budgexa-ash bg-white p-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Edit Transaction Page
// ─────────────────────────────────────────────────────────────

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const transactionId = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";

  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryPickerValue>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
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

  const watched = useWatch({ control });

  // ── Load transaction and categories ──────────────────────────
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!transactionId) {
        setFetchError("Invalid transaction ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      setFetchError(null);

      try {
        const [cats, tx] = await Promise.all([
          fetchCategories().catch(() => [] as Category[]),
          fetchTransaction(Number(transactionId)),
        ]);

        if (!isMounted) return;

        setCategories(cats);

        if (!tx) {
          setFetchError("Transaction not found");
          return;
        }

        setTransaction(tx);

        // Normalize date to YYYY-MM-DD
        let formattedDate = "";
        try {
          formattedDate = new Date(tx.date).toISOString().split("T")[0];
        } catch {
          formattedDate = tx.date ? tx.date.slice(0, 10) : new Date().toISOString().split("T")[0];
        }

        // Populate react-hook-form
        reset({
          direction: tx.type === "income" ? "Income" : "Expense",
          amount: String(tx.amount),
          date: formattedDate,
          description: tx.description ?? "",
          merchant: tx.merchant ?? "",
          billType: tx.bill_type ?? undefined,
          institution: tx.institution ?? "",
        });

        // Match initial category
        const matchedCat = cats.find((c) => c.id === tx.categoryId);
        if (matchedCat) {
          setSelectedCategory({ type: "existing", category: matchedCat });
        } else if (tx.categoryName) {
          setSelectedCategory({
            type: "custom",
            name: tx.categoryName,
            parentSlug: tx.parentSlug || "other",
          });
        }
      } catch (err: any) {
        if (!isMounted) return;
        setFetchError(err?.message || "Failed to load transaction details");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [transactionId, reset]);

  // ── Reset form to initial transaction values ─────────────────
  const handleResetToOriginal = () => {
    if (!transaction) return;

    let formattedDate = "";
    try {
      formattedDate = new Date(transaction.date).toISOString().split("T")[0];
    } catch {
      formattedDate = transaction.date ? transaction.date.slice(0, 10) : "";
    }

    reset({
      direction: transaction.type === "income" ? "Income" : "Expense",
      amount: String(transaction.amount),
      date: formattedDate,
      description: transaction.description ?? "",
      merchant: transaction.merchant ?? "",
      billType: transaction.bill_type ?? undefined,
      institution: transaction.institution ?? "",
    });

    const matchedCat = categories.find((c) => c.id === transaction.categoryId);
    if (matchedCat) {
      setSelectedCategory({ type: "existing", category: matchedCat });
    } else if (transaction.categoryName) {
      setSelectedCategory({
        type: "custom",
        name: transaction.categoryName,
        parentSlug: transaction.parentSlug || "other",
      });
    }
  };

  // ── Handle Save / Update ─────────────────────────────────────
  async function onSubmit(data: AddTransactionFormValues) {
    if (!selectedCategory) {
      setCategoryError("Please select or create a category");
      return;
    }
    setCategoryError(null);
    setServerError(null);

    try {
      const payload: any = {
        amount: Number(data.amount.replace(/,/g, "")),
        date: data.date,
        description: data.description,
        type: data.direction.toLowerCase() as "income" | "expense",
        merchant: data.merchant || undefined,
        institution: data.institution || undefined,
        bill_type: data.billType || undefined,
      };

      if (selectedCategory.type === "existing") {
        payload.categoryId = selectedCategory.category.id;
      } else {
        payload.category = selectedCategory.name;
        payload.parentSlug = selectedCategory.parentSlug || "other";
      }

      await updateTransaction(Number(transactionId), payload);

      router.push("/product/finance/transactions");
      router.refresh();
    } catch (error: any) {
      setServerError(error?.message || "Failed to update transaction");
    }
  }

  // ── Handle Delete ────────────────────────────────────────────
  async function handleDelete() {
    if (!transactionId) return;

    try {
      setDeleting(true);
      await deleteTransaction(Number(transactionId));
      router.push("/product/finance/transactions");
      router.refresh();
    } catch (error: any) {
      setServerError(error?.message || "Failed to delete transaction");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  }

  // Live parsed preview values
  const previewAmount = Number((watched.amount || "0").replace(/,/g, ""));
  const isIncome = watched.direction === "Income";

  // Category label and emoji
  const currentCategoryName =
    selectedCategory?.type === "existing"
      ? selectedCategory.category.name
      : selectedCategory?.type === "custom"
        ? selectedCategory.name
        : "Uncategorized";

  const currentCategoryEmoji =
    selectedCategory?.type === "existing"
      ? selectedCategory.category.emoji ?? "📦"
      : "✏️";

  // Check if amount or category changed from original
  const hasAmountChanged =
    transaction && Number(transaction.amount) !== previewAmount;
  const hasCategoryChanged =
    transaction &&
    selectedCategory &&
    (selectedCategory.type === "existing"
      ? selectedCategory.category.id !== transaction.categoryId
      : selectedCategory.name !== transaction.categoryName);

  if (loading) {
    return <EditSkeleton />;
  }

  if (fetchError || !transaction) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="rounded-3xl border border-Budgexa-ash bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-4">
              <AlertCircle size={28} />
            </div>
            <h2 className="text-xl font-bold text-Budgexa-green">Unable to load transaction</h2>
            <p className="mt-2 text-sm text-Budgexa-green/60">
              {fetchError || "The transaction you requested could not be found or may have been deleted."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/product/finance/transactions"
                className="inline-flex items-center gap-2 rounded-xl bg-Budgexa-green px-5 py-2.5 text-sm font-medium text-white transition hover:bg-Budgexa-green-dark"
              >
                <ArrowLeft size={16} />
                Return to Transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {showDeleteModal && (
        <DeleteModal
          label={transaction.description || "this transaction"}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}

      <div className="max-w-full mx-auto px-4 md:px-6 py-6">
        {/* ── BREADCRUMB ── */}
        <nav className="mb-3 flex items-center gap-2 text-xs font-medium text-Budgexa-green/50 px-5">
          <Link
            href="/product/finance/transactions"
            className="flex items-center gap-1.5 hover:text-Budgexa-green transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Transactions</span>
          </Link>
          <ChevronRight size={12} className="text-Budgexa-green/30" />
          <span className="text-Budgexa-green font-semibold">Edit Transaction</span>
          <span className="rounded-md bg-Budgexa-muted px-2 py-0.5 text-[10.5px] font-semibold text-Budgexa-green/60">
            #{transaction.id}
          </span>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between px-5 mb-6">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-Budgexa-green">
              Edit Transaction
            </h1>
            <p className="text-sm text-Budgexa-green/50 mt-1">
              Update amount, classification, merchant details, or re-categorize this record.
            </p>
          </div>

          {/* Quick discard / reset changes button if form has edits */}
          {isDirty && (
            <button
              type="button"
              onClick={handleResetToOriginal}
              className="inline-flex items-center gap-1.5 rounded-xl border border-Budgexa-ash bg-white px-3.5 py-2 text-xs font-medium text-Budgexa-green/70 hover:text-Budgexa-green hover:bg-Budgexa-muted/40 transition-colors self-start"
            >
              <RotateCcw size={13} />
              Reset Changes
            </button>
          )}
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-[1fr_380px] 2xl:grid-cols-[1fr_420px] gap-6">
          {/* ═════════════════════════════════════════════════════════
              LEFT: FORM INPUTS (Stretches to fill available page width)
             ═════════════════════════════════════════════════════════ */}
          <div className="order-1 rounded-2xl border border-Budgexa-ash bg-white p-6 md:p-8 shadow-sm space-y-6">
            {/* Direction tabs */}
            <Controller
              control={control}
              name="direction"
              render={({ field }) => (
                <div className="flex rounded-xl bg-Budgexa-ash p-1 gap-1">
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
                            ? "text-Budgexa-grey hover:text-green-500"
                            : "text-Budgexa-grey hover:text-red-500"
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

            {/* Amount, Date & Payment Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-Budgexa-green">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-Budgexa-green/60 select-none">
                    {getCurrencySymbol(currency)}
                  </span>
                  <input
                    {...register("amount")}
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    className={cn(
                      "w-full rounded-xl border bg-white py-2.5 pl-8 pr-3 text-sm font-semibold text-Budgexa-green outline-none transition placeholder:text-gray-300 focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10",
                      errors.amount ? "border-red-300 focus:ring-red-100" : "border-Budgexa-ash"
                    )}
                  />
                </div>
                {errors.amount ? (
                  <p className="text-xs text-red-500">{errors.amount.message}</p>
                ) : (
                  <p className="text-xs text-Budgexa-green/40">Enter numerical amount.</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-Budgexa-green">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("date")}
                    type="date"
                    className={cn(
                      "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-medium text-Budgexa-green outline-none transition focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10",
                      errors.date ? "border-red-300 focus:ring-red-100" : "border-Budgexa-ash"
                    )}
                  />
                </div>
                {errors.date ? (
                  <p className="text-xs text-red-500">{errors.date.message}</p>
                ) : (
                  <p className="text-xs text-Budgexa-green/40">Transaction record date.</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
                <label className="text-xs font-semibold text-Budgexa-green">
                  Transaction Type <span className="font-normal text-Budgexa-green/40">(Optional)</span>
                </label>
                <select
                  {...register("billType")}
                  className="w-full rounded-xl border border-Budgexa-ash bg-white px-3.5 py-2.5 text-sm text-Budgexa-green outline-none transition focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10"
                >
                  <option value="">Select type</option>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.icon} {m.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-Budgexa-green/40">Transfer, bill payment, etc.</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-Budgexa-green">
                Description / Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={3}
                maxLength={150}
                placeholder="E.g., Groceries at Spar, Monthly Internet renewal, Consulting payment"
                className={cn(
                  "w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-Budgexa-green outline-none transition placeholder:text-gray-300 focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10",
                  errors.description ? "border-red-300 focus:ring-red-100" : "border-Budgexa-ash"
                )}
              />
              <div className="flex items-center justify-between text-xs text-Budgexa-green/40">
                <span>Keep your records accurate for AI insights and reports.</span>
                <span>{(watched.description ?? "").length} / 150</span>
              </div>
            </div>

            {/* Category & Merchant (2 Columns on medium/large screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-Budgexa-green">
                  <Sparkles className="h-3.5 w-3.5 text-Budgexa-sage-dark" />
                  Category <span className="font-normal text-Budgexa-green/40">*</span>
                </label>

                <CategoryPicker
                  categories={categories}
                  value={selectedCategory}
                  onChange={(cat) => {
                    setSelectedCategory(cat);
                    setCategoryError(null);
                  }}
                />

                {categoryError && <p className="text-xs text-red-500">{categoryError}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-Budgexa-green">
                  Merchant / Payee <span className="font-normal text-Budgexa-green/40">(Optional)</span>
                </label>
                <input
                  {...register("merchant")}
                  type="text"
                  placeholder="E.g., Chicken Republic, Netflix, MTN"
                  className="w-full rounded-xl border border-Budgexa-ash bg-white px-3.5 py-3 text-sm text-Budgexa-green outline-none transition placeholder:text-gray-300 focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10"
                />
                <p className="text-xs text-Budgexa-green/40">The party paid or received from.</p>
              </div>
            </div>

            {/* Institution / Bank */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-Budgexa-green">
                <Building2 className="h-3.5 w-3.5 text-Budgexa-green/50" />
                Financial Institution <span className="font-normal text-Budgexa-green/40">(Optional)</span>
              </label>
              <select
                {...register("institution")}
                className="w-full rounded-xl border border-Budgexa-ash bg-white px-3.5 py-2.5 text-sm text-Budgexa-green outline-none transition focus:border-Budgexa-green/40 focus:ring-2 focus:ring-Budgexa-green/10"
              >
                <option value="">Select bank / institution</option>
                {BANKS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Form actions */}
            <div className="pt-4 border-t border-Budgexa-ash/60 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1 rounded-xl border border-Budgexa-ash bg-white py-3 text-sm font-medium text-Budgexa-green/70 transition hover:bg-Budgexa-muted hover:text-Budgexa-green active:scale-[0.99] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-Budgexa-green py-3 text-sm font-medium text-white transition hover:bg-Budgexa-green-dark active:scale-[0.99] disabled:opacity-60 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving Changes…
                  </>
                ) : (
                  <>
                    <Check size={16} strokeWidth={2.5} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════
              RIGHT: LIVE PREVIEW & SIDEBAR ACTIONS (Sticky on desktop)
             ═════════════════════════════════════════════════════════ */}
          <div className="order-2 space-y-5 xl:sticky xl:top-6 self-start">
            {/* Live Transaction Card Preview */}
            <div className="rounded-2xl border border-Budgexa-ash bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-Budgexa-ash">
                <div className="flex items-center gap-2">
                  <Receipt size={16} className="text-Budgexa-green/50" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-Budgexa-green/50">
                    Live Record Preview
                  </span>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
                    isIncome ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                  )}
                >
                  {isIncome ? "Income" : "Expense"}
                </span>
              </div>

              {/* Preview Body */}
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[11px] font-medium text-Budgexa-green/45 uppercase tracking-wide">
                    Updated Amount
                  </p>
                  <p
                    className={cn(
                      "text-3xl font-bold tracking-tight mt-1",
                      isIncome ? "text-emerald-600" : "text-red-500"
                    )}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(previewAmount || 0, currency)}
                  </p>
                </div>

                <div className="pt-3 border-t border-Budgexa-ash/60 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-Budgexa-green/50 text-xs">Description</span>
                    <span className="font-semibold text-Budgexa-green text-right line-clamp-2">
                      {watched.description || "No description provided"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-Budgexa-green/50 text-xs">Category</span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-Budgexa-muted px-2.5 py-1 text-xs font-semibold text-Budgexa-green">
                      <span>{currentCategoryEmoji}</span>
                      <span>{currentCategoryName}</span>
                    </span>
                  </div>

                  {watched.merchant && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-Budgexa-green/50 text-xs">Merchant / Payee</span>
                      <span className="font-medium text-Budgexa-green truncate max-w-[180px] text-right">
                        {watched.merchant}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-Budgexa-green/50 text-xs">Date</span>
                    <span className="font-medium text-Budgexa-green text-xs">
                      {watched.date
                        ? new Date(watched.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Today"}
                    </span>
                  </div>

                  {watched.institution && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-Budgexa-green/50 text-xs">Bank / Institution</span>
                      <span className="font-medium text-Budgexa-green truncate max-w-[180px] text-right text-xs">
                        🏦 {watched.institution}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Changes Indicator (Diff) */}
            {(hasAmountChanged || hasCategoryChanged) && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-xs space-y-2.5 shadow-sm">
                <p className="font-semibold text-amber-900 flex items-center gap-1.5 text-sm">
                  <Sparkles size={14} className="text-amber-600" />
                  Modified Details
                </p>
                {hasAmountChanged && (
                  <p className="text-amber-800 leading-relaxed">
                    Amount was{" "}
                    <span className="font-semibold line-through text-amber-700">
                      {formatCurrency(Number(transaction.amount), currency)}
                    </span>{" "}
                    &rarr; now{" "}
                    <span className="font-semibold text-amber-950">
                      {formatCurrency(previewAmount, currency)}
                    </span>
                  </p>
                )}
                {hasCategoryChanged && (
                  <p className="text-amber-800 leading-relaxed">
                    Category will change to{" "}
                    <span className="font-semibold text-amber-950">
                      {currentCategoryName}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Danger Zone: Delete Transaction */}
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 space-y-2 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-red-600">
                Danger Zone
              </h4>
              <p className="text-xs text-Budgexa-green/60">
                Permanently delete this transaction from your cashflow and account history.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
              >
                <Trash2 size={13} />
                Delete Transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
