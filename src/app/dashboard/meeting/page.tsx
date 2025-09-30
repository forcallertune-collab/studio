
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";

export default function MeetingPage() {
    const [roomName, setRoomName] = useState('');
    const [inMeeting, setInMeeting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);

    const handleJoinMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomName.trim()) {
            setInMeeting(true);
        }
    };

    const handleLeaveMeeting = () => {
        setInMeeting(false);
        setRoomName('');
    };

    if (inMeeting) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <Video /> Meeting: {roomName}
                    </CardTitle>
                    <CardDescription>You are now in the meeting.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center bg-black rounded-md relative">
                    {/* This would be replaced by the actual video stream component */}
                    <div className="text-center text-white">
                        <p className="text-2xl font-bold">Video Stream Placeholder</p>
                        <p className="text-muted-foreground">Live video would appear here.</p>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-gray-800/50 rounded-full">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setIsMuted(!isMuted)}>
                            {isMuted ? <MicOff /> : <Mic />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setIsCameraOff(!isCameraOff)}>
                            {isCameraOff ? <VideoOff /> : <Video />}
                        </Button>
                        <Button variant="destructive" size="icon" className="rounded-full" onClick={handleLeaveMeeting}>
                            <PhoneOff />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Video /> Live Meeting Room</CardTitle>
                <CardDescription>Create or join a meeting to connect with your team.</CardDescription>
            </CardHeader>
            <form onSubmit={handleJoinMeeting}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="room-name">Room Name</Label>
                        <Input 
                            id="room-name" 
                            placeholder="e.g., 'weekly-sync'" 
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <Button type="submit" className="w-full">
                        Create or Join Meeting
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
