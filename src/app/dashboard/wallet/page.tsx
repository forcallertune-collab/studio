'use client';

import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, History, Copy } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { WalletContext } from '../layout';
import placeholderImages from '@/lib/placeholder-images.json';

export default function WalletPage() {
    const { walletBalance, setWalletBalance } = useContext(WalletContext);
    const [rechargeAmount, setRechargeAmount] = useState<number | string>('');
    const [transactionId, setTransactionId] = useState('');
    const { toast } = useToast();

    const generateTransactionId = () => {
        const newTransactionId = `WETUBE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setTransactionId(newTransactionId);
    }

    const copyTransactionId = () => {
        if (!transactionId) return;
        navigator.clipboard.writeText(transactionId);
        toast({
            title: "Copied Transaction ID!",
        });
    }

    const handleRecharge = () => {
        const amount = Number(rechargeAmount);
        if (amount <= 0) {
            toast({
                title: 'Invalid Amount',
                description: 'Please enter an amount greater than zero.',
                variant: 'destructive',
            });
            return;
        }

        setWalletBalance(prev => prev + amount);
        toast({
            title: 'Recharge Successful!',
            description: `₹${amount.toFixed(2)} has been added to your wallet.`,
        });
        setRechargeAmount('');
        setTransactionId('');
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><Wallet/> My Wallet</CardTitle>
                    <CardDescription>View your balance, recharge your account, and see your transaction history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Balance Display */}
                    <div className="text-center p-6 bg-primary/10 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">CURRENT BALANCE</p>
                        <p className="text-5xl font-bold font-headline text-primary mt-2">₹{walletBalance.toFixed(2)}</p>
                    </div>

                    {/* Recharge Section */}
                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2 text-xl"><BadgeIndianRupee /> Recharge Wallet</CardTitle>
                            <CardDescription>Add funds to your wallet to purchase services.</CardDescription>
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
                                        Proceed to Add Funds
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Scan to Pay</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Scan the QR code with your payment app to add ₹{Number(rechargeAmount).toFixed(2)} to your wallet.
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
                                    <AlertDialogAction onClick={handleRecharge}>I have paid</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>

                    {/* Transaction History */}
                     <div>
                        <h3 className="font-headline text-xl mb-4 flex items-center gap-2"><History /> Transaction History</h3>
                        <div className="text-center py-12 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground">No transactions yet.</p>
                            <p className="text-sm text-muted-foreground">Your transaction history will appear here.</p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
