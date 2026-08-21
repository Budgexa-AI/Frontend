// components/CategoryPicker.tsx
"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/types/src";

export type CategoryPickerValue =
  | { type: "existing"; category: Category }
  | { type: "custom"; name: string; parentSlug: string }
  | null;

interface Props {
  categories: Category[];
  value: CategoryPickerValue;
  onChange: (val: CategoryPickerValue) => void;
}

export function CategoryPicker({ categories, value, onChange }: Props) {
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [selectedParent, setSelectedParent] = useState("");

  const systemOnly = categories.filter((c) => c.isSystem);

  const selectedId =
    value?.type === "existing" ? String(value.category.id) : null;

  const selectedCategory =
    value?.type === "existing" ? value.category : null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <select
          value={selectedId ?? ""}
          onChange={(e) => {
            const next = systemOnly.find((cat) => String(cat.id) === e.target.value);
            if (!next) {
              onChange(null);
              return;
            }

            setShowCustom(false);
            onChange({ type: "existing", category: next });
          }}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-Budgexa-green outline-none transition",
            "focus:border-Budgexa-green focus:ring-2 focus:ring-Budgexa-green/20",
            selectedCategory ? "border-Budgexa-green/30" : "border-gray-200"
          )}
        >
          <option value="">Select a category</option>
          {systemOnly.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.emoji ?? "📦"} {cat.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          ▾
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setShowCustom((current) => !current);
          if (showCustom) {
            onChange(selectedCategory ? { type: "existing", category: selectedCategory } : null);
          } else {
            onChange(null);
          }
        }}
        className="self-start text-xs font-medium text-Budgexa-orange transition-colors hover:underline"
      >
        {showCustom ? "Hide custom category" : "Create custom category"}
      </button>

      {/* Custom category input */}
      {showCustom && (
        <div className="rounded-xl border border-Budgexa-orange/30 bg-Budgexa-orange/5 p-3 flex flex-col gap-2">
          <p className="text-xs text-gray-500">
            Name your category and pick which group it belongs to.
          </p>
          <input
            type="text"
            placeholder="e.g. Hair Care, Asoebi, Church offering"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-Budgexa-green focus:ring-2 focus:ring-Budgexa-green/20"
          />
          <select
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-Budgexa-green"
          >
            <option value="">Which group does this fall under?</option>
            {systemOnly.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>

          {customName.trim() && selectedParent && (
            <button
              type="button"
              onClick={() =>
                onChange({
                  type: "custom",
                  name: customName.trim(),
                  parentSlug: selectedParent,
                })
              }
              className="rounded-lg bg-Budgexa-green px-3 py-1.5 text-xs font-medium text-white"
            >
              Use "{customName.trim()}"
            </button>
          )}
        </div>
      )}

      {/* Selected custom category confirmation */}
      {value?.type === "custom" && (
        <p className="text-xs text-Budgexa-green/70">
          ✓ "{value.name}" will be saved as a custom category under {
            systemOnly.find((c) => c.slug === value.parentSlug)?.name ?? value.parentSlug
          } and available next time.
        </p>
      )}
    </div>
  );
}