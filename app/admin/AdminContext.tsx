"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { productService } from "@/services/ProductService";
import { getAllOrders, updateOrderStatus } from "@/services/OrderService";
import { getInquiries, updateInquiryStatus } from "@/services/InquiryService";

type GemProduct = any;
type JewelleryProduct = any;
type Order = any;
type ProductInquiry = any;

interface AdminContextType {
  gemProducts: GemProduct[];
  jewelleryProducts: JewelleryProduct[];
  orders: Order[];
  inquiries: ProductInquiry[];
  loading: boolean;
  loadAllData: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  updateInquiryStatus: (inquiryId: string, status: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [gemProducts, setGemProducts] = useState<GemProduct[]>([]);
  const [jewelleryProducts, setJewelleryProducts] = useState<
    JewelleryProduct[]
  >([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [{ gemProducts: gp, jewelleryProducts: jp }, oData, inquiriesData] =
        await Promise.all([
          productService.getAll(),
          getAllOrders(),
          getInquiries(),
        ]);

      setGemProducts(gp || []);
      setJewelleryProducts(jp || []);
      setOrders(oData || []);
      setInquiries(inquiriesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOrderStatusUpdate = useCallback(
    async (orderId: string, newStatus: string) => {
      try {
        await updateOrderStatus(orderId, newStatus);
        loadAllData();
      } catch (error) {
        alert("Failed to update order status");
      }
    },
    [loadAllData],
  );

  const handleInquiryStatusUpdate = useCallback(
    async (inquiryId: string, newStatus: string) => {
      try {
        await updateInquiryStatus(inquiryId, newStatus);
        loadAllData();
      } catch (error) {
        alert("Failed to update inquiry status");
      }
    },
    [loadAllData],
  );

  return (
    <AdminContext.Provider
      value={{
        gemProducts,
        jewelleryProducts,
        orders,
        inquiries,
        loading,
        loadAllData,
        updateOrderStatus: handleOrderStatusUpdate,
        updateInquiryStatus: handleInquiryStatusUpdate,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
