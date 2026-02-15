"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const stored = localStorage.getItem("admin_auth");
        if (stored) {
          const { username } = JSON.parse(stored);
          setAdminUsername(username);
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem("admin_auth");
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = (username: string, password: string): boolean => {
    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      const authData = { username, loginTime: new Date().toISOString() };
      localStorage.setItem("admin_auth", JSON.stringify(authData));
      setAdminUsername(username);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setAdminUsername(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, adminUsername, login, logout, loading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
