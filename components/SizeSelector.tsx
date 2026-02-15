"use client";
import React, { useState } from "react";

type SizeSelectorProps = {
  sizeType: string;
  sizes: string[] | string;
  onSizeSelect: (size: string) => void;
};

export default function SizeSelector({
  sizeType,
  sizes,
  onSizeSelect,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const parsedSizes = Array.isArray(sizes)
    ? sizes
    : typeof sizes === "string"
      ? JSON.parse(sizes)
      : [];

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onSizeSelect(size);
  };

  return (
    <div className="pt-4 pb-4">
      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-4">
        {sizeType}
      </label>
      <div className="flex flex-wrap gap-3">
        {parsedSizes.map((size: string) => (
          <label key={size} className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={() => handleSizeChange(size)}
              className="sr-only accent-gold"
            />
            <span
              className={`px-4 py-2 border rounded transition-colors text-sm font-medium ${
                selectedSize === size
                  ? "border-brandblack bg-brandblack text-white"
                  : "border-gray-200 text-gray-700 hover:border-brandblack"
              }`}
            >
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
