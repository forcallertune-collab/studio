
'use client';

import { useContext, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, Upload, Lock, CheckCircle, Clock } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { WalletContext, UserContext } from '../layout';
import type { WithdrawalRequest, Transaction } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function WalletPage() {
    const { walletBalance, setWalletBalance } = useContext(WalletContext);
    const { user, setUser } = useContext(UserContext);
    const { toast } = useToast();
    
    // Withdrawal state
    const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>('');
    const [isWithdrawalDialog, setIsWithdrawalDialog] = useState(false);
    
    // Hardcoded locked amount as per the new design
    const lockedAmount = 100.00;
    const availableBalance = useMemo(() => Math.max(0, walletBalance - lockedAmount), [walletBalance]);

    const handleWithdrawalRequest = () => {
        if (!user || !user.userId) {
            toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
            return;
        }
        
        const amount = Number(withdrawalAmount);
        if (amount <= 0) {
            toast({ title: 'Invalid Amount', description: 'Please enter a valid amount to withdraw.', variant: 'destructive' });
            return;
        }

        if (amount > availableBalance) {
            toast({ title: 'Insufficient Available Balance', description: 'You cannot withdraw more than your available balance.', variant: 'destructive' });
            return;
        }
        
         if (!user.upiId) {
            toast({ title: 'UPI ID Missing', description: <>Please add your UPI ID in your <Link href="/dashboard/profile" className="underline">profile</Link> before withdrawing.</>, variant: 'destructive' });
            return;
        }

        const requestId = `WTH-${Date.now()}`;
        
        const withdrawalRequests: WithdrawalRequest[] = JSON.parse(localStorage.getItem('withdrawalRequests') || '[]');
        const newRequest: WithdrawalRequest = {
            id: requestId,
            userId: user.userId,
            userEmail: user.email,
            amount: amount,
            upiId: user.upiId,
            status: 'pending',
            date: new Date().toISOString(),
        };
        withdrawalRequests.push(newRequest);
        localStorage.setItem('withdrawalRequests', JSON.stringify(withdrawalRequests));

        const newTransaction: Transaction = {
            id: requestId,
            type: 'withdrawal',
            amount: amount,
            status: 'pending',
            date: new Date().toISOString(),
            description: `Withdrawal to ${user.upiId}`,
        };

        if (setUser) {
            setUser(prevUser => {
                if (!prevUser) return null;
                const updatedTransactions = [...(prevUser.transactions || []), newTransaction];
                return { 
                    ...prevUser, 
                    walletBalance: prevUser.walletBalance - amount,
                    transactions: updatedTransactions 
                };
            });
        }


        toast({
            title: 'Withdrawal Request Submitted',
            description: `Your request to withdraw ₹${amount.toFixed(2)} is pending and will be processed within 2 hours.`,
        });

        setIsWithdrawalDialog(false);
        setWithdrawalAmount('');
    };

    const withdrawalHistory = useMemo(() => {
        return user?.transactions
            ?.filter(tx => tx.type === 'withdrawal')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    }, [user?.transactions]);

    return (
        <div className="grid gap-6">
            {/* Top Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{walletBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available</CardTitle>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{availableBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Locked (60 days)</CardTitle>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{lockedAmount.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Request Withdrawal */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Request Withdrawal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert variant="destructive" className="bg-orange-100 border-orange-200 text-orange-800">
                             <AlertTitle className="font-bold flex items-center gap-2 text-orange-900">
                                <Lock className="h-4 w-4"/>
                                Locked Amount Notice
                            </AlertTitle>
                            <AlertDescription className="text-orange-700">
                                ₹100 is locked for 60 days for promotional use only. 5% admin fee will be deducted from withdrawal amount.
                            </AlertDescription>
                        </Alert>
                        <div className="space-y-2">
                            <Label htmlFor="withdrawal-amount">Withdrawal Amount</Label>
                            <Input 
                                id="withdrawal-amount"
                                type="number"
                                placeholder="Enter amount to withdraw"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Available for withdrawal: ₹{availableBalance.toFixed(2)}</p>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="payment-method">Payment Method</Label>
                             <Input 
                                id="payment-method"
                                type="text"
                                value={user?.upiId || user?.email || 'Not set'}
                                readOnly
                                className="bg-muted"
                             />
                        </div>
                    </CardContent>
                    <CardFooter>
                         <AlertDialog open={isWithdrawalDialog} onOpenChange={setIsWithdrawalDialog}>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    className="w-full" 
                                    disabled={!withdrawalAmount || Number(withdrawalAmount) <= 0 || Number(withdrawalAmount) > availableBalance}
                                >
                                    Request Withdrawal
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to request a withdrawal of <span className="font-bold text-foreground">₹{Number(withdrawalAmount).toFixed(2)}</span>.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                {user?.upiId ? (
                                    <div className="space-y-4">
                                        <p className="text-sm">Funds will be sent to your confirmed UPI ID: <span className="font-mono font-semibold">{user.upiId}</span></p>
                                        <p className="text-xs text-muted-foreground">To change your UPI ID, please visit your <Link href="/dashboard/profile" className="underline">profile page</Link>.</p>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-destructive">You have not set a UPI ID.</p>
                                        <Button asChild variant="link">
                                            <Link href="/dashboard/profile">Go to Profile to add one</Link>
                                        </Button>
                                    </div>
                                )}
                               
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleWithdrawalRequest} disabled={!user?.upiId}>Confirm & Withdraw</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
                
                {/* Withdrawal History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Withdrawal History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {withdrawalHistory.length > 0 ? (
                            <div className="space-y-4">
                                {withdrawalHistory.map(tx => (
                                    <div key={tx.id} className="p-4 border rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {tx.status === 'approved' || tx.status === 'completed' ? (
                                                <CheckCircle className="h-6 w-6 text-green-500" />
                                            ) : (
                                                <Clock className="h-6 w-6 text-yellow-500" />
                                            )}
                                            <div>
                                                <p className="font-bold text-lg">₹{tx.amount.toFixed(2)}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Payment Method: UPI
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Requested: {new Date(tx.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant={tx.status === 'rejected' ? 'destructive' : 'secondary'}
                                            className={cn('capitalize', {
                                                'bg-green-100 text-green-800 border-green-200': tx.status === 'approved' || tx.status === 'completed',
                                                'bg-yellow-100 text-yellow-800 border-yellow-200': tx.status === 'pending',
                                            })}>
                                            {tx.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-muted/50 rounded-lg">
                                <p className="text-muted-foreground">No withdrawal history found.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
