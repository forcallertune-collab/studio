
'use client';

import { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BadgeIndianRupee, Activity, Users, Megaphone, CheckCircle } from "lucide-react";
import { UserContext, TaskContext, WalletContext } from './layout';
import ReferralChart from '@/components/referral-chart';

export default function DashboardPage() {
    const [announcement, setAnnouncement] = useState('');
    const { user } = useContext(UserContext);
    const { taskCount } = useContext(TaskContext);
    const { walletBalance } = useContext(WalletContext);

    useEffect(() => {
        const savedAnnouncement = localStorage.getItem('sociara-announcement');
        if (savedAnnouncement) {
            setAnnouncement(savedAnnouncement);
        }
    }, []);

    // Placeholder data
    const totalReferrals = 0;
    const referralEarnings = 0.00;

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Earnings
                        </CardTitle>
                        <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{walletBalance.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime earnings
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tasks Completed
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{taskCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all categories
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalReferrals}</div>
                        <p className="text-xs text-muted-foreground">
                            +0 this month
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
                        <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{referralEarnings.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                           10% lifetime commission
                        </p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                     <CardHeader>
                        <CardTitle>Potential Referral Earnings</CardTitle>
                        <CardDescription>Estimated earnings based on number of active referrals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ReferralChart />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Activity />Recent Activity</CardTitle>
                        <CardDescription>Your latest task completions and earnings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground">Activity feed coming soon.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
