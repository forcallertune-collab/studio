import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function WalletPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Wallet/> My Wallet</CardTitle>
                <CardDescription>This section is coming soon. You'll be able to view transaction history and manage withdrawals here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Wallet features are under construction.</p>
                </div>
            </CardContent>
        </Card>
    );
}
