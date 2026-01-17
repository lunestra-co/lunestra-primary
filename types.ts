export interface Product {
  id: string;
  name: string;
  category: string; // Used for Variety
  price: string;
  priceValue: number; // For sorting logic
  carats: number;
  origin: string;
  shape: string;
  clarity: string;
  image: string;
  isNew?: boolean;
  // New PDP fields
  gallery?: string[];
  description?: string;
  certProvider?: 'GIA' | 'GRS' | 'SSEF' | 'Gübelin';
  certId?: string;
  rarityProfile?: {
    text: string;
    score: number; // 1-10 scale
  };
  videoUrl?: string; // For Hands of the Maker/360
  status?: 'available' | 'private_consideration' | 'sold';
}

export interface NavItem {
  label: string;
  href: string;
}

export enum CollectionType {
  SAPPHIRE = 'Sapphire',
  EMERALD = 'Emerald',
  RUBY = 'Ruby',
  DIAMOND = 'Diamond'
}

export interface ShopPartner {
  id: string;
  name: string;
  location: string;
  specialty: string;
  image: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpend: number;
  joinDate: string;
  notes?: string;
  status: 'VIP' | 'Active' | 'Inactive';
}

export interface Inquiry {
  id: string;
  clientId?: string;
  clientName: string;
  email: string;
  type: 'General' | 'Bespoke' | 'Viewing' | 'Valuation';
  message: string;
  date: string;
  status: 'New' | 'Replied' | 'Closed';
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerId?: string;
  products: Product[];
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  shippingAddress: string;
  trackingNumber?: string;
  documents?: {
    title: string;
    type: 'Certificate' | 'Invoice' | 'Appraisal';
    downloadUrl: string;
  }[];
}