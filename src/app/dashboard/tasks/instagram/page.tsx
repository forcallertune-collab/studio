
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import InstagramReelsTask from "@/components/tasks/instagram-reels-task";

export default function InstagramTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Instagram/> Instagram Tasks</CardTitle>
                <CardDescription>Get ready to earn by completing Instagram tasks!</CardDescription>
            </CardHeader>
            <CardContent>
                <InstagramReelsTask />
            </CardContent>
        </Card>
    );
}
