import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";

export default function FacebookTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Facebook/> Facebook Tasks</CardTitle>
                <CardDescription>This section is coming soon. Get ready to earn by completing Facebook tasks!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Facebook tasks are under construction.</p>
                </div>
            </CardContent>
        </Card>
    );
}
