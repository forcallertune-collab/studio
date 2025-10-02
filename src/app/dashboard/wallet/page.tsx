
'use client';

import { useContext, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, Upload, Lock, CheckCircle, Clock, Banknote, History } from "lucide-react";
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
import type { WithdrawalRequest, Transaction, PaymentRequest } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function WalletPage() {
    const { walletBalance } = useContext(WalletContext);
    const { user, setUser } = useContext(UserContext);
    const { toast } = useToast();
    
    // Withdrawal state
    const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>('');
    const [isWithdrawalDialog, setIsWithdrawalDialog] = useState(false);
    
    // Deposit state
    const [depositAmount, setDepositAmount] = useState<number | string>('');
    const [transactionId, setTransactionId] = useState('');

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

    const handleDepositRequest = () => {
        if (!user || !user.userId) {
            toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
            return;
        }

        const amount = Number(depositAmount);
        if (!amount || amount <= 0) {
            toast({ title: "Invalid Amount", description: "Please enter a valid deposit amount.", variant: 'destructive' });
            return;
        }
        if (!transactionId) {
            toast({ title: "Transaction ID Required", description: "Please enter the transaction ID from your payment app.", variant: 'destructive' });
            return;
        }

        const paymentRequests: PaymentRequest[] = JSON.parse(localStorage.getItem('paymentRequests') || '[]');
        const newRequest: PaymentRequest = {
            id: transactionId,
            userId: user.userId,
            userEmail: user.email,
            amount: amount,
            status: 'pending',
            date: new Date().toISOString(),
        };

        paymentRequests.push(newRequest);
        localStorage.setItem('paymentRequests', JSON.stringify(paymentRequests));

        toast({
            title: 'Deposit Request Submitted',
            description: `Your request for ₹${amount.toFixed(2)} is being reviewed. It will be credited to your wallet upon approval.`
        });

        // Reset form
        setDepositAmount('');
        setTransactionId('');
    }

    const transactionHistory = useMemo(() => {
        return user?.transactions
            ?.filter(tx => tx.type === 'withdrawal' || tx.type === 'recharge')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    }, [user?.transactions]);

    const qrCodeData = placeholderImages.placeholderImages.find(img => img.id === 'qr-code');

    return (
        <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{walletBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available for Withdrawal</CardTitle>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{availableBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Locked Balance</CardTitle>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{lockedAmount.toFixed(2)}</div>
                         <p className="text-xs text-muted-foreground">Unlocks after 60 days</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="withdraw">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="withdraw"><Upload className="mr-2 h-4 w-4" />Withdraw</TabsTrigger>
                    <TabsTrigger value="deposit"><Banknote className="mr-2 h-4 w-4" />Deposit</TabsTrigger>
                </TabsList>

                <TabsContent value="withdraw" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Request Withdrawal</CardTitle>
                            <CardDescription>Withdraw your available balance to your UPI account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <Alert variant="destructive" className="bg-orange-100 border-orange-200 text-orange-800">
                                <AlertTitle className="font-bold flex items-center gap-2 text-orange-900">
                                    <Lock className="h-4 w-4"/>
                                    Withdrawal Policy
                                </AlertTitle>
                                <AlertDescription className="text-orange-700">
                                    A 5% admin fee applies to all withdrawals. The locked amount of ₹100 is for promotional use and cannot be withdrawn.
                                </AlertDescription>
                            </Alert>
                            <div className="space-y-2">
                                <Label htmlFor="withdrawal-amount">Amount (₹)</Label>
                                <Input 
                                    id="withdrawal-amount"
                                    type="number"
                                    placeholder={`Available: ₹${availableBalance.toFixed(2)}`}
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <AlertDialog open={isWithdrawalDialog} onOpenChange={setIsWithdrawalDialog}>
                                <AlertDialogTrigger asChild>
                                    <Button 
                                        className="w-full sm:w-auto" 
                                        disabled={!withdrawalAmount || Number(withdrawalAmount) <= 0 || Number(withdrawalAmount) > availableBalance}
                                    >
                                        Review Withdrawal Request
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
                </TabsContent>

                <TabsContent value="deposit" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Add Funds to Wallet</CardTitle>
                            <CardDescription>Scan the QR code with any UPI app to deposit funds.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <div className="p-4 border rounded-lg flex flex-col items-center gap-4 bg-muted/20">
                                    {qrCodeData && (
                                        <Image 
                                            src={qrCodeData.imageUrl}
                                            alt="UPI QR Code"
                                            width={200}
                                            height={200}
                                            data-ai-hint={qrCodeData.imageHint}
                                        />
                                    )}
                                    <div className="text-center">
                                        <p className="font-semibold">UPI ID: <span className="font-mono text-primary">9650428779@paytm</span></p>
                                        <p className="text-xs text-muted-foreground">Scan or pay to this UPI ID</p>
                                    </div>
                                </div>
                                <Alert>
                                    <AlertTitle>Important Instructions</AlertTitle>
                                    <AlertDescription>
                                        After making the payment, enter the amount and the Transaction ID (e.g., 20240801...) from your payment app to submit your request.
                                    </AlertDescription>
                                </Alert>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="deposit-amount">Amount Deposited (₹)</Label>
                                    <Input 
                                        id="deposit-amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transaction-id">UPI Transaction ID</Label>
                                    <Input 
                                        id="transaction-id"
                                        type="text"
                                        placeholder="Enter UTR/Transaction ID"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                </div>
                                 <Button onClick={handleDepositRequest} className="w-full">Submit Deposit Request</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><History />Transaction History</CardTitle>
                    <CardDescription>A record of your recent withdrawals and deposits.</CardDescription>
                </CardHeader>
                <CardContent>
                    {transactionHistory.length > 0 ? (
                        <div className="space-y-4">
                            {transactionHistory.map(tx => (
                                <div key={tx.id} className="p-4 border rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {tx.type === 'withdrawal' ? (
                                            <div className="p-2 bg-red-100 rounded-full text-red-600"><Upload className="h-5 w-5"/></div>
                                        ) : (
                                            <div className="p-2 bg-green-100 rounded-full text-green-600"><Banknote className="h-5 w-5"/></div>
                                        )}
                                        <div>
                                            <p className={cn("font-bold text-lg", tx.type === 'withdrawal' ? "text-red-600" : "text-green-600")}>
                                               {tx.type === 'withdrawal' ? '-' : '+'} ₹{tx.amount.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-muted-foreground capitalize">
                                                {tx.type.replace('_', ' ')}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(tx.date).toLocaleString()}
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
                            <p className="text-muted-foreground">No transaction history found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
