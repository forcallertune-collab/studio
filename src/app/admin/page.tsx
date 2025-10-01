
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeIndianRupee, Package, Users, LifeBuoy, Megaphone } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function AdminDashboardPage() {
    const { toast } = useToast();
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        const savedAnnouncement = localStorage.getItem('sociara-announcement');
        if (savedAnnouncement) {
            setAnnouncement(savedAnnouncement);
        }
    }, []);
    
    const handleSaveAnnouncement = () => {
        localStorage.setItem('sociara-announcement', announcement);
        toast({
            title: 'Announcement Published',
            description: 'The message is now live for all users.',
        });
    };

    const handleClearAnnouncement = () => {
        setAnnouncement('');
        localStorage.removeItem('sociara-announcement');
        toast({
            title: 'Announcement Cleared',
        });
    };


    return (
        <div>
            <h1 className="text-2xl font-bold font-headline mb-6">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">57</div>
                        <p className="text-xs text-muted-foreground">
                            +2 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8 grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A log of recent user and system events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* A more detailed activity log could be implemented here */}
                        <div className="text-center py-12 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground">Activity feed coming soon.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Megaphone /> Broadcast Message</CardTitle>
                        <CardDescription>Post a message that will be shown to all users on the homepage and dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="announcement-message">Your Message</Label>
                            <Textarea 
                                id="announcement-message"
                                placeholder="e.g., Scheduled maintenance tomorrow from 2 AM to 3 AM."
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                rows={4}
                            />
                        </div>
                         <div className="flex gap-2">
                            <Button onClick={handleSaveAnnouncement}>Publish Announcement</Button>
                            <Button variant="outline" onClick={handleClearAnnouncement}>Clear</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
