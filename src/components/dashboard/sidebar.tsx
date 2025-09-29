'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
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
  BadgeIndianRupee
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Logo from '../logo';
import { cn } from '@/lib/utils';

type SidebarProps = {
  userRole: 'earner' | 'advertiser' | 'both';
};

const commonNavItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

const earnerNavItems = [
  { href: '/dashboard/tasks/youtube', icon: Youtube, label: 'YouTube Tasks' },
  { href: '/dashboard/tasks/facebook', icon: Facebook, label: 'Facebook Tasks' },
  { href: '/dashboard/tasks/instagram', icon: Instagram, label: 'Instagram Tasks' },
  { href: '/dashboard/tasks/google-reviews', icon: Star, label: 'Google Reviews' },
  { href: '/dashboard/tasks/app-downloads', icon: Download, label: 'App Downloads' },
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/referrals', icon: Share2, label: 'Referrals & Team' },
];

const advertiserNavItems = [
  { href: '/dashboard/advertiser', icon: Rocket, label: 'Advertiser Panel' },
];

const commonBottomItems = [
    { href: '/about', icon: Info, label: 'About Us' }
]


export default function DashboardSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  let navItems = [...commonNavItems];
  if (userRole === 'earner' || userRole === 'both') {
    navItems.push(...earnerNavItems);
  }
  if (userRole === 'advertiser' || userRole === 'both') {
    navItems.push(...advertiserNavItems);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link href="/dashboard" className="mb-4">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg text-primary transition-colors md:h-8 md:w-8">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">WeTube</span>
               </div>
            </Link>

          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    { 'bg-accent text-accent-foreground': pathname === item.href }
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            {commonBottomItems.map(item => (
                 <Tooltip key={item.href}>
                 <TooltipTrigger asChild>
                   <Link
                     href={item.href}
                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                   >
                     <item.icon className="h-5 w-5" />
                     <span className="sr-only">{item.label}</span>
                   </Link>
                 </TooltipTrigger>
                 <TooltipContent side="right">{item.label}</TooltipContent>
               </Tooltip>
            ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
