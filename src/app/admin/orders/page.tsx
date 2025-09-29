
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type OrderStatus = 'completed' | 'processing' | 'pending' | 'failed' | 'cancelled' | 'in progress';

const initialOrders = [
  { id: 'ORD-001', user: 'Amit Patel', service: 'YouTube Subscribers', amount: 1200, status: 'completed' as OrderStatus, date: '2024-07-29' },
  { id: 'ORD-002', user: 'Priya Singh', service: 'Facebook Page Likes', amount: 400, status: 'in progress' as OrderStatus, date: '2024-07-29' },
  { id: 'ORD-003', user: 'Rohan Gupta', service: 'Instagram Followers', amount: 900, status: 'completed' as OrderStatus, date: '2024-07-28' },
  { id: 'ORD-004', user: 'Sneha Reddy', service: 'YouTube Views', amount: 240, status: 'pending' as OrderStatus, date: '2024-07-28' },
  { id: 'ORD-005', user: 'Vikram Kumar', service: 'YouTube Watch Time', amount: 2000, status: 'cancelled' as OrderStatus, date: '2024-07-27' },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);

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
                        {orders.map(order => (
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
