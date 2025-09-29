import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dummyTickets } from "@/lib/data";
import { cn } from "@/lib/utils";

const allTickets = [
    ...dummyTickets,
    { id: 'TICKET-K5L3M9', subject: 'Cannot create new campaign', status: 'open', lastUpdated: '2024-07-29' },
    { id: 'TICKET-P2Q8R1', subject: 'Question about service pricing', status: 'closed', lastUpdated: '2024-07-28' },
]

export default function AdminSupportPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Support Center</CardTitle>
                <CardDescription>Manage and respond to all user support tickets.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allTickets.map(ticket => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell>
                                    <Badge variant={ticket.status === 'closed' ? 'secondary' : 'default'} className={cn(ticket.status === 'open' && 'bg-green-600')}>
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{ticket.lastUpdated}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
