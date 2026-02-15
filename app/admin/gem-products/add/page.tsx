"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { productService } from "@/services/ProductService";
import Button from "@/components/Button";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

export default function AddGemProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    category_id: "",
    price: 0,
    weight: 0,
    shape: "Oval",
    clarity: "VVS1",
    color: "Royal Blue",
    origin: "",
    transparency: "Crystal Clear",
    dimensions: "",
    treatment: "Unheated",
    rarity_score: 8,
    rarity_percentile: 90,
    rarity_scope: "Global Supply",
    image: "",
    gallery: [],
    description: "",
    videoUrl: "",
    available: true,
    certification: "GIA",
    can_get_certificate: false,
    certificate_price: 0,
    certificate_description: "",
    pricing_type: "",
    badge: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("type", "gemstone")
          .order("name");
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addGalleryUrl = () => {
    if (galleryUrlInput.trim()) {
      setFormData({
        ...formData,
        gallery: [...(formData.gallery || []), galleryUrlInput.trim()],
      });
      setGalleryUrlInput("");
    }
  };

  const removeGalleryUrl = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_: string, i: number) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productService.createGem(formData);
      router.push("/admin/gem-products");
    } catch (error) {
      console.error(error);
      alert("Failed to create gem product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/gem-products"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Gem Products
      </Link>

      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-8">
        <h1 className="font-serif text-2xl mb-8">Add New Gem Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.name}
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
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Category
            </label>
            <select
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.category_id}
              onChange={(e) => handleChange("category_id", e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
                value={formData.price}
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
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Gallery Images
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Enter image URL"
                  className="flex-1 bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                  value={galleryUrlInput}
                  onChange={(e) => setGalleryUrlInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addGalleryUrl();
                    }
                  }}
                />
                <Button
                  type="button"
                  className="bg-gold text-white hover:bg-brandblack px-4"
                  onClick={addGalleryUrl}
                >
                  Add
                </Button>
              </div>
              {formData.gallery && formData.gallery.length > 0 && (
                <div className="space-y-2">
                  {formData.gallery.map((url: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded text-sm"
                    >
                      <span className="text-gray-600 truncate">{url}</span>
                      <button
                        type="button"
                        onClick={() => removeGalleryUrl(idx)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Description
            </label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold h-24"
              value={formData.description}
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
              checked={formData.available}
              onChange={(e) => handleChange("available", e.target.checked)}
            />
          </div>

          {/* Gem-specific Fields */}
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
                value={formData.weight}
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
                value={formData.shape}
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
                value={formData.clarity}
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
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Origin
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Transparency
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.transparency}
                onChange={(e) => handleChange("transparency", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Dimensions
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.dimensions}
                onChange={(e) => handleChange("dimensions", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Treatment
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.treatment}
                onChange={(e) => handleChange("treatment", e.target.value)}
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
                value={formData.rarity_score}
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
                value={formData.rarity_percentile}
                onChange={(e) =>
                  handleChange("rarity_percentile", parseInt(e.target.value))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Rarity Scope
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.rarity_scope}
              onChange={(e) => handleChange("rarity_scope", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Certification
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.certification}
                onChange={(e) => handleChange("certification", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Pricing Type
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.pricing_type}
                onChange={(e) => handleChange("pricing_type", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Can Get Certificate
            </label>
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={formData.can_get_certificate}
              onChange={(e) => handleChange("can_get_certificate", e.target.checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Certificate Price
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.certificate_price}
                onChange={(e) =>
                  handleChange("certificate_price", parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Certificate Description
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.certificate_description}
                onChange={(e) =>
                  handleChange("certificate_description", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Video URL
            </label>
            <input
              type="url"
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.videoUrl}
              onChange={(e) => handleChange("videoUrl", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Badge (e.g., New, Sale, Featured)
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
              value={formData.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href="/admin/gem-products">
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-brandblack text-white hover:bg-gold"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Gem Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
