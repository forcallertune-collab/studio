
'use client';

import React, { useState, useEffect, createContext, useMemo } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardHeader from '@/components/dashboard/header';
import WelcomeDialog from '@/components/welcome-dialog';
import { dummyUser } from '@/lib/data';
import type { User } from '@/lib/types';


type WalletContextType = {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
};

export const WalletContext = createContext<WalletContextType>({
  walletBalance: 0,
  setWalletBalance: () => {},
});

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType>({
    user: dummyUser,
    setUser: () => {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    }
    return dummyUser;
  });
  
  const [walletBalance, setWalletBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedBalance = localStorage.getItem('walletBalance');
      return savedBalance ? parseFloat(savedBalance) : user.walletBalance;
    }
    return user.walletBalance;
  });

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    const role = localStorage.getItem('userRole') as 'earner' | 'advertiser' | 'both' | null;
    
    if (welcomeShown !== 'true') {
      setShowWelcome(true);
    }
    
    if (role) {
        setUser(prevUser => ({...prevUser, role}));
    }

    // Initialize data in localStorage if it's not there
    if (localStorage.getItem('walletBalance') === null) {
      localStorage.setItem('walletBalance', String(user.walletBalance));
    }
     if (localStorage.getItem('user') === null) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, []);

  useEffect(() => {
    // Persist changes to localStorage
    localStorage.setItem('walletBalance', String(walletBalance));
    localStorage.setItem('user', JSON.stringify(user));
     if (user.role) {
      localStorage.setItem('userRole', user.role);
    }
  }, [walletBalance, user]);


  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  const walletContextValue = useMemo(() => ({
    walletBalance,
    setWalletBalance
  }), [walletBalance]);

  const userContextValue = useMemo(() => ({ user, setUser }), [user]);


  if (!user.role) {
    // Or a loading spinner
    return null;
  }
  
  return (
    <UserContext.Provider value={userContextValue}>
        <WalletContext.Provider value={walletContextValue}>
          <div className="flex min-h-screen w-full bg-muted/40">
            <DashboardSidebar userRole={user.role} />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
              <DashboardHeader />
              <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
                {children}
              </main>
            </div>
            <WelcomeDialog
              isOpen={showWelcome}
              onClose={handleCloseWelcome}
            />
          </div>
        </WalletContext.Provider>
    </UserContext.Provider>
  );
}
