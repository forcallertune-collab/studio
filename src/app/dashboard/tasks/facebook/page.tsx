import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook } from "lucide-react";
import FacebookTasks from "@/components/tasks/facebook-tasks";
import { facebookLikeTasks, facebookFollowTasks } from "@/lib/data";

export default function FacebookTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Facebook/> Facebook Earning Tasks</CardTitle>
                <CardDescription>Complete tasks to earn money. Choose a category below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="likes">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                        <TabsTrigger value="follows">Follows</TabsTrigger>
                    </TabsList>
                    <TabsContent value="likes" className="mt-4">
                        <FacebookTasks type="like" tasks={facebookLikeTasks} />
                    </TabsContent>
                    <TabsContent value="follows" className="mt-4">
                        <FacebookTasks type="follow" tasks={facebookFollowTasks} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
