import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const dummyOrders = [
  { id: 'ORD-001', user: 'Amit Patel', service: 'YouTube Subscribers', amount: 1200, status: 'completed', date: '2024-07-29' },
  { id: 'ORD-002', user: 'Priya Singh', service: 'Facebook Page Likes', amount: 400, status: 'processing', date: '2024-07-29' },
  { id: 'ORD-003', user: 'Rohan Gupta', service: 'Instagram Followers', amount: 900, status: 'completed', date: '2024-07-28' },
  { id: 'ORD-004', user: 'Sneha Reddy', service: 'YouTube Views', amount: 240, status: 'pending', date: '2024-07-28' },
  { id: 'ORD-005', user: 'Vikram Kumar', service: 'YouTube Watch Time', amount: 2000, status: 'failed', date: '2024-07-27' },
];

export default function AdminOrdersPage() {
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
                        {dummyOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.user}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell>₹{order.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'failed' ? 'destructive' : 'secondary'} 
                                           className={cn({
                                                'bg-green-600 text-white': order.status === 'completed',
                                                'bg-yellow-500 text-white': order.status === 'processing',
                                                'bg-blue-500 text-white': order.status === 'pending',
                                            })}>
                                        {order.status}
                                    </Badge>
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
