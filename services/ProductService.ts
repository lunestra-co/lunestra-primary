import { Product } from '../types';
import { ALL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'lunestra_products';

class ProductService {

    // Initialize storage if empty
    private init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_PRODUCTS));
        }
    }

    getAll(): Promise<Product[]> {
        return new Promise((resolve) => {
            this.init();
            const stored = localStorage.getItem(STORAGE_KEY);
            const products = stored ? JSON.parse(stored) : [];
            // Simulate network delay
            setTimeout(() => resolve(products), 300);
        });
    }

    getById(id: string): Promise<Product | undefined> {
        return new Promise((resolve) => {
            this.getAll().then(products => {
                resolve(products.find(p => p.id === id));
            });
        });
    }

    create(product: Omit<Product, 'id'>): Promise<Product> {
        return new Promise((resolve) => {
            this.getAll().then(products => {
                const newProduct = {
                    ...product,
                    id: Date.now().toString(), // Simple ID generation
                    status: product.status || 'available'
                } as Product;

                const updated = [newProduct, ...products];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setTimeout(() => resolve(newProduct), 300);
            });
        });
    }

    update(id: string, updates: Partial<Product>): Promise<Product> {
        return new Promise((resolve, reject) => {
            this.getAll().then(products => {
                const index = products.findIndex(p => p.id === id);
                if (index === -1) {
                    reject(new Error('Product not found'));
                    return;
                }

                const updatedProduct = { ...products[index], ...updates };
                products[index] = updatedProduct;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
                setTimeout(() => resolve(updatedProduct), 300);
            });
        });
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve) => {
            this.getAll().then(products => {
                const filtered = products.filter(p => p.id !== id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
                setTimeout(() => resolve(), 300);
            });
        });
    }

    // Admin Helper: Reset to default
    resetData(): Promise<void> {
        return new Promise((resolve) => {
            localStorage.removeItem(STORAGE_KEY);
            this.init();
            resolve();
        });
    }
}

export const productService = new ProductService();
