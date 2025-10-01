
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
  LifeBuoy,
  Shield,
  Users
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
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/referrals', icon: Users, label: 'Referrals' },
];

const earnerNavItems = [
  { href: '/dashboard/tasks/youtube', icon: Youtube, label: 'YouTube Tasks' },
  { href: '/dashboard/tasks/facebook', icon: Facebook, label: 'Facebook Tasks' },
  { href: '/dashboard/tasks/instagram', icon: Instagram, label: 'Instagram Tasks' },
  { href: '/dashboard/tasks/google-reviews', icon: Star, label: 'Google Reviews' },
  { href: '/dashboard/tasks/app-downloads', icon: Download, label: 'App Downloads' },
];

const advertiserNavItems = [
  { href: '/dashboard/advertiser', icon: Rocket, label: 'Advertiser Panel' },
];

const commonBottomItems = [
    { href: '/dashboard/support', icon: LifeBuoy, label: 'Support'},
    { href: '/about', icon: Info, label: 'About Us' },
    { href: '/admin', icon: Shield, label: 'Admin Panel' }
]


export default function DashboardSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  let navItems = [...commonNavItems];
  if (userRole === 'earner') {
    navItems.push(...earnerNavItems);
  } else if (userRole === 'advertiser') {
    navItems.push(...advertiserNavItems);
  } else if (userRole === 'both') {
    navItems.push(...earnerNavItems, ...advertiserNavItems);
  }
  
  // Sort dashboard to be first if it's not
  navItems.sort((a, b) => {
    if (a.href === '/dashboard') return -1;
    if (b.href === '/dashboard') return 1;
    return 0;
  });

  // Remove duplicates
  navItems = navItems.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.href === item.href
    ))
  )


  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link href="/dashboard" className="mb-4">
               <div className="flex h-9 w-9 items-center justify-center rounded-lg text-primary transition-colors md:h-8 md:w-8">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Sociara</span>
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
