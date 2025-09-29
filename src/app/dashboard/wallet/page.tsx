'use client';

import { useContext, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Wallet, BadgeIndianRupee, History } from "lucide-react";
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

export default function WalletPage() {
    const { walletBalance, setWalletBalance } = useContext(WalletContext);
    const [rechargeAmount, setRechargeAmount] = useState<number | string>('');
    const { toast } = useToast();

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
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-full sm:w-auto" disabled={!rechargeAmount || Number(rechargeAmount) <= 0}>
                                        Proceed to Add Funds
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to add ₹{Number(rechargeAmount).toFixed(2)} to your wallet. This is a simulated payment for demonstration purposes.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleRecharge}>Pay Now</AlertDialogAction>
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
