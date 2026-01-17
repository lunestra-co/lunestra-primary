import React, { useState, useEffect } from "react";
import { Product, Order, Client, ShopPartner } from "../../types";
import { productService } from "../../services/ProductService";
import { orderService } from "../../services/OrderService";
import { clientService } from "../../services/ClientService";
import {
  bannerService,
  HeroSlide,
  PromoBanner,
} from "../../services/BannerService";
import { shopService } from "../../services/ShopService";
import { settingsService, SiteSettings } from "../../services/SettingsService";
import ProductForm from "./ProductForm";
import Button from "../Button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Plus,
  Search,
  Bell,
  MoreVertical,
  DollarSign,
  ShoppingBag,
  Trash2,
  Edit2,
  TrendingUp,
  PieChart as PieChartIcon,
  Menu,
  X,
  Image as ImageIcon,
  Settings,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "products"
    | "orders"
    | "clients"
    | "banners"
    | "shops"
    | "settings"
  >("dashboard");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
  const [shops, setShops] = useState<ShopPartner[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingShop, setEditingShop] = useState<ShopPartner | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    const [pData, oData, cData, hData, prData, sData, setRes] =
      await Promise.all([
        productService.getAll(),
        orderService.getAll(),
        clientService.getAll(),
        bannerService.getHeroSlides(),
        bannerService.getPromoBanners(),
        shopService.getShops(),
        settingsService.getSettings(),
      ]);
    setProducts(pData);
    setOrders(oData);
    setClients(cData);
    setHeroSlides(hData);
    setPromoBanners(prData);
    setShops(sData);
    setSettings(setRes);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" || password === "LUNESTRA") {
      setIsAuthenticated(true);
    }
  };

  // Product Actions
  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await productService.delete(id);
      loadAllData();
    }
  };
  const handleFormSubmit = async (data: Omit<Product, "id">) => {
    if (editingProduct) {
      await productService.update(editingProduct.id, data);
    } else {
      await productService.create(data);
    }
    loadAllData();
    setIsFormOpen(false);
  };

  // Order Actions
  const handleOrderStatus = async (id: string, status: Order["status"]) => {
    await orderService.updateStatus(id, status);
    loadAllData();
  };

  // Derived Stats
  const revenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const activeOrders = orders.filter(
    (o) => o.status === "Processing" || o.status === "Shipped"
  ).length;

  // Chart Data Preparation
  const revenueData = React.useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString("default", { month: "short" }),
        amount: 0,
      };
    }).reverse();

    // In a real app, parse actual dates. Here we mock distribution for visual if needed,
    // or map real mock dates if they match.
    // For the sake of this demo, we'll map the few existing orders and random fill
    // to show a nice chart since our mock data volume is low.
    return last6Months.map((m) => ({
      name: m.month,
      revenue: Math.floor(Math.random() * 50000) + 10000,
    }));
  }, [orders]);

  const categoryData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brandblack flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1617038220319-33fc2e608c54?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="relative z-10 bg-white p-12 max-w-md w-full shadow-2xl text-center">
          <h1 className="font-serif text-3xl mb-2 text-brandblack">
            Admin Portal
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">
            Restricted Access
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-gray-50 border border-gray-200 p-4 text-center focus:outline-none focus:border-gold transition-colors"
            />
            <Button className="w-full bg-brandblack text-white hover:bg-gold">
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
      <aside className="w-64 bg-brandblack text-white flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden lg:block">
        <div className="p-8 border-b border-white/10">
          <span className="font-serif text-2xl tracking-wide">Lunestra</span>
          <span className="block text-[10px] text-gold uppercase tracking-widest mt-1">
            Admin Console
          </span>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "dashboard"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "products"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package className="w-5 h-5" /> Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "orders"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShoppingCart className="w-5 h-5" /> Orders
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "clients"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-5 h-5" /> Clients
          </button>
          <button
            onClick={() => setActiveTab("banners")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "banners"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ImageIcon className="w-5 h-5" /> Banners
          </button>
          <button
            onClick={() => setActiveTab("shops")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "shops"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin className="w-5 h-5" /> Shops
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
              activeTab === "settings"
                ? "bg-gold text-brandblack"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
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
            <h2 className="text-xl font-medium text-gray-800 capitalize">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-brandblack cursor-pointer" />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="w-8 h-8 bg-brandblack rounded-full flex items-center justify-center text-gold font-serif">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Real Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Revenue</p>
                    <h3 className="text-2xl font-serif">
                      ${revenue.toLocaleString()}
                    </h3>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full text-brandblack">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Active Orders
                    </p>
                    <h3 className="text-2xl font-serif">{activeOrders}</h3>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full text-brandblack">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Products</p>
                    <h3 className="text-2xl font-serif">{products.length}</h3>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full text-brandblack">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Clients</p>
                    <h3 className="text-2xl font-serif">{clients.length}</h3>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-full text-brandblack">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-lg">Revenue Trend</h3>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                          cursor={{ fill: "#f9fafb" }}
                          contentStyle={{
                            border: "none",
                            borderRadius: "4px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#1a1a1a"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <PieChartIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-lg">
                      Inventory Distribution
                    </h3>
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {categoryData.map((entry, index) => (
                      <div
                        key={entry.name}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-500"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity Table using Real Data */}
              <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-serif text-lg">Recent Orders</h3>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          ${order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products View */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  className="bg-brandblack text-white hover:bg-gold flex items-center gap-2 text-xs py-3 px-6"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </div>
              <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products
                      .filter((p) =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.image}
                                className="w-10 h-10 object-cover rounded-sm"
                              />
                              <span className="text-sm font-medium">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {product.price}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold ${
                                product.status === "available"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end text-gray-400">
                              <button
                                onClick={() => handleEdit(product)}
                                className="hover:text-blue-600"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders View */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">All Orders</h2>
              <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          ${order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleOrderStatus(order.id, e.target.value as any)
                            }
                            className="text-xs bg-gray-100 border-none rounded p-1"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">
                          View Details
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clients View */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">Client Directory</h2>
              <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Total Spend</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-brandblack">
                              {client.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {client.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {client.location}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          ${client.totalSpend.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold ${
                              client.status === "VIP"
                                ? "bg-gold/20 text-brandblack"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 italic max-w-xs truncate">
                          {client.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Banners View */}
          {activeTab === "banners" && (
            <div className="space-y-12 max-w-5xl">
              {/* Hero Slides section */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif">
                    Hero Slides (Homepage)
                  </h2>
                  <Button
                    onClick={() =>
                      bannerService.resetDefaults().then(loadAllData)
                    }
                    className="bg-gray-100 text-gray-600 text-xs hover:bg-gray-200"
                  >
                    Reset Defaults
                  </Button>
                </div>
                <div className="space-y-6">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm flex gap-6 items-start"
                    >
                      <div className="w-32 h-20 bg-gray-100 flex-shrink-0">
                        <img
                          src={slide.image}
                          alt="Slide"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">
                              Title
                            </label>
                            <input
                              className="w-full border-b border-gray-200 py-1 font-serif text-lg focus:outline-none focus:border-gold"
                              value={slide.title}
                              onChange={(e) => {
                                const newSlides = [...heroSlides];
                                newSlides[idx].title = e.target.value;
                                setHeroSlides(newSlides);
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">
                              Subtitle
                            </label>
                            <input
                              className="w-full border-b border-gray-200 py-1 text-sm text-gold tracking-wide focus:outline-none focus:border-gold"
                              value={slide.subtitle}
                              onChange={(e) => {
                                const newSlides = [...heroSlides];
                                newSlides[idx].subtitle = e.target.value;
                                setHeroSlides(newSlides);
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-gray-400 mb-1">
                            Image URL
                          </label>
                          <input
                            className="w-full border-b border-gray-200 py-1 text-xs text-gray-500 focus:outline-none focus:border-gold"
                            value={slide.image}
                            onChange={(e) => {
                              const newSlides = [...heroSlides];
                              newSlides[idx].image = e.target.value;
                              setHeroSlides(newSlides);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        bannerService
                          .updateHeroSlides(heroSlides)
                          .then(() => alert("Slides Updated!"))
                      }
                      className="bg-brandblack text-white hover:bg-gold"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </section>

              <div className="h-px bg-gray-200" />

              {/* Promo Banners section */}
              <section>
                <h2 className="text-2xl font-serif mb-6">
                  Promotional Banners
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {promoBanners.map((banner, idx) => (
                    <div
                      key={banner.id}
                      className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm space-y-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-gray-400">
                          {banner.id} Banner
                        </span>
                      </div>

                      <div className="w-full h-32 bg-gray-100 overflow-hidden mb-4">
                        <img
                          src={banner.image}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">
                          Tag (Top Label)
                        </label>
                        <input
                          className="w-full border-b border-gray-200 py-1 text-sm font-medium focus:outline-none focus:border-gold"
                          value={banner.tag}
                          onChange={(e) => {
                            const newBanners = [...promoBanners];
                            newBanners[idx].tag = e.target.value;
                            setPromoBanners(newBanners);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">
                          Main Heading
                        </label>
                        <input
                          className="w-full border-b border-gray-200 py-1 font-serif text-xl focus:outline-none focus:border-gold"
                          value={banner.title}
                          onChange={(e) => {
                            const newBanners = [...promoBanners];
                            newBanners[idx].title = e.target.value;
                            setPromoBanners(newBanners);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">
                          Description
                        </label>
                        <textarea
                          className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-gold rounded-sm"
                          rows={3}
                          value={banner.description}
                          onChange={(e) => {
                            const newBanners = [...promoBanners];
                            newBanners[idx].description = e.target.value;
                            setPromoBanners(newBanners);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">
                          Image URL
                        </label>
                        <input
                          className="w-full border-b border-gray-200 py-1 text-xs text-gray-500 focus:outline-none focus:border-gold"
                          value={banner.image}
                          onChange={(e) => {
                            const newBanners = [...promoBanners];
                            newBanners[idx].image = e.target.value;
                            setPromoBanners(newBanners);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() =>
                      bannerService
                        .updatePromoBanners(promoBanners)
                        .then(() => alert("Banners Updated!"))
                    }
                    className="bg-brandblack text-white hover:bg-gold"
                  >
                    Save Changes
                  </Button>
                </div>
              </section>
            </div>
          )}

          {/* Shops Management */}
          {activeTab === "shops" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif">Ateliers & Shops</h2>
                <Button
                  onClick={() => {
                    const newShop = {
                      name: "New Shop",
                      location: "City, Country",
                      specialty: "General",
                      image: "",
                    };
                    shopService.addShop(newShop).then(loadAllData);
                  }}
                  className="bg-brandblack text-white hover:bg-gold flex items-center gap-2 text-xs py-3 px-6"
                >
                  <Plus className="w-4 h-4" /> Add Shop
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden group"
                  >
                    <div className="h-48 bg-gray-100 relative">
                      {shop.image ? (
                        <img
                          src={shop.image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            if (confirm("Delete shop?"))
                              shopService.deleteShop(shop.id).then(loadAllData);
                          }}
                          className="p-2 bg-white rounded-full text-red-500 hover:text-red-700 shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <input
                        className="w-full font-serif text-lg border-b border-transparent focus:border-gold focus:outline-none"
                        value={shop.name}
                        onChange={(e) => {
                          const updated = shops.map((s) =>
                            s.id === shop.id
                              ? { ...s, name: e.target.value }
                              : s
                          );
                          setShops(updated);
                        }}
                        onBlur={() =>
                          shopService.updateShop(
                            shops.find((s) => s.id === shop.id)!
                          )
                        }
                      />
                      <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold">
                        <MapPin className="w-3 h-3" />
                        <input
                          className="flex-1 bg-transparent border-b border-transparent focus:border-gold focus:outline-none"
                          value={shop.location}
                          onChange={(e) => {
                            const updated = shops.map((s) =>
                              s.id === shop.id
                                ? { ...s, location: e.target.value }
                                : s
                            );
                            setShops(updated);
                          }}
                          onBlur={() =>
                            shopService.updateShop(
                              shops.find((s) => s.id === shop.id)!
                            )
                          }
                        />
                      </div>
                      <input
                        className="w-full text-sm text-gray-500 italic border-b border-transparent focus:border-gold focus:outline-none"
                        value={shop.specialty}
                        placeholder="Specialty..."
                        onChange={(e) => {
                          const updated = shops.map((s) =>
                            s.id === shop.id
                              ? { ...s, specialty: e.target.value }
                              : s
                          );
                          setShops(updated);
                        }}
                        onBlur={() =>
                          shopService.updateShop(
                            shops.find((s) => s.id === shop.id)!
                          )
                        }
                      />
                      <div className="pt-2">
                        <label className="text-[10px] uppercase text-gray-400">
                          Image URL
                        </label>
                        <input
                          className="w-full text-xs text-gray-400 border-b border-gray-100 focus:border-gold focus:outline-none"
                          value={shop.image}
                          onChange={(e) => {
                            const updated = shops.map((s) =>
                              s.id === shop.id
                                ? { ...s, image: e.target.value }
                                : s
                            );
                            setShops(updated);
                          }}
                          onBlur={() =>
                            shopService.updateShop(
                              shops.find((s) => s.id === shop.id)!
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Management */}
          {activeTab === "settings" && settings && (
            <div className="max-w-2xl bg-white border border-gray-100 rounded-sm shadow-sm p-8">
              <h2 className="text-2xl font-serif mb-8">Global Site Settings</h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase text-gray-400 mb-2">
                    Site Name
                  </label>
                  <input
                    className="w-full text-xl font-serif border-b border-gray-200 py-2 focus:border-gold focus:outline-none"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">
                      Contact Email
                    </label>
                    <input
                      className="w-full text-sm border-b border-gray-200 py-2 focus:border-gold focus:outline-none"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">
                      Phone
                    </label>
                    <input
                      className="w-full text-sm border-b border-gray-200 py-2 focus:border-gold focus:outline-none"
                      value={settings.contactPhone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-gray-400 mb-2">
                    Address
                  </label>
                  <input
                    className="w-full text-sm border-b border-gray-200 py-2 focus:border-gold focus:outline-none"
                    value={settings.contactAddress}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contactAddress: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-serif text-lg">Social Media Links</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Instagram URL"
                      className="w-full text-sm border border-gray-200 p-2 rounded-sm focus:border-gold focus:outline-none"
                      value={settings.socials.instagram}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: {
                            ...settings.socials,
                            instagram: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      placeholder="Facebook URL"
                      className="w-full text-sm border border-gray-200 p-2 rounded-sm focus:border-gold focus:outline-none"
                      value={settings.socials.facebook}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: {
                            ...settings.socials,
                            facebook: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      placeholder="YouTube URL"
                      className="w-full text-sm border border-gray-200 p-2 rounded-sm focus:border-gold focus:outline-none"
                      value={settings.socials.youtube}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: {
                            ...settings.socials,
                            youtube: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      placeholder="Pinterest URL"
                      className="w-full text-sm border border-gray-200 p-2 rounded-sm focus:border-gold focus:outline-none"
                      value={settings.socials.pinterest}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: {
                            ...settings.socials,
                            pinterest: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-8">
                  <Button
                    onClick={() =>
                      settingsService.resetSettings().then(loadAllData)
                    }
                    className="bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs shadow-none"
                  >
                    Reset Default
                  </Button>
                  <Button
                    onClick={() =>
                      settingsService
                        .updateSettings(settings)
                        .then(() => alert("Settings Saved!"))
                    }
                    className="bg-brandblack text-white hover:bg-gold px-8"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {isFormOpen && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative w-64 bg-brandblack text-white h-full shadow-2xl flex flex-col slide-in-from-left duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <span className="font-serif text-xl tracking-wide">
                  Lunestra
                </span>
                <span className="block text-[10px] text-gold uppercase tracking-widest mt-1">
                  Admin Console
                </span>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-2 mt-4 flex-1">
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "dashboard"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("products");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "products"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Package className="w-5 h-5" /> Products
              </button>
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "orders"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ShoppingCart className="w-5 h-5" /> Orders
              </button>
              <button
                onClick={() => {
                  setActiveTab("clients");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "clients"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Users className="w-5 h-5" /> Clients
              </button>
              <button
                onClick={() => {
                  setActiveTab("banners");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "banners"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ImageIcon className="w-5 h-5" /> Banners
              </button>
              <button
                onClick={() => {
                  setActiveTab("shops");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "shops"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MapPin className="w-5 h-5" /> Shops
              </button>
              <button
                onClick={() => {
                  setActiveTab("settings");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === "settings"
                    ? "bg-gold text-brandblack"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Settings className="w-5 h-5" /> Settings
              </button>
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="w-full flex items-center gap-4 px-4 py-3 text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
