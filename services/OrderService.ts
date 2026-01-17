import { Order, Product } from '../types';
import { ALL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'lunestra_orders';

// Helper to get random product
const p = (idx: number) => ALL_PRODUCTS[idx] || ALL_PRODUCTS[0];

const MOCK_ORDERS: Order[] = [
    {
        id: '#ORD-7721',
        date: 'Oct 24, 2023',
        customerName: 'Evelyn St. Claire',
        customerId: 'C-001',
        products: [p(0)],
        totalAmount: 12500,
        status: 'Processing',
        paymentStatus: 'Paid',
        shippingAddress: '123 Park Ave, New York, NY, USA'
    },
    {
        id: '#ORD-7720',
        date: 'Oct 23, 2023',
        customerName: 'Marcus Thorne',
        customerId: 'C-002',
        products: [p(1)],
        totalAmount: 28000,
        status: 'Shipped',
        paymentStatus: 'Paid',
        shippingAddress: '45 Kensington High St, London, UK'
    },
    {
        id: '#ORD-7719',
        date: 'Oct 21, 2023',
        customerName: 'Lady W.',
        customerId: 'C-003',
        products: [p(4), p(6)],
        totalAmount: 51200,
        status: 'Delivered',
        paymentStatus: 'Paid',
        shippingAddress: 'Private Estate, Paris, France'
    }
];

class OrderService {
    private init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
        }
    }

    getAll(): Promise<Order[]> {
        return new Promise((resolve) => {
            this.init();
            const stored = localStorage.getItem(STORAGE_KEY);
            resolve(stored ? JSON.parse(stored) : []);
        });
    }

    getRecent(): Promise<Order[]> {
        return this.getAll().then(orders => orders.slice(0, 5));
    }

    updateStatus(id: string, status: Order['status']): Promise<void> {
        return new Promise((resolve) => {
            this.getAll().then(orders => {
                const idx = orders.findIndex(o => o.id === id);
                if (idx !== -1) {
                    orders[idx].status = status;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
                }
                resolve();
            });
        });
    }
}

export const orderService = new OrderService();
