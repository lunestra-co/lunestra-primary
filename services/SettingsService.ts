export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  footerText: string;
}

const STORAGE_KEY = "lunestra_settings";

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Lunestra & Co.",
  contactEmail: "concierge@lunestra.com",
  contactPhone: "+1 (555) 123-4567",
  contactAddress: "123 Bond Street, London, UK",
  socials: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
    tiktok: "#",
  },
  footerText: "© 2024 Lunestra & Co.",
};

class SettingsService {
  private init() {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  getSettings(): Promise<SiteSettings> {
    return new Promise((resolve) => {
      this.init();
      const stored = localStorage.getItem(STORAGE_KEY);
      resolve(stored ? JSON.parse(stored) : DEFAULT_SETTINGS);
    });
  }

  updateSettings(settings: SiteSettings): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      resolve();
    });
  }

  resetSettings(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(STORAGE_KEY);
      this.init();
      resolve();
    });
  }
}

export const settingsService = new SettingsService();
