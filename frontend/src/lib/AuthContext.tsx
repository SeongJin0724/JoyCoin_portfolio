"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiBaseUrl } from './apiBase';

interface User {
  id: number;
  email: string;
  username: string;
  total_joy: number;
  total_points: number;
  referral_reward_remaining: number;
  referral_code?: string;
  recovery_code?: string;
  role?: string;
  wallet_address?: string;
  is_guest?: boolean;
  sector_id?: number | null;
  balance?: number;
  center?: { id: number; name: string; region: string } | null;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = getApiBaseUrl();
  const DEMO_USER_KEY = "demo_user";
  const DEMO_AUTO_KEY = "demo_admin_auto";

  const getDemoUser = (): User | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(DEMO_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const refreshUser = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
        signal: controller.signal,
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(getDemoUser());
      }
    } catch {
      setUser(getDemoUser());
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoading && !user) {
      const ua = navigator.userAgent || "";
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      if (!isMobile) return;
      if (localStorage.getItem(DEMO_AUTO_KEY)) return;

      const demoAdmin: User = {
        id: -1,
        email: "admin@joycoin.demo",
        username: "JOY Admin",
        total_joy: 0,
        total_points: 0,
        referral_reward_remaining: 0,
        role: "admin",
        is_guest: true,
      };
      localStorage.setItem(DEMO_AUTO_KEY, "1");
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoAdmin));
      setUser(demoAdmin);
    }
  }, [isLoading, user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
