"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/apiBase';

interface Referrer {
  id: number;
  email: string;
  username: string;
  sector_id: number | null;
  invited_count: number;
  total_rewards: number;
}

export default function ReferrerManagement() {
  const router = useRouter();
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferrers = async () => {
      try {
        const API_BASE_URL = getApiBaseUrl();
        const response = await fetch(`${API_BASE_URL}/admin/referrers`, {
          credentials: 'include',
        });
        if (response.status === 401 || response.status === 403) {
          router.push('/admin/login');
          return;
        }
        if (response.ok) {
          setReferrers(await response.json());
        }
      } catch (err) {
        console.error("추천인 목록 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReferrers();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-slate-500 hover:text-white">←</button>
          <h1 className="text-3xl font-black italic text-green-500">REFERRER <span className="text-white">LIST</span></h1>
        </div>

        {isLoading ? (
          <div className="py-20 text-center animate-pulse">
            <p className="text-green-500 font-black tracking-[0.5em] text-sm uppercase italic">Loading...</p>
          </div>
        ) : (
          <div className="glass rounded-[2rem] overflow-hidden border-white/5">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="p-6">Referrer Email</th>
                  <th className="p-6">Username</th>
                  <th className="p-6">Sector</th>
                  <th className="p-6">Invited Users</th>
                  <th className="p-6">Total Rewards (U)</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {referrers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-16 text-center text-slate-600 font-bold uppercase tracking-widest">
                      추천인 데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  referrers.map((ref) => (
                    <tr key={ref.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="p-6 font-mono">{ref.email}</td>
                      <td className="p-6 text-slate-300">{ref.username}</td>
                      <td className="p-6 text-blue-400 font-bold">{ref.sector_id ? `Sector ${ref.sector_id}` : '-'}</td>
                      <td className="p-6">{ref.invited_count} 명</td>
                      <td className="p-6 text-green-400 font-black">{ref.total_rewards.toLocaleString()} U</td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] font-black uppercase">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
