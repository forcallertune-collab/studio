'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { advertiserServices } from "@/lib/data";
import { Rocket } from "lucide-react";

export default function AdvertiserPage() {
    const { toast } = useToast();

    const handleCreateCampaign = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Campaign Created!",
            description: "Your new campaign is under review and will go live shortly.",
        });
        // Here you would typically reset the form
    };

    return (
        <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Rocket />Create a New Campaign</CardTitle>
                        <CardDescription>Reach thousands of active users. Fill out the form below to start.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleCreateCampaign}>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="campaignName">Campaign Name</Label>
                                <Input id="campaignName" placeholder="e.g., My Awesome YouTube Channel" />
                            </div>
                            <div>
                                <Label htmlFor="campaignType">Service Type</Label>
                                <Select>
                                    <SelectTrigger id="campaignType">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {advertiserServices.map(service => (
                                            <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="campaignUrl">URL</Label>
                                <Input id="campaignUrl" placeholder="https://youtube.com/your-channel-or-video" />
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity (in thousands)</Label>
                                <Input id="quantity" type="number" placeholder="e.g., 5 for 5,000" />
                            </div>
                        </CardContent>
                        <CardContent>
                           <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Create Campaign</Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Our Services</CardTitle>
                        <CardDescription>Transparent pricing for real results.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {advertiserServices.map(service => (
                            <div key={service.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <service.icon className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">{service.name}</p>
                                        <p className="text-xs text-muted-foreground">{service.unit}</p>
                                    </div>
                                </div>
                                <p className="font-bold font-headline text-lg">₹{service.price}</p>
                            </div>
                        ))}
                         <div className="pt-2 text-xs text-muted-foreground">
                            Note: Watch time is sold in blocks of 1,000 hours.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
