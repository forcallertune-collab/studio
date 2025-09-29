'use client';

import React, { useState, useEffect, createContext, useMemo } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardHeader from '@/components/dashboard/header';
import WelcomeDialog from '@/components/welcome-dialog';
import { dummyUser } from '@/lib/data';

type WalletContextType = {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
};

export const WalletContext = createContext<WalletContextType>({
  walletBalance: 0,
  setWalletBalance: () => {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userRole, setUserRole] = useState<'earner' | 'advertiser' | 'both' | null>(null);
  const [walletBalance, setWalletBalance] = useState(dummyUser.walletBalance);

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    const role = localStorage.getItem('userRole') as 'earner' | 'advertiser' | 'both' | null;
    
    if (welcomeShown !== 'true') {
      setShowWelcome(true);
      setWalletBalance(prev => prev + 100); // Add welcome bonus
    }
    setUserRole(role);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  const walletContextValue = useMemo(() => ({
    walletBalance,
    setWalletBalance
  }), [walletBalance]);

  if (!userRole) {
    // Or a loading spinner
    return null;
  }
  
  return (
    <WalletContext.Provider value={walletContextValue}>
      <div className="flex min-h-screen w-full bg-muted/40">
        <DashboardSidebar userRole={userRole} />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
            {children}
          </main>
        </div>
        <WelcomeDialog
          isOpen={showWelcome}
          onClose={handleCloseWelcome}
          username={dummyUser.name}
          referralCode={dummyUser.referralCode}
        />
      </div>
    </WalletContext.Provider>
  );
}
