export interface Inquiry {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Responded";
}

const STORAGE_KEY = "lunestra_inquiries";

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-001",
    date: new Date().toISOString(),
    customerName: "Alice Freeman",
    phone: "+94 77 123 4567",
    subject: "Bespoke Inquiry",
    message: "I am interested in a custom emerald ring.",
    status: "Read",
  },
];

class InquiryService {
  private init() {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INQUIRIES));
    }
  }

  getAll(): Promise<Inquiry[]> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY);
      resolve(stored ? JSON.parse(stored) : []);
    });
  }

  create(inquiry: Omit<Inquiry, "id" | "date" | "status">): Promise<void> {
    return new Promise((resolve) => {
      this.getAll().then((inquiries) => {
        const newInquiry: Inquiry = {
          ...inquiry,
          id: `INQ-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString(),
          status: "New",
        };
        const updated = [newInquiry, ...inquiries];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve();
      });
    });
  }
}

export const inquiryService = new InquiryService();
