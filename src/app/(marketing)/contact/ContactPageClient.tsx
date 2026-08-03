"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import { fetchCurrentUser } from "@/lib/data-service";
import { submitContactMessage } from "@/lib/api-client";
import {
  Bug,
  MessageCircleQuestion,
  Lightbulb,
  CreditCard,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";

const CATEGORIES = [
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "inquiry", label: "General Inquiry", icon: MessageCircleQuestion },
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "other", label: "Other", icon: MoreHorizontal },
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  category: z.enum(["bug", "inquiry", "feature", "billing", "other"]),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Please provide a few more details").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactPageClientProps = {
  defaultCategory: string | null;
};

export function ContactPageClient({ defaultCategory }: ContactPageClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      category: (CATEGORIES.some((c) => c.value === defaultCategory) ? defaultCategory : "inquiry") as ContactFormValues["category"],
      subject: "",
      message: "",
    },
  });

  const message = watch("message");

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => {
        if (user.name) setValue("name", user.name);
        if (user.email) setValue("email", user.email);
      })
      .catch(() => {
        // Not logged in, or no token — that's fine, form stays blank.
      });
  }, [setValue]);

  async function onSubmit(data: ContactFormValues) {
    setServerError(null);
    try {
      await submitContactMessage(data);
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong sending your message. Please try again."
      );
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rayo-green/5 text-rayo-green">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-rayo-green">Message sent</h1>
          <p className="mt-2 text-rayo-green/60">
            Thanks for reaching out. We'll get back to you as soon as we can.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-rayo-green/20 px-5 py-2.5 text-sm font-medium text-rayo-green hover:bg-rayo-ash transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rayo-orange/20 bg-rayo-orange/5 px-4 py-2 text-sm font-medium text-rayo-orange mb-6">
            <Mail size={16} />
            We're here to help
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-rayo-green leading-tight">
            Get in touch
          </h1>
          <p className="mt-4 text-rayo-green/60 text-lg">
            Found a bug, have a question, or just want to say hi? Drop us a message below.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-rayo-ash bg-white p-6 md:p-8 shadow-sm space-y-6"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/50 mb-3">
              What's this about?
            </label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const active = field.value === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => field.onChange(cat.value)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-xs font-medium transition-all",
                          active
                            ? "border-rayo-green bg-rayo-green text-white"
                            : "border-rayo-ash text-rayo-green/60 hover:border-rayo-green/30"
                        )}
                      >
                        <Icon size={16} />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-rayo-green">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                className={cn(
                  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-rayo-green/40 focus:ring-2 focus:ring-rayo-green/10",
                  errors.name ? "border-red-300" : "border-gray-200"
                )}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-rayo-green">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={cn(
                  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-rayo-green/40 focus:ring-2 focus:ring-rayo-green/10",
                  errors.email ? "border-red-300" : "border-gray-200"
                )}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              {...register("subject")}
              type="text"
              placeholder="Short summary of your message"
              className={cn(
                "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-rayo-green/40 focus:ring-2 focus:ring-rayo-green/10",
                errors.subject ? "border-red-300" : "border-gray-200"
              )}
            />
            {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-rayo-green">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message")}
              rows={6}
              maxLength={2000}
              placeholder="Tell us what's going on — the more detail, the faster we can help."
              className={cn(
                "w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-rayo-green/40 focus:ring-2 focus:ring-rayo-green/10",
                errors.message ? "border-red-300" : "border-gray-200"
              )}
            />
            <div className="flex items-center justify-between">
              {errors.message ? (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              ) : (
                <p className="text-xs text-gray-400">Minimum 10 characters.</p>
              )}
              <span className="text-xs text-gray-400">{(message ?? "").length} / 2000</span>
            </div>
          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-rayo-orange py-3.5 text-sm font-semibold text-white transition-all hover:bg-rayo-orange/90 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}