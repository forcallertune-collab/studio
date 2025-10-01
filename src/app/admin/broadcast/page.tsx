
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Megaphone } from 'lucide-react';

export default function BroadcastPage() {
    const { toast } = useToast();
    const [announcement, setAnnouncement] = useState('');

    useEffect(() => {
        const savedAnnouncement = localStorage.getItem('sociara-announcement');
        if (savedAnnouncement) {
            setAnnouncement(savedAnnouncement);
        }
    }, []);
    
    const handleSaveAnnouncement = () => {
        localStorage.setItem('sociara-announcement', announcement);
        toast({
            title: 'Announcement Published',
            description: 'The message is now live for all users.',
        });
    };

    const handleClearAnnouncement = () => {
        setAnnouncement('');
        localStorage.removeItem('sociara-announcement');
        toast({
            title: 'Announcement Cleared',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Megaphone /> Broadcast Message</CardTitle>
                <CardDescription>Post a message that will be shown to all users on the homepage and dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="announcement-message">Your Message</Label>
                    <Textarea 
                        id="announcement-message"
                        placeholder="e.g., Scheduled maintenance tomorrow from 2 AM to 3 AM."
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        rows={6}
                    />
                </div>
                    <div className="flex gap-2">
                    <Button onClick={handleSaveAnnouncement}>Publish Announcement</Button>
                    <Button variant="outline" onClick={handleClearAnnouncement}>Clear</Button>
                </div>
            </CardContent>
        </Card>
    );
}
