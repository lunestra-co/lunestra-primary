"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { productService } from "@/services/ProductService";
import Button from "@/components/Button";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

const METAL_TYPES = ["Gold", "Platinum", "Silver", "Rose Gold", "White Gold"];

export default function AddJewelleryProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    category_id: "",
    price: 0,
    sale_price: 0,
    metal_type: "Gold",
    primary_gem_type: "Diamond",
    style: "Classic",
    image: "",
    gallery: [],
    description: "",
    videoUrl: "",
    available: true,
    sizes: [],
    collection: "",
    craftsmanship: "",
    setting_type: "",
    secondary_gem_details: "",
    hallmark_details: "",
    size_type: "",
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
          .eq("type", "jewellery")
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
      await productService.createJewellery({
        id: Date.now().toString(),
        ...formData,
      });
      router.push("/admin/jewellery-products");
    } catch (error) {
      console.error(error);
      alert("Failed to create jewellery product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/jewellery-products"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jewellery Products
      </Link>

      <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-8">
        <h1 className="font-serif text-2xl mb-8">Add New Jewellery Product</h1>

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

          {/* Jewellery-specific Fields */}
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
                value={formData.metal_type}
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
                value={formData.primary_gem_type}
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
                value={formData.style}
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
                value={formData.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Craftsmanship
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.craftsmanship}
                onChange={(e) => handleChange("craftsmanship", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Hallmark Details
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.hallmark_details}
                onChange={(e) => handleChange("hallmark_details", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Setting Type
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.setting_type}
                onChange={(e) => handleChange("setting_type", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Secondary Gem Details
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.secondary_gem_details}
                onChange={(e) => handleChange("secondary_gem_details", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
                Size Type
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold"
                value={formData.size_type}
                onChange={(e) => handleChange("size_type", e.target.value)}
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
            <Link href="/admin/jewellery-products">
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-brandblack text-white hover:bg-gold"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Jewellery Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
