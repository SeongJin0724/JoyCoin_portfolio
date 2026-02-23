"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { getApiBaseUrl } from '@/lib/apiBase';

export default function AdminSignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [referrer, setReferrer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [sectors, setSectors] = useState<{ id: number; name: string }[]>([]);
  const [selectedSectorId, setSelectedSectorId] = useState<string>("");

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const API_BASE_URL = getApiBaseUrl();
        const response = await fetch(`${API_BASE_URL}/sectors`);
        if (response.ok) {
          const data = await response.json();
          setSectors(data);
        }
      } catch (error) {
        console.error("섹터 목록을 가져오는데 실패했습니다:", error);
      }
    };
    fetchSectors();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const signupData = {
        email: email,
        password: password,
        username: username,
        wallet_address: walletAddress.trim(),
        sector_id: selectedSectorId ? Number(selectedSectorId) : null,
        referral_code: referrer || null,
        terms_accepted: true,
        risk_accepted: true,
        privacy_accepted: true,
        legal_version: "2026-02-10",
        locale: "ko",
      };

      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        toast("회원가입이 완료되었습니다! 로그인을 진행해주세요.", "success");
        router.push('/admin/login');
      } else {
        const errorData = await response.json();
        toast(`가입 실패: ${typeof errorData.detail === 'object' ? JSON.stringify(errorData.detail) : errorData.detail}`, "error");
      }
    } catch (error) {
      toast("서버 연결에 실패했습니다. 백엔드 서버가 켜져 있는지 확인하세요.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 text-white font-sans">
      <div className="glass p-10 rounded-[2.5rem] w-full max-w-md border border-red-500/10 shadow-2xl relative">
        <div className="text-center mb-10">
          <h2 className="text-red-500 text-xs font-black uppercase tracking-[0.4em] mb-2">Internal Access</h2>
          <h1 className="text-3xl font-black italic">ADMIN SIGN UP</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">Email Address</label>
            <input
              type="email" placeholder="admin@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">Username</label>
            <input
              type="text" placeholder="adminname" required value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">Password</label>
            <input
              type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">Select Sector (Optional)</label>
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all text-white appearance-none cursor-pointer"
            >
              <option value="">섹터를 선택하세요 (선택사항)</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id} className="bg-slate-900">
                  Sector {sector.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">JOY Wallet Address</label>
            <input
              type="text"
              placeholder="Enter JOY receiving wallet"
              required
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-2">Referral Code (Optional)</label>
            <input
              type="text" placeholder="Referral Code" value={referrer} onChange={(e) => setReferrer(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl focus:border-red-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full py-4 bg-red-600/80 hover:bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-900/20 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
          </button>
        </form>
      </div>
    </div>
  );
}
