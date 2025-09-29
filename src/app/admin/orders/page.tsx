
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { initialOrders } from '@/lib/data';

type OrderStatus = 'completed' | 'processing' | 'pending' | 'failed' | 'cancelled' | 'in progress';


export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(() => {
        if (typeof window === 'undefined') {
            return initialOrders;
        }
        const savedOrders = localStorage.getItem('adminOrders');
        return savedOrders ? JSON.parse(savedOrders) : initialOrders;
    });

    useEffect(() => {
        localStorage.setItem('adminOrders', JSON.stringify(orders));
    }, [orders]);


    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>A list of all recent advertiser orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order: any) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.user}</TableCell>
                                <TableCell>{order.service}</TableCell>
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
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
