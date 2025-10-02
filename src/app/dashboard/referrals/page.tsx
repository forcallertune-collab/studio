
'use client';

import { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Users, UserPlus, BadgeIndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserContext } from '@/app/dashboard/layout';
import type { User } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ReferralsPage() {
    const { toast } = useToast();
    const { user } = useContext(UserContext);
    const [referralLink, setReferralLink] = useState('');
    
    const [referredUsers, setReferredUsers] = useState<User[]>([]);
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [activeReferrals, setActiveReferrals] = useState(0); // Placeholder for now
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        if (user?.referralCode) {
            setReferralLink(`${window.location.origin}/login?ref=${user.referralCode}`);
        }

        if (user?.referrals && user.referrals.length > 0) {
            const allUsers: { [key: string]: User } = JSON.parse(localStorage.getItem('users') || '{}');
            const foundUsers = user.referrals.map(userId => allUsers[userId]).filter(Boolean); // Filter out any not found
            setReferredUsers(foundUsers);
            setTotalReferrals(foundUsers.length);
        }

        // Calculate total referral earnings
        const referralBonuses = user?.transactions
            ?.filter(tx => tx.type === 'referral_bonus')
            .reduce((sum, tx) => sum + tx.amount, 0) || 0;
        setTotalEarnings(referralBonuses);

    }, [user]);

    const copyReferralLink = () => {
        if (!referralLink) return;
        navigator.clipboard.writeText(referralLink);
        toast({
            title: 'Copied to clipboard!',
            description: 'Your referral link is ready to be shared.',
        });
    };

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Users /> My Referrals</CardTitle>
                    <CardDescription>Build your team and earn a lifetime 10% commission from their earnings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 bg-primary/10 rounded-lg space-y-4">
                        <h3 className="text-center font-bold text-primary text-lg">Your Referral Link</h3>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                           <div className="flex-1 w-full bg-background border rounded-md px-3 py-2 text-center sm:text-left">
                                <span className="text-sm font-mono break-all">{referralLink}</span>
                           </div>
                            <Button onClick={copyReferralLink} className="w-full sm:w-auto">
                                <Copy className="mr-2 h-4 w-4" /> Copy Link
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="flex items-center justify-center gap-2"><UserPlus/>Total Referrals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold font-headline">{totalReferrals}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="flex items-center justify-center gap-2"><Users/>Active Referrals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold font-headline">{activeReferrals}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription className="flex items-center justify-center gap-2"><BadgeIndianRupee/>Total Referral Earnings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold font-headline">₹{totalEarnings.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <h3 className="font-headline text-xl mb-4">My Team</h3>
                         <div className="border rounded-lg">
                             {referredUsers.length > 0 ? (
                                 <Table>
                                     <TableHeader>
                                         <TableRow>
                                             <TableHead>User</TableHead>
                                             <TableHead>Email</TableHead>
                                             <TableHead>Status</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                         {referredUsers.map(referredUser => (
                                             <TableRow key={referredUser.userId}>
                                                 <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={referredUser.avatarUrl} alt={referredUser.name} />
                                                            <AvatarFallback>{referredUser.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{referredUser.name}</span>
                                                    </div>
                                                 </TableCell>
                                                 <TableCell>{referredUser.email}</TableCell>
                                                 <TableCell>
                                                    <span className="text-green-600 font-semibold">Active</span>
                                                 </TableCell>
                                             </TableRow>
                                         ))}
                                     </TableBody>
                                 </Table>
                             ) : (
                                <div className="text-center py-12 bg-muted/50 rounded-lg">
                                    <p className="text-muted-foreground">Your referred users will appear here.</p>
                                </div>
                             )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
