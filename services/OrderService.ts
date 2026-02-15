import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/database.types";

export type Order = Tables<"orders">;

export interface OrderData {
  user_id?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string | null;
  city: string;
  postal: string;
  items: any[];
  add_crafting_voucher?: boolean;
  selected_shop?: string | null;
  voucher_price?: number | null;
  coupon_code?: string | null;
  coupon_discount?: number | null;
  payment_method: string;
  payment_slip_url?: string | null;
  total: number;
  shipping?: number;
  status?: string;
}

export async function createOrder(orderData: OrderData) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return data?.[0];
}

export async function getOrderById(orderId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data;
}

export async function getUserOrders(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data;
}

export async function getAllOrders() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)
    .select();

  if (error) {
    throw new Error(`Failed to update order: ${error.message}`);
  }

  return data?.[0];
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select();

  if (error) {
    throw new Error(`Failed to update payment status: ${error.message}`);
  }

  return data?.[0];
}
