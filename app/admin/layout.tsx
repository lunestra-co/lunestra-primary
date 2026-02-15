"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "./AdminContext";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuthProvider";
import Button from "@/components/Button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  LogOut,
  Bell,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

const ADMIN_ROUTES = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "gem-products",
    label: "Gem Products",
    icon: Package,
    href: "/admin/gem-products",
  },
  {
    id: "jewellery-products",
    label: "Jewellery",
    icon: ShoppingBag,
    href: "/admin/jewellery-products",
  },
  { id: "orders", label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  {
    id: "inquiries",
    label: "Inquiries",
    icon: MessageSquare,
    href: "/admin/inquiries",
  },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, adminUsername, login, logout, loading } =
    useAdminAuth();
  const { loadAllData } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (login(username, password)) {
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  useEffect(() => {
    if (isAuthenticated && !loading) {
      loadAllData();
    }
  }, [isAuthenticated, loading, loadAllData]);

  const currentRoute = ADMIN_ROUTES.find((r) => r.href === pathname);
  const pageTitle = currentRoute?.label || "Admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandblack mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brandblack flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1617038220319-33fc2e608c54?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="relative z-10 bg-white p-12 max-w-md w-full shadow-2xl text-center">
          <h1 className="text-3xl mb-2 text-brandblack">Admin Portal</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">
            Restricted Access
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-xs">
                {loginError}
              </div>
            )}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-50 border border-gray-200 p-4 text-center focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-50 border border-gray-200 p-4 text-center focus:outline-none focus:border-gold transition-colors"
            />
            <Button
              type="submit"
              className="w-full bg-brandblack text-white hover:bg-gold"
            >
              Enter Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brandblack text-white shrink-0 sticky top-0 h-screen overflow-y-auto hidden lg:block">
        <div className="p-8 border-b border-white/10">
          <span className="text-2xl tracking-wide">Lunestra</span>
          <span className="block text-[10px] text-gold uppercase tracking-widest mt-1">
            Admin Console
          </span>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {ADMIN_ROUTES.map(({ id, label, icon: Icon, href }) => (
            <button
              key={id}
              onClick={() => {
                router.push(href);
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                pathname === href
                  ? "bg-gold text-brandblack"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" /> {label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-4 px-4 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <aside className="relative w-64 bg-brandblack text-white h-full overflow-y-auto">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div>
                <span className="text-2xl tracking-wide">Lunestra</span>
                <span className="block text-[10px] text-gold uppercase tracking-widest mt-1">
                  Admin Console
                </span>
              </div>
              <button onClick={() => setIsMobileNavOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-2 mt-4">
              {ADMIN_ROUTES.map(({ id, label, icon: Icon, href }) => (
                <button
                  key={id}
                  onClick={() => {
                    router.push(href);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                    pathname === href
                      ? "bg-gold text-brandblack"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" /> {label}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden text-gray-500 hover:text-brandblack"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-medium text-gray-800">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-5 h-5 text-gray-400 hover:text-brandblack cursor-pointer" />
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="w-8 h-8 bg-brandblack rounded-full flex items-center justify-center text-gold">
                {adminUsername?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {adminUsername || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminProvider>
    </AdminAuthProvider>
  );
}
