import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram } from "lucide-react";

export default function InstagramTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Instagram/> Instagram Tasks</CardTitle>
                <CardDescription>This section is coming soon. Get ready to earn by completing Instagram tasks!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Instagram tasks are under construction.</p>
                </div>
            </CardContent>
        </Card>
    );
}
