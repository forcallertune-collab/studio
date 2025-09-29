'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardHeader from '@/components/dashboard/header';
import WelcomeDialog from '@/components/welcome-dialog';
import { dummyUser } from '@/lib/data';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [userRole, setUserRole] = useState<'earner' | 'advertiser' | 'both' | null>(null);

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    const role = localStorage.getItem('userRole') as 'earner' | 'advertiser' | 'both' | null;
    
    if (welcomeShown !== 'true') {
      setShowWelcome(true);
    }
    setUserRole(role);
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  if (!userRole) {
    // Or a loading spinner
    return null;
  }
  
  return (
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
  );
}
