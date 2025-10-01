
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YoutubeViewsTask from "@/components/tasks/youtube-views-task";
import YoutubeOtherTasks from "@/components/tasks/youtube-other-tasks";

export default function YouTubeTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">YouTube Earning Tasks</CardTitle>
                <CardDescription>Complete tasks to earn money. Choose a category below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="views">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="views">Views</TabsTrigger>
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                        <TabsTrigger value="subscribes">Subscribes</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="views" className="mt-4">
                        <YoutubeViewsTask />
                    </TabsContent>
                    <TabsContent value="likes" className="mt-4">
                        <YoutubeOtherTasks type="like" />
                    </TabsContent>
                    <TabsContent value="subscribes" className="mt-4">
                        <YoutubeOtherTasks type="subscribe" />
                    </TabsContent>
                    <TabsContent value="comments" className="mt-4">
                        <YoutubeOtherTasks type="comment" />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
