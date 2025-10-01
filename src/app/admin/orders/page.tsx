
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { initialOrders } from '@/lib/data';

type OrderStatus = 'completed' | 'processing' | 'pending' | 'failed' | 'cancelled' | 'in progress';

// A type for the orders to ensure consistency
type Order = {
    id: string;
    user: string;
    service: string;
    link: string;
    quantity: number;
    amount: number;
    status: OrderStatus;
    date: string;
};


export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    // Function to load orders from localStorage
    const loadOrders = () => {
        if (typeof window !== 'undefined') {
            const savedOrders = localStorage.getItem('adminOrders');
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
        const updatedOrders = orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
        
        // Manually dispatch a storage event to notify other components (like task pages) immediately
        window.dispatchEvent(new StorageEvent('storage', { key: 'adminOrders' }));
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
                        {orders.map((order) => (
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
                                        <SelectTrigger className="w-[120px] focus:ring-0 focus:ring-offset-0">
                                            <SelectValue>
                                                <Badge variant={order.status === 'cancelled' ? 'destructive' : 'secondary'} 
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
                                            <SelectItem value="pending">Pending (Hidden)</SelectItem>
                                            <SelectItem value="in progress">In Progress (Active)</SelectItem>
                                            <SelectItem value="completed">Completed (Hidden)</SelectItem>
                                            <SelectItem value="cancelled">Cancelled (Hidden)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
