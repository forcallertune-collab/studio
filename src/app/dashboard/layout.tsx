
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
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [user, setUser] = useState<User | null>(null);
  
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const allUsers = JSON.parse(localStorage.getItem('users') || '{}');

    let currentUser = null;
    if (loggedInUserEmail && allUsers[loggedInUserEmail]) {
        currentUser = allUsers[loggedInUserEmail];
        setUser(currentUser);
        setWalletBalance(currentUser.walletBalance || 0);
    } else {
        // Fallback to dummy user if something is wrong
        setUser(dummyUser);
        setWalletBalance(dummyUser.walletBalance);
    }
    
    if (welcomeShown !== 'true') {
      setShowWelcome(true);
    }
    
  }, []);

  useEffect(() => {
    // Persist changes to localStorage
    if (user) {
        localStorage.setItem('walletBalance', String(walletBalance));
        const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
        
        // Use the original email to find the user in case it's being changed.
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        if (loggedInUserEmail && loggedInUserEmail !== user.email) {
             // If email is changed, delete old entry
            delete allUsers[loggedInUserEmail];
            localStorage.setItem('loggedInUser', user.email);
        }

        allUsers[user.email] = { ...user, walletBalance };
        localStorage.setItem('users', JSON.stringify(allUsers));

        if (user.role) {
            localStorage.setItem('userRole', user.role);
        }
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

  const userContextValue = useMemo(() => ({ user: user!, setUser }), [user]);


  if (!user || !user.role) {
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
