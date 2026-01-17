import { ShopPartner } from "../types";

export interface VoucherBooking {
  id: string;
  date: string;
  shopId: string;
  voucherId: string;
  customerName: string;
  status: "Pending" | "Confirmed";
}

const STORAGE_KEY_SHOPS = "lunestra_shops";
const STORAGE_KEY_BOOKINGS = "lunestra_voucher_bookings";

const DEFAULT_SHOPS: ShopPartner[] = [
  {
    id: "1",
    name: "Atelier Vernier",
    location: "Paris, France",
    specialty: "Bespoke Setting",
    image:
      "https://mpjjewellers.com/_next/image?url=%2Fassets%2Fimages%2Fabout-us.jpg&w=1200&q=75",
  },
  {
    id: "2",
    name: "The Gold smiths",
    location: "London, UK",
    specialty: "Traditional Casting",
    image: "https://media.timeout.com/images/105273284/750/562/image.jpg",
  },
  {
    id: "3",
    name: "Kyoto Crafts",
    location: "Kyoto, Japan",
    specialty: "Minimalist Design",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/3/JF/MM/JE/29223489/jewellery-shops-interiors.jpeg",
  },
  {
    id: "4",
    name: "Milanese Masters",
    location: "Milan, Italy",
    specialty: "Modern Artistry",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/9/RJ/JJ/PS/124861549/jewellery-shops-interior-service.jpg",
  },
];

class ShopService {
  private init() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(STORAGE_KEY_SHOPS)) {
      localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(DEFAULT_SHOPS));
    }
    if (!localStorage.getItem(STORAGE_KEY_BOOKINGS)) {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify([]));
    }
  }

  // -- Shop Management --

  getShops(): Promise<ShopPartner[]> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY_SHOPS);
      resolve(stored ? JSON.parse(stored) : DEFAULT_SHOPS);
    });
  }

  addShop(shop: Omit<ShopPartner, "id">): Promise<void> {
    return new Promise((resolve) => {
      this.getShops().then((shops) => {
        const newShop = { ...shop, id: Date.now().toString() };
        const updated = [...shops, newShop];
        localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(updated));
        resolve();
      });
    });
  }

  updateShop(shop: ShopPartner): Promise<void> {
    return new Promise((resolve) => {
      this.getShops().then((shops) => {
        const idx = shops.findIndex((s) => s.id === shop.id);
        if (idx !== -1) {
          shops[idx] = shop;
          localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(shops));
        }
        resolve();
      });
    });
  }

  deleteShop(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.getShops().then((shops) => {
        const updated = shops.filter((s) => s.id !== id);
        localStorage.setItem(STORAGE_KEY_SHOPS, JSON.stringify(updated));
        resolve();
      });
    });
  }

  resetShops(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(STORAGE_KEY_SHOPS);
      this.init();
      resolve();
    });
  }

  // -- Booking Logic (Legacy) --

  getBookings(): Promise<VoucherBooking[]> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      resolve(stored ? JSON.parse(stored) : []);
    });
  }

  bookVoucher(shopId: string, voucherId: string): Promise<void> {
    return new Promise((resolve) => {
      this.getBookings().then((bookings) => {
        const newBooking: VoucherBooking = {
          id: `BKG-${Date.now().toString().slice(-5)}`,
          date: new Date().toISOString(),
          shopId,
          voucherId,
          customerName: "Current User",
          status: "Pending",
        };
        const updated = [newBooking, ...bookings];
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
        resolve();
      });
    });
  }
}

export const shopService = new ShopService();
