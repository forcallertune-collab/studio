
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useMemo, useState, useEffect } from 'react';
import {
  Menu,
  Youtube,
  Facebook,
  Instagram,
  Star,
  Download,
  Wallet,
  User,
  Share2,
  Rocket,
  Info,
  LogOut,
  BadgeIndianRupee,
  Home,
  LifeBuoy,
  Shield,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dummyUser } from '@/lib/data';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { WalletContext, UserContext } from '@/app/dashboard/layout';

const allNavItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard', roles: ['earner', 'advertiser', 'both'] },
    { href: '/dashboard/tasks/youtube', icon: Youtube, label: 'YouTube Tasks', roles: ['earner', 'both'] },
    { href: '/dashboard/tasks/facebook', icon: Facebook, label: 'Facebook Tasks', roles: ['earner', 'both'] },
    { href: '/dashboard/tasks/instagram', icon: Instagram, label: 'Instagram Tasks', roles: ['earner', 'both'] },
    { href: '/dashboard/tasks/google-reviews', icon: Star, label: 'Google Reviews', roles: ['earner', 'both'] },
    { href: '/dashboard/tasks/app-downloads', icon: Download, label: 'App Downloads', roles: ['earner', 'both'] },
    { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet', roles: ['earner', 'advertiser', 'both'] },
    { href: '/dashboard/advertiser', icon: Rocket, label: 'Advertiser Panel', roles: ['advertiser', 'both'] },
    { href: '/dashboard/referrals', icon: Users, label: 'Referrals', roles: ['earner', 'advertiser', 'both'] },
    { href: '/dashboard/profile', icon: User, label: 'Profile', roles: ['earner', 'advertiser', 'both'] },
    { href: '/dashboard/support', icon: LifeBuoy, label: 'Support', roles: ['earner', 'advertiser', 'both'] },
    { href: '/about', icon: Info, label: 'About Us', roles: ['earner', 'advertiser', 'both'] },
    { href: '/admin', icon: Shield, label: 'Admin Panel', roles: ['earner', 'advertiser', 'both'] },
  ];

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { walletBalance } = useContext(WalletContext);
  const { user } = useContext(UserContext);

  const navItems = useMemo(() => {
    if (!user || !user.role) return [];
    return allNavItems.filter(item => item.roles.includes(user.role));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId');
    router.push('/');
  };

  if (!user) {
    return null; // Or a loading skeleton
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Youtube className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">WeTube</span>
            </Link>
            {navItems.map(item => (
                 <Link
                 key={item.href}
                 href={item.href}
                 className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", {'text-foreground': pathname === item.href})}
               >
                 <item.icon className="h-5 w-5" />
                 {item.label}
               </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="flex-1">
        <h1 className="font-headline text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-accent/50 p-1 pr-3 text-sm font-semibold text-accent-foreground border border-accent">
            <div className="p-1.5 bg-accent rounded-full">
                <BadgeIndianRupee className="h-4 w-4 text-white"/>
            </div>
          <span>{walletBalance.toFixed(2)}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt="User avatar" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href="/dashboard/support">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
