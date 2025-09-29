import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function AppDownloadsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Download/> App Download Tasks</CardTitle>
                <CardDescription>This section is coming soon. Get ready to earn by downloading and reviewing apps!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">App download tasks are under construction.</p>
                </div>
            </CardContent>
        </Card>
    );
}
