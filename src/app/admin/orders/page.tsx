
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { initialOrders } from '@/lib/data';
import type { Order, User, Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'completed' | 'processing' | 'pending' | 'failed' | 'cancelled' | 'in progress';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { toast } = useToast();

    // Function to load orders from localStorage
    const loadOrders = () => {
        if (typeof window !== 'undefined') {
            const savedOrders = localStorage.getItem('adminOrders');
            // Ensure initialOrders is used as a fallback if nothing is in localStorage
            setOrders(savedOrders ? JSON.parse(savedOrders) : initialOrders);
        }
    };

    // Load orders on initial component mount
    useEffect(() => {
        loadOrders();
    }, []);

    // Listen for storage changes to keep data in sync across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'adminOrders') {
                loadOrders();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        const orderToUpdate = orders.find(order => order.id === orderId);
        if (!orderToUpdate) return;
        
        let updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        if (newStatus === 'cancelled' && orderToUpdate.status !== 'cancelled') {
             // Refund logic
            const allUsers: { [key: string]: User } = JSON.parse(localStorage.getItem('users') || '{}');
            const userToUpdate = allUsers[orderToUpdate.userId];

            if (userToUpdate) {
                userToUpdate.walletBalance = (userToUpdate.walletBalance || 0) + orderToUpdate.amount;

                const refundTransaction: Transaction = {
                    id: `REFUND-${Date.now()}`,
                    type: 'recharge', // Using 'recharge' type to credit the wallet
                    amount: orderToUpdate.amount,
                    status: 'completed',
                    date: new Date().toISOString(),
                    description: 'Order Canceled - Refund',
                };
                userToUpdate.transactions = [...(userToUpdate.transactions || []), refundTransaction];
                
                allUsers[orderToUpdate.userId] = userToUpdate;
                localStorage.setItem('users', JSON.stringify(allUsers));
                // Dispatch a storage event so other tabs (like the user's dashboard) will update their wallet in real-time.
                window.dispatchEvent(new StorageEvent('storage', { 
                    key: 'users', 
                    newValue: JSON.stringify(allUsers),
                    storageArea: localStorage 
                }));
                
                toast({
                    title: 'Order Cancelled & Refunded',
                    description: `₹${orderToUpdate.amount.toFixed(2)} has been refunded to ${userToUpdate.name}.`,
                });
            } else {
                 toast({
                    title: 'Refund Failed',
                    description: `Could not find user ${orderToUpdate.userId} to issue a refund.`,
                    variant: 'destructive',
                });
            }
        }


        setOrders(updatedOrders);
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
            
            // Manually dispatch a storage event to notify other components (like task pages) immediately
            window.dispatchEvent(new StorageEvent('storage', { 
                key: 'adminOrders',
                newValue: JSON.stringify(updatedOrders),
                oldValue: localStorage.getItem('adminOrders'),
                storageArea: localStorage,
            }));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>A list of all recent advertiser orders. Change the status to control task visibility for users.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status (Task Control)</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length > 0 ? orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.user}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell className="max-w-[150px] truncate">
                                    <a href={order.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{order.link}</a>
                                </TableCell>
                                <TableCell>{order.quantity?.toLocaleString()}</TableCell>
                                <TableCell>₹{order.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}>
                                        <SelectTrigger className="w-[130px] focus:ring-0 focus:ring-offset-0">
                                            <SelectValue>
                                                <Badge variant={order.status === 'cancelled' || order.status === 'failed' ? 'destructive' : 'secondary'} 
                                                       className={cn('capitalize', {
                                                            'bg-green-600 text-white': order.status === 'completed',
                                                            'bg-yellow-500 text-white': order.status === 'in progress',
                                                            'bg-blue-500 text-white': order.status === 'pending',
                                                        })}>
                                                    {order.status}
                                                </Badge>
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in progress">In Progress (Active)</SelectItem>
                                            <SelectItem value="pending">Pending (Hidden)</SelectItem>
                                            <SelectItem value="completed">Completed (Hidden)</SelectItem>
                                            <SelectItem value="cancelled">Cancelled (Refund)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        )) : (
                             <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No orders have been placed yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
