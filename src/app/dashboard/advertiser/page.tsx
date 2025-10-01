
'use client';

import { useState, useMemo, useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { advertiserServices, initialOrders } from "@/lib/data";
import type { Platform } from "@/lib/types";
import { Rocket, Youtube, Facebook, Instagram, Wallet } from "lucide-react";
import { WalletContext, UserContext } from "../layout";

const platformIcons = {
    youtube: <Youtube className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
}

export default function AdvertiserPage() {
    const { toast } = useToast();
    const { walletBalance, setWalletBalance } = useContext(WalletContext);
    const { user } = useContext(UserContext);
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState<number | string>('');

    const handleCreateCampaign = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedService = advertiserServices.find(s => s.id === serviceId);

        if (!selectedService || !user) return;
        
        if (totalCost > walletBalance) {
            toast({
                title: "Insufficient Funds",
                description: "You do not have enough money in your wallet to place this order.",
                variant: "destructive",
            });
            return;
        }

        const newBalance = walletBalance - totalCost;
        setWalletBalance(newBalance);

        // Save the new order to localStorage
        const savedOrders = localStorage.getItem('adminOrders');
        const orders = savedOrders ? JSON.parse(savedOrders) : initialOrders;

        const newOrder = {
            id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
            user: user.name,
            service: selectedService.serviceName,
            link: link,
            quantity: Number(quantity),
            amount: totalCost,
            status: 'in progress' as const,
            date: new Date().toISOString().split('T')[0],
        };

        const updatedOrders = [newOrder, ...orders];
        localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
        // Manually dispatch a storage event to notify other components/tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'adminOrders',
            newValue: JSON.stringify(updatedOrders),
        }));


        toast({
            title: "Order Placed!",
            description: `₹${totalCost.toFixed(2)} has been deducted. Your campaign is now live.`,
        });
        
        // Reset form
        setPlatform(null);
        setServiceId(null);
        setLink('');
        setQuantity('');
    };
    
    const availableServices = useMemo(() => {
        if (!platform) return [];
        return advertiserServices.filter(s => s.platform === platform);
    }, [platform]);

    const selectedService = useMemo(() => {
        if (!serviceId) return null;
        return advertiserServices.find(s => s.id === serviceId);
    }, [serviceId]);

    const totalCost = useMemo(() => {
        if (!selectedService || !quantity) return 0;
        const numQuantity = Number(quantity);
        return (numQuantity / 1000) * selectedService.price;
    }, [selectedService, quantity]);
    
    const handlePlatformChange = (value: string) => {
        setPlatform(value as Platform);
        setServiceId(null);
        setQuantity('');
    }

    const handleServiceChange = (value: string) => {
        setServiceId(value);
        const service = advertiserServices.find(s => s.id === value);
        if (service) {
            setQuantity(service.min);
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Rocket />Create New Order</CardTitle>
                        <CardDescription>Promote your content with our network of active users.</CardDescription>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                            <Wallet className="h-4 w-4" />
                            Balance
                        </div>
                        <div className="text-lg font-bold font-headline">₹{walletBalance.toFixed(2)}</div>
                    </div>
                </div>
            </CardHeader>
            <form onSubmit={handleCreateCampaign}>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Column 1: Order Form */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="platform">Platform</Label>
                                <Select onValueChange={handlePlatformChange} value={platform || ''}>
                                    <SelectTrigger id="platform">
                                        <SelectValue placeholder="Select a platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="youtube">YouTube</SelectItem>
                                        <SelectItem value="facebook">Facebook</SelectItem>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <Label htmlFor="campaignType">Service</Label>
                                <Select onValueChange={handleServiceChange} value={serviceId || ''} disabled={!platform}>
                                    <SelectTrigger id="campaignType">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableServices.map(service => (
                                            <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="campaignUrl">Link</Label>
                                <Input id="campaignUrl" placeholder="https://..." value={link} onChange={e => setLink(e.target.value)} disabled={!serviceId} />
                            </div>

                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input 
                                    id="quantity" 
                                    type="number" 
                                    placeholder={selectedService ? `Min: ${selectedService.min}` : ''}
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                    min={selectedService?.min}
                                    max={selectedService?.max}
                                    disabled={!serviceId} 
                                />
                                {selectedService && (
                                    <p className="text-xs text-muted-foreground mt-1">Min: {selectedService.min.toLocaleString()} / Max: {selectedService.max.toLocaleString()}</p>
                                )}
                            </div>
                        </div>

                        {/* Column 2: Order Summary */}
                        <div className="space-y-4">
                             <Card className="bg-muted/50 h-full">
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {selectedService ? (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Service:</span>
                                                <span className="font-semibold flex items-center gap-2">
                                                    {platform && platformIcons[platform]}
                                                    {selectedService.name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Rate:</span>
                                                <span className="font-semibold">₹{selectedService.price.toFixed(2)} / 1,000</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Quantity:</span>
                                                <span className="font-semibold">{Number(quantity).toLocaleString()}</span>
                                            </div>
                                            <div className="border-t pt-4 mt-4 flex justify-between items-center">
                                                <span className="text-lg font-bold">Total Cost:</span>
                                                <span className="text-2xl font-bold font-headline text-primary">₹{totalCost.toFixed(2)}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-muted-foreground py-10">
                                            <p>Your order details will appear here.</p>
                                        </div>
                                    )}
                                </CardContent>
                             </Card>
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                   <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={!platform || !serviceId || !link || !quantity || totalCost > walletBalance}>
                     {totalCost > walletBalance ? 'Insufficient Funds' : 'Place Order'}
                   </Button>
                </CardContent>
            </form>
        </Card>
    );
}
