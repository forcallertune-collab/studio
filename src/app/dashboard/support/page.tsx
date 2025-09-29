
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LifeBuoy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dummyTickets } from '@/lib/data';
import type { SupportTicket } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function SupportPage() {
    const { toast } = useToast();
    const [tickets, setTickets] = useState<SupportTicket[]>(() => {
        if (typeof window === 'undefined') {
            return dummyTickets;
        }
        const savedTickets = localStorage.getItem('supportTickets');
        return savedTickets ? JSON.parse(savedTickets) : dummyTickets;
    });
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('supportTickets', JSON.stringify(tickets));
    }, [tickets]);


    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !message) {
             toast({
                title: "Missing Fields",
                description: "Please fill out both subject and message.",
                variant: "destructive",
            });
            return;
        }

        const newTicket: SupportTicket = {
            id: `TICKET-${Math.random().toString(16).slice(2).toUpperCase()}`,
            subject,
            status: 'open',
            lastUpdated: new Date().toISOString().split('T')[0],
        };
        setTickets([newTicket, ...tickets]);
        setSubject('');
        setMessage('');
        toast({
            title: "Ticket Submitted!",
            description: "We have received your request and will get back to you shortly.",
        });
    };
    
    return (
        <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><LifeBuoy /> Support Center</CardTitle>
                        <CardDescription>View your support tickets or create a new one.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <h3 className="font-headline text-lg mb-4">My Tickets</h3>
                        <div className="border rounded-lg">
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
                                    {tickets.map(ticket => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium">{ticket.id}</TableCell>
                                            <TableCell>{ticket.subject}</TableCell>
                                            <TableCell>
                                                <Badge variant={ticket.status === 'closed' ? 'secondary' : 'default'} className={cn(ticket.status === 'open' && 'bg-green-600')}>
                                                    {ticket.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{ticket.lastUpdated}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Create New Ticket</CardTitle>
                        <CardDescription>Have an issue? Let us know.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmitTicket}>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input 
                                    id="subject" 
                                    placeholder="e.g., Payment Issue" 
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea 
                                    id="message" 
                                    placeholder="Describe your issue in detail..." 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={5}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Submit Ticket</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
