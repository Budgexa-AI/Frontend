"use client";

import Image from "next/image";
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
      <main className="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center bg-[#FBF9F5] px-6 py-20">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-10 border border-[#e5e2db] shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5824A]/10 text-[#F5824A]">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-[#1b3d18]">
            Message received
          </h1>
          <p className="mt-3 text-[#1b3d18]/70 text-base leading-relaxed">
            Thank you for reaching out. We&apos;ve received your message and our team will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#F5824A] hover:bg-[#e06d34] px-7 py-3 text-sm font-semibold text-white transition-colors shadow-sm"
          >
            Send Another Message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen lg:h-screen pt-16 grid grid-cols-1 lg:grid-cols-2 bg-[#FBF9F5] overflow-hidden">
      {/* ── LEFT PANEL (Botanical BG + Editorial Copy, Info, Support Badge) ── */}
      <section className="relative bg-[#FBF9F5] pl-8 sm:pl-16 lg:pl-40 xl:pl-52 pr-6 sm:pr-8 lg:pr-12 py-8 sm:py-10 lg:py-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#e5e2db] overflow-hidden">
        {/* Botanical background image - fully opaque */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/images/signup-botanical-bg.webp"
            alt="Botanical background"
            fill
            className="object-cover object-left"
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAgCdASoUAAwAPzmEuVOvKKWisAgB4CcJaQAAeyAA/u39ZobeyUFAAAA="
          />
        </div>

        <div className="relative z-10 max-w-sm">
          {/* Main Editorial Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-normal text-black leading-[0.98] tracking-tight mt-4 sm:mt-6 lg:mt-8 mb-4 sm:mb-5">
            Get in<br />
            <span className="text-[#1b3d18]">touch.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#1b3d18]/75 leading-relaxed max-w-sm mb-6 font-normal">
            Questions about Budgexa? We read every message. Drop us a note and we&apos;ll get back to you shortly.
          </p>

          {/* Email row */}
          <a
            href="mailto:info@budgexa.app"
            className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#1b3d18] hover:text-[#F5824A] hover:underline underline-offset-4 transition-all group"
          >
            <Mail size={18} className="stroke-[1.75] text-[#1b3d18] group-hover:text-[#F5824A] group-hover:scale-105 transition-transform" />
            <span>info@budgexa.app</span>
          </a>
        </div>

        {/* Human Support Pill Badge */}
        <div className="relative z-10 mt-6 flex justify-start">
          <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-sm rounded-full pl-1.5 pr-4 py-1.5 shadow-xs border border-[#e5e2db] select-none hover:border-[#1b3d18]/25 transition-all">
            {/* Circle with headset icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5824A]/10 flex items-center justify-center shrink-0">
              <Headphones size={15} className="text-[#F5824A] stroke-[2]" />
            </div>

            {/* Text block */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#1b3d18] leading-tight">
                Human Support
              </span>
              <span className="text-[10px] text-[#1b3d18]/60 font-medium leading-tight">
                Real people. Real help.
              </span>
            </div>

            {/* Orange indicator dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5824A] shrink-0 ml-1" />
          </div>
        </div>
      </section>

      {/* ── RIGHT PANEL (Interactive Contact Form) ── */}
      <section className="bg-[#FBF9F5] px-8 sm:px-12 lg:px-14 xl:px-16 py-8 sm:py-10 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            {/* FULL NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] font-bold tracking-widest uppercase text-[#1b3d18] mb-0.5"
              >
                FULL NAME
              </label>
              <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="Alex Doe"
                className={cn(
                  "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#1b3d18]/35 focus:outline-none transition-colors",
                  errors.name
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#e5e2db] focus:border-[#1b3d18]"
                )}
              />
              {errors.name && (
                <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* TITLE / SUBJECT */}
            <div>
              <label
                htmlFor="subject"
                className="block text-[10px] font-bold tracking-widest uppercase text-[#1b3d18] mb-0.5"
              >
                TITLE / SUBJECT
              </label>
              <input
                id="subject"
                {...register("subject")}
                type="text"
                placeholder="Brief summary of your report"
                className={cn(
                  "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#1b3d18]/35 focus:outline-none transition-colors",
                  errors.subject
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#e5e2db] focus:border-[#1b3d18]"
                )}
              />
              {errors.subject && (
                <p className="mt-0.5 text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* EMAIL ADDRESS */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold tracking-widest uppercase text-[#1b3d18] mb-0.5"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="alex@example.com"
                className={cn(
                  "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#1b3d18]/35 focus:outline-none transition-colors",
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#e5e2db] focus:border-[#1b3d18]"
                )}
              />
              {errors.email && (
                <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* ISSUE CATEGORY */}
            <div className="relative" ref={categoryDropdownRef}>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[#1b3d18] mb-0.5">
                ISSUE CATEGORY
              </label>
              <button
                type="button"
                onClick={() => setCategoryOpen((prev) => !prev)}
                className={cn(
                  "w-full flex items-center justify-between bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-left focus:outline-none transition-colors cursor-pointer",
                  errors.category
                    ? "border-red-400"
                    : "border-[#e5e2db] focus:border-[#1b3d18]"
                )}
              >
                <span
                  className={cn(
                    selectedCategory ? "text-[#1b3d18]" : "text-[#1b3d18]/35"
                  )}
                >
                  {selectedCategory
                    ? CATEGORIES.find((c) => c.value === selectedCategory)?.label
                    : "Select a category"}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "text-[#1b3d18]/60 transition-transform duration-200",
                    categoryOpen && "rotate-180"
                  )}
                />
              </button>

              {categoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#e5e2db] py-1 z-20 animate-in fade-in zoom-in-95 duration-150">
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
                          "w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between cursor-pointer",
                          isSelected
                            ? "bg-[#F7F5EE] text-[#1b3d18] font-semibold"
                            : "text-[#1b3d18]/80 hover:bg-[#F7F5EE] hover:text-[#1b3d18]"
                        )}
                      >
                        <span>{cat.label}</span>
                        {isSelected && <Check size={14} className="text-[#F5824A]" />}
                      </button>
                    );
                  })}
                </div>
              )}
              {errors.category && (
                <p className="mt-0.5 text-xs text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* YOUR MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-bold tracking-widest uppercase text-[#1b3d18] mb-1"
              >
                YOUR MESSAGE
              </label>
              <div
                className={cn(
                  "rounded-2xl border p-3 transition-colors bg-white",
                  errors.message
                    ? "border-red-400"
                    : "border-[#e5e2db] focus-within:border-[#1b3d18] focus-within:ring-1 focus-within:ring-[#1b3d18]/20"
                )}
              >
                <textarea
                  id="message"
                  {...register("message")}
                  rows={3}
                  maxLength={2000}
                  placeholder="How can we help you?"
                  className="w-full resize-none bg-transparent text-sm text-[#1b3d18] placeholder:text-[#1b3d18]/35 outline-none leading-relaxed"
                />
              </div>
              {errors.message && (
                <p className="mt-0.5 text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {serverError}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#F5824A] hover:bg-[#e06d34] text-white font-semibold text-sm px-7 py-3 shadow-sm inline-flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Message</span>
                    <ArrowRight size={16} />
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