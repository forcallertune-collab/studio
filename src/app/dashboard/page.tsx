import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Youtube, Share2, Rocket } from 'lucide-react';
import ReferralChart from '@/components/referral-chart';
import { dummyUser } from '@/lib/data';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json'

const quickAccessItems = [
    { title: "YouTube Tasks", description: "Views, Likes, Subs & Comments", href: "/dashboard/tasks/youtube", icon: Youtube },
    { title: "My Referrals", description: "View your team and earnings", href: "/dashboard/referrals", icon: Share2 },
    { title: "Advertiser Panel", description: "Create and manage campaigns", href: "/dashboard/advertiser", icon: Rocket },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <span className="text-2xl text-primary">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              {dummyUser.walletBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +₹150.50 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed Today</CardTitle>
             <span className="text-2xl text-primary">✔</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              125
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              25 remaining for daily bonus
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
             <span className="text-2xl text-primary">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">
              ₹450.00
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total from 15 active referrals
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
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
        <div className="lg:col-span-2">
           <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline">Referral Growth</CardTitle>
              <CardDescription>Potential earnings based on referrals.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ReferralChart />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">How to Earn More</CardTitle>
            <CardDescription>Follow these steps to maximize your income on WeTube.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
                <Image src={placeholderImages.placeholderImages[0].imageUrl} alt="Watch Videos" width={150} height={150} className="rounded-full mb-4 border-4 border-primary/20" data-ai-hint={placeholderImages.placeholderImages[0].imageHint} />
                <h3 className="font-semibold mb-1">1. Complete Daily Tasks</h3>
                <p className="text-sm text-muted-foreground">Watch videos, like, subscribe and comment daily to earn a steady income.</p>
            </div>
            <div className="flex flex-col items-center">
                 <Image src={placeholderImages.placeholderImages[1].imageUrl} alt="Build Your Team" width={150} height={150} className="rounded-full mb-4 border-4 border-primary/20" data-ai-hint={placeholderImages.placeholderImages[1].imageHint} />
                <h3 className="font-semibold mb-1">2. Build Your Team</h3>
                <p className="text-sm text-muted-foreground">Invite friends using your referral code and earn 10% of their income for life.</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src={placeholderImages.placeholderImages[2].imageUrl} alt="Promote Services" width={150} height={150} className="rounded-full mb-4 border-4 border-primary/20" data-ai-hint={placeholderImages.placeholderImages[2].imageHint} />
                <h3 className="font-semibold mb-1">3. Become an Advertiser</h3>
                <p className="text-sm text-muted-foreground">Promote your own content or business to our active community of earners.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
