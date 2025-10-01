
'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Youtube, Rocket, Users, Megaphone } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json'
import { WalletContext, TaskContext } from './layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const quickAccessItems = [
    { title: "YouTube Tasks", description: "Views, Likes, Subs & Comments", href: "/dashboard/tasks/youtube", icon: Youtube },
    { title: "Referral Program", description: "Build your team and earn commissions", href: "/dashboard/referrals", icon: Users },
    { title: "Advertiser Panel", description: "Create and manage campaigns", href: "/dashboard/advertiser", icon: Rocket },
]

export default function DashboardPage() {
  const { walletBalance } = useContext(WalletContext);
  const { taskCount } = useContext(TaskContext);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    const savedAnnouncement = localStorage.getItem('sociara-announcement');
    if (savedAnnouncement) {
      setAnnouncement(savedAnnouncement);
    }
  }, []);

  return (
    <div className="grid gap-6">
        {announcement && (
            <Alert>
              <Megaphone className="h-4 w-4" />
              <AlertTitle>Announcement</AlertTitle>
              <AlertDescription>
                {announcement}
              </AlertDescription>
            </Alert>
        )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <span className="text-2xl text-primary">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              {walletBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your available balance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed Today</CardTitle>
             <span className="text-2xl text-primary">✔</span>
          </Header>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              {taskCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep it up!
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
             <span className="text-2xl text-primary">👥</span>
          </Header>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              ₹{referralEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total from your referrals
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quick Access</CardTitle>
              <CardDescription>Jump right into your most important actions.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
              {quickAccessItems.map(item => (
                <Link href={item.href} key={item.title}>
                  <div className="p-4 border rounded-lg hover:bg-accent/20 transition-colors h-full flex flex-col">
                      <item.icon className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
