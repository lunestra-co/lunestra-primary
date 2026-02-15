import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/database.types";

export type GemProduct = Tables<"gem_products">;
export type JewelleryProduct = Tables<"jewellery_products">;

class ProductService {
  // Get all gem products
  async getGemProducts() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gem_products")
        .select("*, category:category_id(name, slug)");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching gem products:", error);
      throw error;
    }
  }

  // Get all jewellery products
  async getJewelleryProducts() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("jewellery_products")
        .select("*, category:category_id(name, slug)");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching jewellery products:", error);
      throw error;
    }
  }

  // Get all products (both gem and jewellery)
  async getAll() {
    try {
      const [gemProducts, jewelleryProducts] = await Promise.all([
        this.getGemProducts(),
        this.getJewelleryProducts(),
      ]);
      return { gemProducts, jewelleryProducts };
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  // Get gem product by ID
  async getGemById(id: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gem_products")
        .select("*, category:category_id(name, slug)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching gem product:", error);
      throw error;
    }
  }

  // Get jewellery product by ID
  async getJewelleryById(id: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("jewellery_products")
        .select("*, category:category_id(name, slug)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching jewellery product:", error);
      throw error;
    }
  }

  // Create gem product
  async createGem(product: any) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gem_products")
        .insert([product])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("Error creating gem product:", error);
      throw error;
    }
  }

  // Create jewellery product
  async createJewellery(product: any) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("jewellery_products")
        .insert([product])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("Error creating jewellery product:", error);
      throw error;
    }
  }

  // Update gem product
  async updateGem(id: string, updates: any) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("gem_products")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("Error updating gem product:", error);
      throw error;
    }
  }

  // Update jewellery product
  async updateJewellery(id: string, updates: any) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("jewellery_products")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("Error updating jewellery product:", error);
      throw error;
    }
  }

  // Delete gem product
  async deleteGem(id: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("gem_products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting gem product:", error);
      throw error;
    }
  }

  // Delete jewellery product
  async deleteJewellery(id: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("jewellery_products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting jewellery product:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
