'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Users, BadgeIndianRupee } from "lucide-react";
import ReferralChart from "@/components/referral-chart";
import { dummyUser } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function ReferralsPage() {
    const { toast } = useToast();

    const copyReferralLink = () => {
        const link = `${window.location.origin}/?ref=${dummyUser.referralCode}`;
        navigator.clipboard.writeText(link);
        toast({
            title: "Copied to clipboard!",
            description: "Your referral link is ready to be shared.",
        });
    };

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Share2 /> Refer & Earn</CardTitle>
                    <CardDescription>Build your team and earn a lifetime 10% commission on their earnings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 text-center bg-primary/10 rounded-lg border border-primary/20">
                        <p className="font-semibold text-lg">Your Unique Referral Link</p>
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <p className="text-sm md:text-base p-2 bg-background rounded-md font-mono text-primary truncate">{`${window.location.origin}/?ref=${dummyUser.referralCode}`}</p>
                            <Button onClick={copyReferralLink} size="icon" variant="outline">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-2xl font-bold font-headline">15</p>
                            <p className="text-sm text-muted-foreground">Total Referrals</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="text-2xl font-bold font-headline">12</p>
                            <p className="text-sm text-muted-foreground">Active Referrals</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <BadgeIndianRupee className="h-8 w-8 mx-auto text-accent-foreground mb-2" />
                            <p className="text-2xl font-bold font-headline text-accent-foreground">₹450.00</p>
                            <p className="text-sm text-muted-foreground">Total Referral Earnings</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Referral Earning Potential</CardTitle>
                    <CardDescription>This chart illustrates your potential monthly earnings as your referral network grows.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReferralChart />
                </CardContent>
            </Card>
        </div>
    );
}
