// lib/validations.ts
import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .max(80, "Name too long")
    .refine(
      (name) => name.trim().split(/\s+/).length >= 2,
      "Please enter your first and last name"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters, contain an uppercase letter, and contain a number")
    .regex(/[A-Z]/, "Password must be at least 8 characters, contain an uppercase letter, and contain a number")
    .regex(/[0-9]/, "Password must be at least 8 characters, contain an uppercase letter, and contain a number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export const addTransactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  merchant: z.string().optional(),
  direction: z.enum(["Income", "Expense"]),
  category: z.string().min(1, "Category is required"),
  institution: z.string().optional(),
  billType: z.string().optional(),
});

export type AddTransactionFormValues = z.infer<typeof addTransactionSchema>;
