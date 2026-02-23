"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/Toast";
import { getApiBaseUrl } from "@/lib/apiBase";

type GuestCredentials = {
  enabled: boolean;
  email: string;
  password: string;
  username?: string | null;
};

const FALLBACK_GUEST: GuestCredentials = {
  enabled: true,
  email: "guest@joycoin.demo",
  password: "joycoin-guest-1234",
  username: "JOY Guest",
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestCreds, setGuestCreds] = useState<GuestCredentials>(FALLBACK_GUEST);
  const GUEST_MODAL_KEY = "guest_modal_dismissed";
  const GUEST_AUTO_KEY = "guest_auto_login_done";
  const autoLoginRef = useRef(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { t, locale } = useLanguage();
  const { refreshUser, login, isLoggedIn, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const dismissGuestModal = () => {
    setShowGuestModal(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(GUEST_MODAL_KEY, "1");
    }
  };

  const loginAsDemoGuest = (nextEmail: string, guestName?: string | null, role: "guest" | "admin" = "guest") => {
    const demoUser = {
      id: -1,
      email: nextEmail,
      username: guestName || (role === "admin" ? "JOY Admin" : "JOY Guest"),
      total_joy: 0,
      total_points: 0,
      referral_reward_remaining: 0,
      role,
      is_guest: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("demo_user", JSON.stringify(demoUser));
    }
    login(demoUser);
    dismissGuestModal();
    toast(locale === "ko"
      ? (role === "admin" ? "\uad00\ub9ac\uc790 \uacc4\uc815\uc73c\ub85c \ub85c\uadf8\uc778\ub418\uc5c8\uc2b5\ub2c8\ub2e4." : "\uac8c\uc2a4\ud2b8\ub85c \ub85c\uadf8\uc778\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")
      : (role === "admin" ? "Logged in as admin demo." : "Logged in as guest."),
      "success"
    );
    router.push("/mypage");
  };

  useEffect(() => {
    if (params.get("registered") === "1") setMsg(true);
  }, [params]);

  useEffect(() => {
    let mounted = true;
    const loadGuestCredentials = async () => {
      try {
        const API_BASE_URL = getApiBaseUrl();
        const res = await fetch(`${API_BASE_URL}/auth/guest-credentials`);
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (data?.enabled && data?.email && data?.password) {
          setGuestCreds({
            enabled: true,
            email: data.email,
            password: data.password,
            username: data.username || null,
          });
          if (typeof window !== "undefined" && !localStorage.getItem(GUEST_MODAL_KEY)) {
            setShowGuestModal(true);
          }
        } else if (data?.enabled === false) {
          setShowGuestModal(false);
        }
      } catch {
        // Keep fallback guest creds for portfolio UX even if API is temporarily unavailable.
      }
    };
    loadGuestCredentials();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!guestCreds.enabled) return;
    if (authLoading || isLoggedIn) return;
    if (autoLoginRef.current) return;
    if (localStorage.getItem(GUEST_AUTO_KEY)) return;

    const ua = navigator.userAgent || "";
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    if (!isMobile) return;

    autoLoginRef.current = true;
    localStorage.setItem(GUEST_AUTO_KEY, "1");
    dismissGuestModal();
    loginAsDemoGuest(guestCreds.email, guestCreds.username || null, "guest");
  }, [guestCreds, authLoading, isLoggedIn]);
  const loginWithCredentials = async (
    nextEmail: string,
    nextPassword: string,
    options?: { isGuest?: boolean; guestName?: string | null; role?: "guest" | "admin" }
  ) => {
    setIsLoading(true);
    const timeoutMs = 8000;
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await Promise.race([
        fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: nextEmail, password: nextPassword }),
        }),
        new Promise<Response>((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
      ]);

      let data: any = null;
      try {
        data = await response.json();
      } catch {}

      if (response.ok) {
        await refreshUser();
        router.push("/mypage");
        return;
      }

      if (options?.isGuest) {
        loginAsDemoGuest(nextEmail, options.guestName || null, options.role || "guest");
        return;
      }

      toast(data?.detail || t("loginFailed"), "error");
    } catch {
      if (options?.isGuest) {
        loginAsDemoGuest(nextEmail, options.guestName || null, options.role || "guest");
      } else {
        toast(locale === "ko" ? "\uc11c\ubc84 \uc5f0\uacb0 \uc2e4\ud328" : "Server connection failed", "error");
      }
    } finally {
      setIsLoading(false);
      setGuestLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithCredentials(email, password);
  };

  const fillGuest = () => {
    setEmail(guestCreds.email);
    setPassword(guestCreds.password);
    dismissGuestModal();
    toast(locale === "ko" ? "\uac8c\uc2a4\ud2b8 \uacc4\uc815 \uc815\ubcf4\uac00 \uc785\ub825\ub418\uc5c8\uc2b5\ub2c8\ub2e4." : "Guest credentials filled.", "success");
  };

  const loginAsGuest = async () => {
    setEmail(guestCreds.email);
    setPassword(guestCreds.password);
    dismissGuestModal();
    setGuestLoading(true);
    loginAsDemoGuest(guestCreds.email, guestCreds.username || null, "admin");
    setGuestLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 sm:p-6 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_40%)]" />

      {showGuestModal && guestCreds.enabled && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-400/25 bg-slate-950/95 shadow-[0_30px_80px_rgba(2,6,23,0.8)] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
            <button
              type="button"
              onClick={dismissGuestModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-white text-xl"
              aria-label="Close guest login popup"
            >
              ×
            </button>
            <div className="p-6 sm:p-8">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/80 font-bold mb-3">
                {locale === "ko" ? "포트폴리오 체험 계정" : "Portfolio Demo Account"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
                {locale === "ko" ? "게스트로 바로 체험해보세요" : "Try the app instantly as a guest"}
              </h2>
              <p className="text-sm text-slate-300 mb-6">
                {locale === "ko"
                  ? "로그인 없이 둘러보기 어려운 화면을 바로 확인할 수 있도록 체험 계정을 제공하고 있습니다."
                  : "Use the guest credentials to preview the gated pages without creating an account."}
              </p>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">ID</span>
                  <code className="text-cyan-300 text-sm break-all">{guestCreds.email}</code>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">PW</span>
                  <code className="text-emerald-300 text-sm break-all">{guestCreds.password}</code>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={fillGuest}
                  className="py-3 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-black transition-all"
                >
                  {locale === "ko" ? "자동 입력" : "Auto Fill"}
                </button>
                <button
                  type="button"
                  onClick={loginAsGuest}
                  disabled={guestLoading || isLoading}
                  className="py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-60 font-black transition-all"
                >
                  {guestLoading || isLoading
                    ? t("loading")
                    : locale === "ko"
                      ? "게스트로 바로 로그인"
                      : "Login as Guest"}
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                {locale === "ko"
                  ? "체험 계정은 포트폴리오 시연용이며 데이터가 초기화되거나 변경될 수 있습니다."
                  : "This demo account is for portfolio preview and its data may reset at any time."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="glass p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] w-full max-w-md border border-blue-500/10 shadow-2xl relative z-10">
        <h1 className="text-2xl sm:text-3xl font-black italic text-center mb-6 sm:mb-10 text-blue-500">
          {t("login").toUpperCase()}
        </h1>
        {msg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center rounded-2xl font-bold">
            {t("signupSuccess")}
          </div>
        )}

        {guestCreds.enabled && (
          <button
            type="button"
            onClick={() => setShowGuestModal(true)}
            className="w-full mb-4 text-left p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80 font-bold mb-1">
              {locale === "ko" ? "게스트 체험" : "Guest Demo"}
            </div>
            <div className="text-sm text-slate-200 font-semibold">
              {locale === "ko" ? "팝업에서 아이디/비밀번호 확인 후 자동 입력" : "Open popup for guest credentials and auto-fill"}
            </div>
          </button>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder={t("email")}
            required
            className="w-full bg-slate-900/50 border border-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none focus:border-blue-500 text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("password")}
            required
            className="w-full bg-slate-900/50 border border-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none focus:border-blue-500 text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-xl sm:rounded-2xl font-black transition-all"
          >
            {isLoading ? t("loading") : t("login").toUpperCase()}
          </button>
        </form>
        <div className="mt-6 space-y-2 text-center">
          <p className="text-slate-400 text-sm">
            {t("dontHaveAccount")}{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:text-blue-400 font-semibold">
              {t("signup")}
            </Link>
          </p>
          <p className="text-slate-500 text-xs">
            <Link href="/auth/recover" className="hover:text-slate-400">
              {locale === "ko" ? "아이디/비밀번호 찾기" : "Find ID/Password"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-blue-500 font-black">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
