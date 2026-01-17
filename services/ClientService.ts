import { Client } from '../types';

const STORAGE_KEY = 'lunestra_clients';

const MOCK_CLIENTS: Client[] = [
    {
        id: 'C-001',
        name: 'Evelyn St. Claire',
        email: 'evelyn.st@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        totalSpend: 152000,
        joinDate: '2023-01-15',
        status: 'VIP',
        notes: 'Collects unheated rubies. Prefer text contact.'
    },
    {
        id: 'C-002',
        name: 'Marcus Thorne',
        email: 'm.thorne@example.com',
        phone: '+44 20 7123 4567',
        location: 'London, UK',
        totalSpend: 42000,
        joinDate: '2023-03-22',
        status: 'Active',
        notes: 'Interested in sapphires for investment.'
    },
    {
        id: 'C-003',
        name: 'Lady W.',
        email: 'private@estate.com',
        phone: '+33 1 23 45 67 89',
        location: 'Paris, France',
        totalSpend: 285000,
        joinDate: '2022-11-05',
        status: 'VIP',
        notes: 'Requires anonymity. Delivery to legal counsel only.'
    }
];

class ClientService {
    private init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CLIENTS));
        }
    }

    getAll(): Promise<Client[]> {
        return new Promise((resolve) => {
            this.init();
            const stored = localStorage.getItem(STORAGE_KEY);
            resolve(stored ? JSON.parse(stored) : []);
        });
    }

    getById(id: string): Promise<Client | undefined> {
        return new Promise((resolve) => {
            this.getAll().then(clients => {
                resolve(clients.find(c => c.id === id));
            });
        });
    }

    create(client: Omit<Client, 'id'>): Promise<Client> {
        return new Promise((resolve) => {
            this.getAll().then(clients => {
                const newClient = { ...client, id: `C-${Date.now()}` } as Client;
                localStorage.setItem(STORAGE_KEY, JSON.stringify([newClient, ...clients]));
                resolve(newClient);
            });
        });
    }

    update(id: string, updates: Partial<Client>): Promise<Client> {
        return new Promise((resolve, reject) => {
            this.getAll().then(clients => {
                const idx = clients.findIndex(c => c.id === id);
                if (idx === -1) return reject();
                const updated = { ...clients[idx], ...updates };
                clients[idx] = updated;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
                resolve(updated);
            });
        });
    }
}

export const clientService = new ClientService();
