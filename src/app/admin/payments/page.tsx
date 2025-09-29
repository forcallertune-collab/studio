
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { PaymentRequest } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';


export default function AdminPaymentsPage() {
    const { toast } = useToast();
    const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
     const [users, setUsers] = useState<any>({});


    useEffect(() => {
        const savedRequests = localStorage.getItem('paymentRequests');
        if (savedRequests) {
            setPaymentRequests(JSON.parse(savedRequests));
        }

        const savedUsers = localStorage.getItem('users');
         if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            // Initialize with dummy user if not present
            const initialUsers = {
                'ankit.sharma@example.com': { walletBalance: 1250.75 }
            };
            setUsers(initialUsers);
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }
    }, []);

    const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
        const updatedRequests = paymentRequests.map(req => {
            if (req.id === requestId) {
                const newStatus = action === 'approve' ? 'approved' : 'rejected';
                
                if (newStatus === 'approved' && req.status === 'pending') {
                    // Find user and update their balance
                    const userEmail = req.userEmail;
                    const updatedUsers = { ...users };
                    if (updatedUsers[userEmail]) {
                        updatedUsers[userEmail].walletBalance = (updatedUsers[userEmail].walletBalance || 0) + req.amount;
                        localStorage.setItem('users', JSON.stringify(updatedUsers));
                        setUsers(updatedUsers);

                         // This is a workaround to trigger wallet updates on the user side
                        localStorage.setItem('walletBalance', updatedUsers[userEmail].walletBalance);

                        toast({
                            title: 'Payment Approved',
                            description: `₹${req.amount.toFixed(2)} added to the user's wallet.`,
                        });
                    }
                } else if (newStatus === 'rejected') {
                     toast({
                        title: 'Payment Rejected',
                        variant: 'destructive',
                    });
                }

                return { ...req, status: newStatus };
            }
            return req;
        });

        setPaymentRequests(updatedRequests);
        localStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Requests</CardTitle>
                <CardDescription>Approve or reject user wallet recharge requests.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>User Email</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentRequests.length > 0 ? paymentRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-mono">{req.id}</TableCell>
                                <TableCell>{req.userEmail}</TableCell>
                                <TableCell>₹{req.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                     <Badge variant={req.status === 'rejected' ? 'destructive' : 'secondary'} 
                                       className={cn('capitalize', {
                                            'bg-green-600 text-white': req.status === 'approved',
                                            'bg-yellow-500 text-white': req.status === 'pending',
                                        })}>
                                        {req.status}
                                    </Badge>
                                </TableCell>
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
                                <TableCell colSpan={5} className="text-center h-24">No pending payment requests.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
