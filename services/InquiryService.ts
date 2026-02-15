import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/database.types";

export type ProductInquiry = Tables<"product_inquiries">;

export interface InquiryData {
  product_id: string;
  product_type: string;
  product_name: string;
  product_details?: string | null;
  customer_name: string;
  email: string;
  whatsapp_number: string;
  message?: string | null;
  status: string;
  user_id?: string | null;
}

export async function createInquiry(inquiryData: InquiryData) {
  const supabase = createClient();

  // Try to get user id if authenticated
  let userId = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const { data, error } = await supabase
    .from("product_inquiries")
    .insert([{ ...inquiryData, user_id: userId }])
    .select();

  if (error) {
    throw new Error(`Failed to create inquiry: ${error.message}`);
  }

  return data?.[0];
}

export async function getInquiries() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch inquiries: ${error.message}`);
  }

  return data || [];
}

export async function getInquiryById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch inquiry: ${error.message}`);
  }

  return data;
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_inquiries")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Failed to update inquiry: ${error.message}`);
  }

  return data?.[0];
}

export async function deleteInquiry(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("product_inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete inquiry: ${error.message}`);
  }
}
