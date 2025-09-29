
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { SupportTicket } from '@/lib/types';
import { cn } from "@/lib/utils";

export default function AdminSupportPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);

    useEffect(() => {
        const savedTickets = localStorage.getItem('supportTickets');
        if (savedTickets) {
            setTickets(JSON.parse(savedTickets));
        }
    }, []);

    const handleStatusChange = (ticketId: string, newStatus: 'open' | 'closed') => {
        const updatedTickets = tickets.map(ticket => 
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        );
        setTickets(updatedTickets);
        localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    };

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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.length > 0 ? tickets.map(ticket => (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell>
                                    <Select value={ticket.status} onValueChange={(value) => handleStatusChange(ticket.id, value as 'open' | 'closed')}>
                                        <SelectTrigger className="w-[110px] focus:ring-0 focus:ring-offset-0">
                                            <SelectValue>
                                                <Badge variant={ticket.status === 'closed' ? 'secondary' : 'default'} className={cn('capitalize', ticket.status === 'open' && 'bg-green-600 text-white')}>
                                                    {ticket.status}
                                                </Badge>
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{ticket.lastUpdated}</TableCell>
                            </TableRow>
                        )) : (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">No support tickets found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
