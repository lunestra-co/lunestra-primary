import React, { useState, useEffect } from "react";
import { Product } from "../../types";
import Button from "../Button";
import { X, Upload } from "lucide-react";

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: Omit<Product, "id">) => Promise<void>;
  onCancel: () => void;
}

const CATEGORIES = [
  "Blue Sapphire",
  "Ruby",
  "Emerald",
  "Padparadscha",
  "Diamond",
  "Pink Sapphire",
  "Star Sapphire",
];
const ORIGINS = ["Ceylon", "Burma", "Colombia", "Madagascar", "Botswana"];

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: CATEGORIES[0],
    price: "",
    origin: ORIGINS[0],
    carats: 0,
    priceValue: 0,
    image:
      "https://images.unsplash.com/photo-1617038220319-33fc2e608c54?auto=format&fit=crop&q=80&w=800",
    status: "available",
    description: "",
    clarity: "VVS1",
    shape: "Oval",
    gallery: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure priceValue is set if user only edited string price
      const priceStr = formData.price || "$0";
      const numericPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ""));

      await onSubmit({
        ...(formData as Product),
        priceValue: numericPrice,
      });
      onCancel();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl">
            {initialData ? "Edit Product" : "New Product"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Name
              </label>
              <input
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Price (Display)
              </label>
              <input
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.price}
                placeholder="$12,000"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Category
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Origin
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
              >
                {ORIGINS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Carats
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.carats}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    carats: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Status
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
              >
                <option value="available">Available</option>
                <option value="private_consideration">
                  Private Consideration
                </option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Main Image URL
              </label>
              <div className="flex gap-4">
                <input
                  className="flex-1 bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
                <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Gallery Images (One URL per line)
              </label>
              <textarea
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold font-mono"
                value={formData.gallery?.join("\n") || ""}
                placeholder="https://example.com/image_2.jpg&#10;https://example.com/image_3.jpg"
                onChange={(e) => {
                  const urls = e.target.value
                    .split("\n")
                    .filter((url) => url.trim().length > 0);
                  setFormData({ ...formData, gallery: urls });
                }}
              />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {formData.gallery?.map((url, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-gray-200 relative group"
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="pt-4 flex gap-4">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-brandblack text-white hover:bg-gold"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
