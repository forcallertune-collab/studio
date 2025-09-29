import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function GoogleReviewsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Star/> Google Reviews Tasks</CardTitle>
                <CardDescription>This section is coming soon. Get ready to earn by writing Google reviews!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Google review tasks are under construction.</p>
                </div>
            </CardContent>
        </Card>
    );
}
