"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import { getStoredUser, isAuthenticated } from "@/lib/auth-client";
import { fetchCurrentUser } from "@/lib/data-service";
import { submitContactMessage } from "@/lib/api-client";
import {
  Mail,
  ChevronDown,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Check,
  Headphones,
} from "lucide-react";

const CATEGORIES = [
  { value: "inquiry", label: "General Inquiry" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "billing", label: "Billing & Subscription" },
  { value: "other", label: "Other" },
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  email: z.string().trim().email("Enter a valid email address"),
  category: z.enum(["bug", "inquiry", "feature", "billing", "other"]),
  message: z.string().trim().min(10, "Please provide a few more details").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactPageClientProps = {
  defaultCategory: string | null;
};

export function ContactPageClient({ defaultCategory }: ContactPageClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const initialCategory = CATEGORIES.some((c) => c.value === defaultCategory)
    ? (defaultCategory as ContactFormValues["category"])
    : "inquiry";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      category: initialCategory,
      message: "",
    },
  });

  const selectedCategory = watch("category");

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofill user details if logged in
  useEffect(() => {
    const stored = getStoredUser();
    if (stored?.fullName) setValue("name", stored.fullName);
    if (stored?.email) setValue("email", stored.email);

    if (!isAuthenticated() || (stored?.fullName && stored?.email)) return;

    fetchCurrentUser()
      .then((user) => {
        if (user.name) setValue("name", user.name);
        if (user.email) setValue("email", user.email);
      })
      .catch(() => {
        // Not logged in or no token — form stays empty
      });
  }, [setValue]);

  async function onSubmit(data: ContactFormValues) {
    setServerError(null);
    try {
      await submitContactMessage(data);
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  }

  if (submitted) {
    return (
      <main className="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center bg-[#FAF7EE] px-6 py-20">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-10 border border-[#254F22]/10 shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#254F22]/10 text-[#254F22]">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-[#1b3d18]">
            Message received
          </h1>
          <p className="mt-3 text-[#254F22]/70 text-base leading-relaxed">
            Thank you for reaching out. We&apos;ve received your message and our team will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#EA6A35] hover:bg-[#d85e2b] px-7 py-3 text-sm font-semibold text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] pt-16 grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT PANEL (05, Title, Info, Human Support Badge) ── */}
      <section className="bg-[#DFD7BF] px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 md:py-20 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#254F22]/10">
        <div>
          {/* Top index */}
          <span className="text-xs sm:text-sm font-mono text-[#254F22]/50 font-semibold tracking-wider block">
            05
          </span>

          {/* Main Editorial Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-[#1b3d18] leading-[0.95] tracking-tight mt-8 sm:mt-14 md:mt-20 mb-6 sm:mb-8">
            Get in<br />touch.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#254F22]/85 leading-relaxed max-w-sm sm:max-w-md mb-8 font-normal">
            Questions about Budgexa? We read every message. Drop us a note and we&apos;ll get back to you shortly.
          </p>

          {/* Email row */}
          <a
            href="mailto:info@budgexa.app"
            className="inline-flex items-center gap-3 text-base sm:text-lg font-medium text-[#1b3d18] hover:underline underline-offset-4 transition-all group"
          >
            <Mail size={20} className="stroke-[1.75] text-[#1b3d18] group-hover:scale-105 transition-transform" />
            <span>info@budgexa.app</span>
          </a>
        </div>

        {/* Human Support Pill Badge */}
        <div className="mt-14 sm:mt-20 flex justify-end">
          <div className="inline-flex items-center gap-3 bg-[#FAF7EE]/95 backdrop-blur-sm rounded-full pl-2 pr-4 sm:pr-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/80 select-none hover:shadow-md transition-shadow">
            {/* Peachy circle with headset icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3E7D5] flex items-center justify-center shrink-0">
              <Headphones size={17} className="text-[#EA6A35] stroke-[2]" />
            </div>

            {/* Text block */}
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-[#1b3d18] leading-tight">
                Human Support
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#7A8775] font-medium leading-tight mt-0.5">
                Real people. Real help.
              </span>
            </div>

            {/* Orange indicator dot */}
            <span className="w-2 h-2 rounded-full bg-[#EA6A35] shrink-0 ml-1" />
          </div>
        </div>
      </section>

      {/* ── RIGHT PANEL (Interactive Contact Form) ── */}
      <section className="bg-[#FAF7EE] px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 md:py-20 flex flex-col justify-center">
        <div className="max-w-lg w-full mx-auto">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-7"
          >
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-1"
              >
                FULL NAME
              </label>
              <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="Alex Doe"
                className={cn(
                  "w-full bg-transparent border-b pb-2 pt-1 text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors",
                  errors.name
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* TITLE / SUBJECT */}
            <div>
              <label
                htmlFor="subject"
                className="block text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-1"
              >
                TITLE / SUBJECT
              </label>
              <input
                id="subject"
                {...register("subject")}
                type="text"
                placeholder="Brief summary of your report"
                className={cn(
                  "w-full bg-transparent border-b pb-2 pt-1 text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors",
                  errors.subject
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* EMAIL ADDRESS */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-1"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="alex@example.com"
                className={cn(
                  "w-full bg-transparent border-b pb-2 pt-1 text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors",
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* ISSUE CATEGORY */}
            <div className="relative" ref={categoryDropdownRef}>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-1">
                ISSUE CATEGORY
              </label>
              <button
                type="button"
                onClick={() => setCategoryOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center justify-between bg-transparent border-b pb-2 pt-1 text-base text-left focus:outline-none transition-colors cursor-pointer",
                  errors.category
                    ? "border-red-400"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              >
                <span
                  className={cn(
                    selectedCategory ? "text-[#1b3d18]" : "text-[#254F22]/40"
                  )}
                >
                  {selectedCategory
                    ? CATEGORIES.find((c) => c.value === selectedCategory)?.label
                    : "Select a category"}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-[#254F22]/60 transition-transform duration-200",
                    categoryOpen && "rotate-180"
                  )}
                />
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#254F22]/15 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setValue("category", cat.value, { shouldValidate: true });
                          setCategoryOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer",
                          isSelected
                            ? "bg-[#254F22]/10 text-[#1b3d18] font-semibold"
                            : "text-[#254F22]/80 hover:bg-[#254F22]/5 hover:text-[#1b3d18]"
                        )}
                      >
                        <span>{cat.label}</span>
                        {isSelected && <Check size={16} className="text-[#EA6A35]" />}
                      </button>
                    );
                  })}
                </div>
              )}
              {errors.category && (
                <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* YOUR MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-2"
              >
                YOUR MESSAGE
              </label>
              <div
                className={cn(
                  "rounded-[26px] border-[1.5px] p-4 transition-colors bg-transparent",
                  errors.message
                    ? "border-red-400"
                    : "border-[#7D9B78]/70 focus-within:border-[#254F22]"
                )}
              >
                <textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  maxLength={2000}
                  placeholder="How can we help you?"
                  className="w-full resize-none bg-transparent text-base text-[#1b3d18] placeholder:text-[#254F22]/40 outline-none leading-relaxed"
                />
              </div>
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#EA6A35] hover:bg-[#d85e2b] text-white font-semibold text-sm sm:text-base px-8 py-3.5 shadow-sm inline-flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Message</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}