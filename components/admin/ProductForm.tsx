import React, { useState, useEffect } from "react";
import { productService } from "@/services/ProductService";
import Button from "../Button";
import { X } from "lucide-react";

interface ProductFormProps {
  initialData?: any | null;
  productType: "gem" | "jewellery";
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}

const GEM_CATEGORIES = [
  "Blue Sapphire",
  "Ruby",
  "Emerald",
  "Padparadscha",
  "Diamond",
  "Pink Sapphire",
];

const JEWELLERY_CATEGORIES = [
  "Ring",
  "Necklace",
  "Bracelet",
  "Earring",
  "Pendant",
  "Brooch",
];

const METAL_TYPES = ["Gold", "Platinum", "Silver", "Rose Gold", "White Gold"];

export default function ProductForm({
  initialData,
  productType,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Set default form data based on product type
      if (productType === "gem") {
        setFormData({
          name: "",
          slug: "",
          price: 0,
          weight: 0,
          shape: "Oval",
          clarity: "VVS1",
          color: "Royal Blue",
          treatment: "Unheated",
          rarity_score: 8,
          rarity_percentile: 90,
          image: "",
          gallery: [],
          description: "",
          available: true,
          certification: "GIA",
        });
      } else {
        setFormData({
          name: "",
          slug: "",
          price: 0,
          metal_type: "Gold",
          primary_gem_type: "Diamond",
          style: "Classic",
          image: "",
          gallery: [],
          description: "",
          available: true,
          sizes: [],
        });
      }
    }
  }, [initialData, productType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        // Update
        if (productType === "gem") {
          await productService.updateGem(initialData.id, formData);
        } else {
          await productService.updateJewellery(initialData.id, formData);
        }
      } else {
        // Create
        if (productType === "gem") {
          await productService.createGem(formData);
        } else {
          await productService.createJewellery({
            id: Date.now().toString(),
            ...formData,
          });
        }
      }
      await onSubmit();
      onCancel();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
          <h2 className="font-serif text-xl">
            {initialData
              ? `Edit ${productType} Product`
              : `New ${productType} Product`}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Name *
              </label>
              <input
                required
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Slug
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.slug || ""}
                onChange={(e) => handleChange("slug", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Price *
              </label>
              <input
                required
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.price || 0}
                onChange={(e) => handleChange("price", parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Sale Price
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.sale_price || 0}
                onChange={(e) =>
                  handleChange("sale_price", parseInt(e.target.value))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Image URL
            </label>
            <input
              type="url"
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.image || ""}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Description
            </label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold h-24"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Available
            </label>
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={formData.available !== false}
              onChange={(e) => handleChange("available", e.target.checked)}
            />
          </div>

          {/* Gem-specific Fields */}
          {productType === "gem" && (
            <>
              <div className="border-t pt-6">
                <h3 className="font-serif text-lg mb-6">Gem Specifications</h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Weight (Carats)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.weight || 0}
                    onChange={(e) =>
                      handleChange("weight", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Shape
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.shape || ""}
                    onChange={(e) => handleChange("shape", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Clarity
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.clarity || ""}
                    onChange={(e) => handleChange("clarity", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.color || ""}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Treatment
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.treatment || ""}
                    onChange={(e) => handleChange("treatment", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Certification
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.certification || ""}
                    onChange={(e) =>
                      handleChange("certification", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Rarity Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.rarity_score || 0}
                    onChange={(e) =>
                      handleChange("rarity_score", parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Rarity Percentile
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.rarity_percentile || 0}
                    onChange={(e) =>
                      handleChange("rarity_percentile", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* Jewellery-specific Fields */}
          {productType === "jewellery" && (
            <>
              <div className="border-t pt-6">
                <h3 className="font-serif text-lg mb-6">Jewellery Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Metal Type
                  </label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.metal_type || ""}
                    onChange={(e) => handleChange("metal_type", e.target.value)}
                  >
                    <option value="">Select Metal</option>
                    {METAL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Primary Gem Type
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.primary_gem_type || ""}
                    onChange={(e) =>
                      handleChange("primary_gem_type", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Style
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.style || ""}
                    onChange={(e) => handleChange("style", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Collection
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                    value={formData.collection || ""}
                    onChange={(e) => handleChange("collection", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                  Craftsmanship
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                  value={formData.craftsmanship || ""}
                  onChange={(e) => handleChange("craftsmanship", e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brandblack text-white hover:bg-gold"
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
