"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addTransactionSchema } from "@/lib/validations";

export async function createTransactionAction(
  values: z.infer<typeof addTransactionSchema>
) {
  try {
    // TODO: Implement actual transaction creation
    const transaction = {
      ...values,
      userId: "user_2c0Z8qJ7bJ9nL6wX4Y5Z2A1B3C",
    };

    revalidatePath("/product/finance/transactions");

    return {
      data: transaction,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
