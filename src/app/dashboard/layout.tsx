
'use client';

import React, { useState, useEffect, createContext, useMemo } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardHeader from '@/components/dashboard/header';
import WelcomeDialog from '@/components/welcome-dialog';
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
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

type TaskContextType = {
  taskCount: number;
  setTaskCount: React.Dispatch<React.SetStateAction<number>>;
  incrementTaskCount: () => void;
};

export const TaskContext = createContext<TaskContextType>({
  taskCount: 0,
  setTaskCount: () => {},
  incrementTaskCount: () => {},
});


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const [walletBalance, setWalletBalance] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const incrementTaskCount = () => {
    setTaskCount(prevCount => prevCount + 1);
  };


  const loadUserData = () => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const allUsers = JSON.parse(localStorage.getItem('users') || '{}');

    let currentUser = null;
    if (loggedInUserId && allUsers[loggedInUserId]) {
        currentUser = allUsers[loggedInUserId];
        setUser(currentUser);
        setWalletBalance(currentUser.walletBalance || 0);
    } else {
        // Fallback to a cleared state or redirect to login if no user is found
        setUser(null);
        setWalletBalance(0);
        // Consider redirecting to login page if no logged-in user
        // For this example, we'll allow a null user state
    }
  };


  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    loadUserData();
    
    if (welcomeShown !== 'true') {
      setShowWelcome(true);
    }

    const handleStorageChange = (e: StorageEvent) => {
        // When 'users' data changes from another tab (like the admin panel or signup page), reload it.
        if (e.key === 'users') {
            loadUserData();
        }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
    
  }, []);

  useEffect(() => {
    // Persist changes to localStorage whenever user state changes
    if (user) {
        const allUsers = JSON.parse(localStorage.getItem('users') || '{}');
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        
        if (loggedInUserId && allUsers[loggedInUserId]) {
            allUsers[loggedInUserId] = user;
            localStorage.setItem('users', JSON.stringify(allUsers));
        }

        if (user.role) {
            localStorage.setItem('userRole', user.role);
        }
        // Update the wallet context state if the user's balance has changed
        setWalletBalance(user.walletBalance); 
    }
  }, [user]);


  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  const walletContextValue = useMemo(() => ({
    walletBalance,
    setWalletBalance
  }), [walletBalance]);

  const userContextValue = useMemo(() => ({ user, setUser }), [user]);
  
  const taskContextValue = useMemo(() => ({ taskCount, setTaskCount, incrementTaskCount }), [taskCount]);


  if (!user) {
    // Or a loading spinner
    return null;
  }
  
  return (
    <UserContext.Provider value={userContextValue}>
        <WalletContext.Provider value={walletContextValue}>
          <TaskContext.Provider value={taskContextValue}>
              <div className="flex min-h-screen w-full bg-muted/40">
                <DashboardSidebar userRole={user.role} />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
                  <DashboardHeader />
                  <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
                    {children}
                  </main>
                </div>
                {user && ( // Only show welcome dialog if user is loaded
                    <WelcomeDialog
                    isOpen={showWelcome}
                    onClose={handleCloseWelcome}
                    />
                )}
              </div>
          </TaskContext.Provider>
        </WalletContext.Provider>
    </UserContext.Provider>
  );
}
