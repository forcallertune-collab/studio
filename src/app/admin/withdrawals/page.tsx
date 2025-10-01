
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { WithdrawalRequest, User, Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export default function AdminWithdrawalsPage() {
    const { toast } = useToast();
    const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);

    useEffect(() => {
        const savedRequests = localStorage.getItem('withdrawalRequests');
        if (savedRequests) {
            setWithdrawalRequests(JSON.parse(savedRequests));
        }
    }, []);

    const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
        const updatedRequests = withdrawalRequests.map(req => {
            if (req.id === requestId && req.status === 'pending') {
                const newStatus = action === 'approve' ? 'approved' : 'rejected';
                
                const allUsers: { [key: string]: User } = JSON.parse(localStorage.getItem('users') || '{}');
                const userToUpdate = allUsers[req.userId];
                
                if (!userToUpdate) {
                    toast({ title: 'Error', description: 'Could not find user.', variant: 'destructive' });
                    return req; // Skip update if user not found
                }
                
                // Find and update the specific transaction
                const transactionIndex = userToUpdate.transactions?.findIndex(t => t.id === req.id);

                if (newStatus === 'rejected') {
                    // Refund the amount to the user's wallet
                    userToUpdate.walletBalance = (userToUpdate.walletBalance || 0) + req.amount;
                    
                    if (transactionIndex !== -1 && userToUpdate.transactions) {
                        userToUpdate.transactions[transactionIndex].status = 'rejected';
                    }

                    toast({
                        title: 'Withdrawal Rejected',
                        description: `₹${req.amount.toFixed(2)} has been refunded to ${req.userEmail}.`,
                        variant: 'destructive',
                    });

                } else if (newStatus === 'approved') {
                    if (transactionIndex !== -1 && userToUpdate.transactions) {
                        userToUpdate.transactions[transactionIndex].status = 'approved';
                    }
                    toast({
                        title: 'Withdrawal Approved',
                        description: `Request for ₹${req.amount.toFixed(2)} has been approved.`,
                    });
                }
                
                allUsers[req.userId] = userToUpdate;
                localStorage.setItem('users', JSON.stringify(allUsers));
                window.dispatchEvent(new StorageEvent('storage', { key: 'users' }));


                return { ...req, status: newStatus };
            }
            return req;
        });

        setWithdrawalRequests(updatedRequests);
        localStorage.setItem('withdrawalRequests', JSON.stringify(updatedRequests));
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Approve or reject user withdrawal requests.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request ID</TableHead>
                            <TableHead>User Email</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>UPI ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {withdrawalRequests.length > 0 ? withdrawalRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-mono">{req.id}</TableCell>
                                <TableCell>{req.userEmail}</TableCell>
                                <TableCell>₹{req.amount.toFixed(2)}</TableCell>
                                <TableCell className="font-mono">{req.upiId}</TableCell>
                                <TableCell>
                                    <Badge variant={req.status === 'rejected' ? 'destructive' : 'secondary'}
                                        className={cn('capitalize', {
                                            'bg-green-600 text-white': req.status === 'approved',
                                            'bg-yellow-500 text-white': req.status === 'pending',
                                        })}>
                                        {req.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(req.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {req.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700" onClick={() => handleRequestAction(req.id, 'approve')}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => handleRequestAction(req.id, 'reject')}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">No withdrawal requests found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
