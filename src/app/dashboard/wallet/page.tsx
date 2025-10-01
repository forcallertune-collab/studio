

'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, History, Copy, Upload } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

    // Withdrawal state
    const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>('');
    const [isWithdrawalDialog, setIsWithdrawalDialog] = useState(false);


    const generateTransactionId = () => {
        const newTransactionId = `SOCIARA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setTransactionId(newTransactionId);
    }

    const copyTransactionId = () => {
        if (!transactionId) return;
        navigator.clipboard.writeText(transactionId);
        toast({
            title: "Copied Transaction ID!",
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
                description: 'Please enter a valid amount and generate a transaction ID.',
                variant: 'destructive',
            });
            return;
        }

        const savedRequests = localStorage.getItem('paymentRequests');
        const paymentRequests: PaymentRequest[] = savedRequests ? JSON.parse(savedRequests) : [];

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
        
        setRechargeAmount('');
        setTransactionId('');
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
    };

    const sortedTransactions = user?.transactions?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];


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
                        <AlertDialog onOpenChange={(open) => open && generateTransactionId()}>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full sm:w-auto" disabled={!rechargeAmount || Number(rechargeAmount) <= 0}>
                                    Add Funds
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Scan to Pay</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Scan the QR code with your payment app to add ₹{Number(rechargeAmount).toFixed(2)}. After paying, click "I have paid".
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className='flex flex-col items-center justify-center gap-4 py-4'>
                                    <Image
                                        src={placeholderImages.placeholderImages[6].imageUrl}
                                        alt="QR Code"
                                        width={200}
                                        height={200}
                                        className="rounded-lg border p-1"
                                        data-ai-hint={placeholderImages.placeholderImages[6].imageHint}
                                    />
                                    <div className='text-center'>
                                        <p className='text-sm text-muted-foreground'>Transaction ID:</p>
                                        <div className="flex items-center gap-2">
                                            <span className='font-mono text-sm font-semibold'>{transactionId}</span>
                                            <Button size="icon" variant="ghost" className='h-7 w-7' onClick={copyTransactionId}>
                                                <Copy className='h-4 w-4'/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setTransactionId('')}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handlePaymentRequest}>I have paid</AlertDialogAction>
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
                        <AlertDialog open={isWithdrawalDialog} onOpenChange={setIsWithdrawalDialog}>
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
                                        You are about to request a withdrawal of <span className="font-bold text-foreground">₹{Number(withdrawalAmount).toFixed(2)}</span> to your UPI ID: <span className="font-mono text-foreground">{user?.upiId || 'Not Set'}</span>.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <p className="text-sm text-muted-foreground">The amount will be deducted from your wallet and is subject to admin approval within 2 hours.</p>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleWithdrawalRequest}>Confirm & Withdraw</AlertDialogAction>
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
                                            <TableCell className="capitalize">{tx.type}</TableCell>
                                            <TableCell className="font-mono text-xs">{tx.description}</TableCell>
                                            <TableCell className={cn("font-semibold", tx.type === 'recharge' ? 'text-green-600' : 'text-red-600')}>
                                                {tx.type === 'recharge' ? '+' : '-'} ₹{tx.amount.toFixed(2)}
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
