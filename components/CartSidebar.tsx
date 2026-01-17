"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { Trash } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CART_KEY = "cartItems";

export interface CartItem {
  productId: string;
  need_cert: boolean;
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToCart(productId: string, need_cert: boolean = false) {
  const items = getCartItems();
  if (!items.some((item) => item.productId === productId)) {
    items.push({ productId, need_cert });
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  }
}

export function removeFromCart(productId: string) {
  const items = getCartItems().filter((item) => item.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const updateCart = async () => {
      const items = getCartItems();
      setCartItems(items);
      const ids = items.map((item) => item.productId);
      if (ids.length > 0) {
        const supabase = createClient();
        const { data: products, error } = await supabase
          .from("products")
          .select("*, category:category_id(name, slug)")
          .in("id", ids);
        setProducts(products || []);
      } else {
        setProducts([]);
      }
    };
    updateCart();
    const onStorage = () => updateCart();
    const onCartUpdated = () => updateCart();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, [isOpen]);

  // Ref for sidebar
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Animation state for mounting/unmounting
  const [show, setShow] = React.useState(isOpen);
  const [sidebarVisible, setSidebarVisible] = React.useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Delay to allow CSS transition
      setTimeout(() => setSidebarVisible(true), 10);
    } else {
      setSidebarVisible(false);
      // Wait for transition to finish before unmounting
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    show && (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${sidebarVisible ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
          aria-label="Close cart overlay"
        />
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-screen w-120 bg-ivory shadow-2xl z-50 border-l border-gold/20 transition-transform duration-300 ${sidebarVisible ? "translate-x-0" : "translate-x-full"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-gold/10 bg-white/80 backdrop-blur-md rounded-tr-2xl shrink-0">
              <h2 className="font-serif text-7xl text-brandblack font-semibold">
                Cart
              </h2>
              <button
                onClick={onClose}
                className="text-brandblack hover:text-gold cursor-pointer text-6xl font-[50] px-2 transition-colors"
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mb-4 text-gold"
                  >
                    <circle cx="24" cy="24" r="22" strokeDasharray="4 4" />
                    <path d="M16 24h16M24 16v16" strokeLinecap="round" />
                  </svg>
                  <p className="font-serif text-lg text-brandblack/60 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-gray-400">
                    Add some beautiful pieces to begin your collection.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gold/10">
                  {products.map((product) => {
                    const cartItem = cartItems.find(
                      (item) => item.productId === product.id,
                    );
                    return (
                      <li
                        key={product.id}
                        className="flex items-start gap-3 py-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded border border-gold/10"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-xl font-semibold text-brandblack truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400 truncate mb-4">
                            {product.category?.name || "Uncategorized"}
                          </div>
                          <div className="flex flex-col flex-start text-xs text-gold font-bold">
                            {product.sale_price ? (
                              <>
                                <span className="text-gold">
                                  LKR{" "}
                                  {product.sale_price.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                                {product.price && (
                                  <span className="line-through text-gray-400">
                                    LKR{" "}
                                    {product.price.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                )}
                              </>
                            ) : product.price ? (
                              `LKR ${product.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`
                            ) : (
                              ""
                            )}
                          </div>
                          {cartItem?.need_cert && (
                            <div className="inline-block text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold mt-1">
                              Certificate Requested
                            </div>
                          )}
                        </div>
                        <button
                          className="text-red-400 hover:text-white hover:bg-red-500 border border-red-200 rounded-full px-2 py-2 transition-colors font-normal"
                          onClick={() => {
                            removeFromCart(product.id);
                            setCartItems(getCartItems());
                            setProducts(
                              products.filter((p) => p.id !== product.id),
                            );
                          }}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {/* Subtotal and Actions */}
            {products.length > 0 && (
              <div className="p-6 border-t border-gold/10 bg-white/80 mt-6 rounded-b-2xl shrink-0">
                {/* Subtotal calculation */}
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="font-serif text-lg text-brandblack">
                    Subtotal
                  </span>
                  <span className="font-serif text-xl text-gold font-bold">
                    {(() => {
                      let subtotal = 0;
                      products.forEach((product) => {
                        let price = 0;
                        if (typeof product.price === "number")
                          price = product.price;
                        else if (typeof product.price === "string")
                          price = parseFloat(
                            product.price.replace(/[^\d.]/g, ""),
                          );
                        const cartItem = cartItems.find(
                          (item) => item.productId === product.id,
                        );
                        if (cartItem?.need_cert) price += 1000;
                        subtotal += price;
                      });
                      return `LKR ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    })()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <button
                    className="flex-1 py-4 bg-gold/80 text-white font-bold uppercase tracking-wider text-sm hover:bg-gold transition-colors cursor-pointer"
                    onClick={() =>
                      alert("Proceed to checkout (implement logic)")
                    }
                  >
                    Checkout
                  </button>
                  <button
                    className="flex-1 py-3 rounded-lg text-gray-700 font-bold uppercase tracking-wider text-xs cursor-pointer"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CartSidebar;
