

'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, History, Copy, Upload, Check } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import placeholderImages from '@/lib/placeholder-images.json';
import type { PaymentRequest, WithdrawalRequest, Transaction } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function WalletPage() {
    const { walletBalance, setWalletBalance } = useContext(WalletContext);
    const { user, setUser } = useContext(UserContext);
    const { toast } = useToast();
    
    // Recharge state
    const [rechargeAmount, setRechargeAmount] = useState<number | string>('');
    const [transactionId, setTransactionId] = useState('');
    const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false);

    // Withdrawal state
    const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>('');
    const [isWithdrawalDialog, setIsWithdrawalDialog] = useState(false);
    const [isUpiConfirmed, setIsUpiConfirmed] = useState(false);


    const copyToClipboard = (text: string, subject: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `Copied ${subject}!`,
        });
    }

    const handlePaymentRequest = () => {
        if (!user || !user.userId) {
             toast({
                title: 'Error',
                description: 'You must be logged in to make a payment request.',
                variant: 'destructive',
            });
            return;
        }

        const amount = Number(rechargeAmount);
        if (amount <= 0 || !transactionId) {
            toast({
                title: 'Invalid Request',
                description: 'Please enter a valid amount and transaction ID.',
                variant: 'destructive',
            });
            return;
        }

        const savedRequests = localStorage.getItem('paymentRequests');
        const paymentRequests: PaymentRequest[] = savedRequests ? JSON.parse(savedRequests) : [];
        
        const idExists = paymentRequests.some(req => req.id === transactionId);
        if (idExists) {
            toast({
                title: 'Duplicate Transaction ID',
                description: 'This transaction ID has already been used.',
                variant: 'destructive',
            });
            return;
        }

        const newRequest: PaymentRequest = {
            id: transactionId,
            userId: user.userId,
            userEmail: user.email,
            amount,
            status: 'pending',
            date: new Date().toISOString(),
        };

        paymentRequests.push(newRequest);
        localStorage.setItem('paymentRequests', JSON.stringify(paymentRequests));

        toast({
            title: 'Request Submitted',
            description: 'Your payment is being processed. Please wait for admin approval.',
        });
        
        // Reset and close
        setRechargeAmount('');
        setTransactionId('');
        setIsRechargeDialogOpen(false);
    }

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

        if (amount > walletBalance) {
            toast({ title: 'Insufficient Balance', description: 'You cannot withdraw more than your available balance.', variant: 'destructive' });
            return;
        }
         if (!user.upiId) {
            toast({ title: 'UPI ID Missing', description: <>Please add your UPI ID in your <Link href="/dashboard/profile" className="underline">profile</Link> before withdrawing.</>, variant: 'destructive' });
            return;
        }
        if (!isUpiConfirmed) {
            toast({ title: 'Confirmation Required', description: 'Please confirm your UPI ID is correct.', variant: 'destructive' });
            return;
        }


        const requestId = `WTH-${Date.now()}`;
        
        // Create withdrawal request for admin
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

        // Create transaction history entry for user
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
        setIsUpiConfirmed(false);
    };

    const sortedTransactions = user?.transactions?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

    const getTxAmountClass = (tx: Transaction) => {
        const incomeTypes: Transaction['type'][] = ['recharge', 'task_earning', 'referral_bonus'];
        if (incomeTypes.includes(tx.type)) {
            return 'text-green-600';
        }
        return 'text-red-600';
    }

    const getTxAmountPrefix = (tx: Transaction) => {
        const incomeTypes: Transaction['type'][] = ['recharge', 'task_earning', 'referral_bonus'];
        if (incomeTypes.includes(tx.type)) {
            return '+';
        }
        return '-';
    }

    return (
        <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Wallet/> My Wallet</CardTitle>
                    <CardDescription>View your balance, add funds, withdraw earnings, and see transaction history.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Balance Display */}
                    <div className="text-center p-6 bg-primary/10 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">CURRENT BALANCE</p>
                        <p className="text-5xl font-bold font-headline text-primary mt-2">₹{walletBalance.toFixed(2)}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Recharge Section */}
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2 text-xl"><BadgeIndianRupee /> Recharge Wallet</CardTitle>
                        <CardDescription>Add funds to your wallet via UPI to purchase services.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="flex-1 w-full">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input 
                                id="amount" 
                                type="number" 
                                placeholder="Enter amount" 
                                value={rechargeAmount}
                                onChange={(e) => setRechargeAmount(e.target.value)}
                                min="1"
                            />
                        </div>
                        <AlertDialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full sm:w-auto" disabled={!rechargeAmount || Number(rechargeAmount) <= 0}>
                                    Add Funds
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Complete Your Payment</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Pay ₹{Number(rechargeAmount).toFixed(2)} to the details below. After paying, enter the Transaction ID and click "I have paid".
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className='space-y-4 rounded-lg border p-4'>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>UPI ID</p>
                                            <p className='font-mono font-semibold'>rockstar829092@ybl</p>
                                        </div>
                                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard('rockstar829092@ybl', 'UPI ID')}>
                                            <Copy className='mr-2 h-4 w-4' /> Copy
                                        </Button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-xs text-muted-foreground'>Mobile Number</p>
                                            <p className='font-mono font-semibold'>6376492883</p>
                                        </div>
                                         <Button size="sm" variant="ghost" onClick={() => copyToClipboard('6376492883', 'Number')}>
                                            <Copy className='mr-2 h-4 w-4' /> Copy
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="transaction-id" className="font-semibold">Payment Transaction ID</Label>
                                    <Input 
                                        id="transaction-id" 
                                        placeholder="Enter the transaction ID from your UPI app"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">This is required to verify your payment.</p>
                                </div>
                                <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setTransactionId('')}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handlePaymentRequest} disabled={!transactionId}>I have paid</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>

                 {/* Withdrawal Section */}
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2 text-xl"><Upload /> Withdraw Earnings</CardTitle>
                        <CardDescription>Request a payout of your available balance to your UPI.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="flex-1 w-full">
                            <Label htmlFor="withdrawal-amount">Amount (₹)</Label>
                            <Input 
                                id="withdrawal-amount" 
                                type="number" 
                                placeholder="Enter amount"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                min="1"
                                max={walletBalance}
                            />
                        </div>
                        <AlertDialog open={isWithdrawalDialog} onOpenChange={(open) => { setIsWithdrawalDialog(open); if(!open) setIsUpiConfirmed(false); }}>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    className="w-full sm:w-auto" 
                                    variant="outline"
                                    disabled={!withdrawalAmount || Number(withdrawalAmount) <= 0 || Number(withdrawalAmount) > walletBalance}
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
                                        <p className="text-sm">Funds will be sent to the following UPI ID:</p>
                                        <div className="border rounded-md px-4 py-2 bg-muted">
                                            <p className="font-mono font-semibold text-center text-lg">{user.upiId}</p>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Checkbox id="upi-confirm" checked={isUpiConfirmed} onCheckedChange={(checked) => setIsUpiConfirmed(checked as boolean)} />
                                            <label
                                                htmlFor="upi-confirm"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I confirm the UPI ID above is correct.
                                            </label>
                                        </div>
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
                                    <AlertDialogAction onClick={handleWithdrawalRequest} disabled={!isUpiConfirmed || !user?.upiId}>Confirm & Withdraw</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History */}
            <Card>
                <CardHeader>
                    <h3 className="font-headline text-xl mb-4 flex items-center gap-2"><History /> Transaction History</h3>
                </CardHeader>
                <CardContent>
                     {sortedTransactions.length > 0 ? (
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedTransactions.map(tx => (
                                        <TableRow key={tx.id}>
                                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                                            <TableCell className="capitalize">{tx.type.replace(/_/g, ' ')}</TableCell>
                                            <TableCell className="font-mono text-xs">{tx.description}</TableCell>
                                            <TableCell className={cn("font-semibold", getTxAmountClass(tx))}>
                                                {getTxAmountPrefix(tx)} ₹{tx.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={tx.status === 'rejected' ? 'destructive' : 'secondary'}
                                                    className={cn('capitalize', {
                                                        'bg-green-600 text-white': tx.status === 'approved' || tx.status === 'completed',
                                                        'bg-yellow-500 text-white': tx.status === 'pending',
                                                    })}>
                                                    {tx.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground">No transactions yet.</p>
                            <p className="text-sm text-muted-foreground">Your transaction history will appear here.</p>
                        </div>
                     )}
                </CardContent>
            </Card>
        </div>
    );
}
