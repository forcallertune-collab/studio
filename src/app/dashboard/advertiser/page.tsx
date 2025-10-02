
'use client';

import { useState, useMemo, useContext, useEffect } from 'react';
import type { Platform, AdvertiserService, Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Rocket, ShoppingCart } from 'lucide-react';
import { WalletContext, UserContext } from '../layout';
import { advertiserServices, initialOrders } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import OrderFormSheet from '@/components/advertiser/order-form-sheet';
import { Badge } from '@/components/ui/badge';

export default function AdvertiserPage() {
    const { walletBalance } = useContext(WalletContext);
    const { user } = useContext(UserContext);
    const { toast } = useToast();
    
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
    const [cart, setCart] = useState<AdvertiserService[]>([]);
    const [userOrders, setUserOrders] = useState<Order[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const savedOrders = localStorage.getItem('adminOrders');
            const allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : initialOrders;
            const filteredOrders = allOrders.filter(order => order.userId === user.userId);
            setUserOrders(filteredOrders.slice(0, 5)); // Show recent 5 orders
        }
    }, [user]);

    const serviceCounts = useMemo(() => {
        const counts: { [key in Platform]: number } = {
            youtube: 0,
            facebook: 0,
            instagram: 0,
            app: 0,
            google: 0,
        };
        advertiserServices.forEach(service => {
            counts[service.platform]++;
        });
        return counts;
    }, []);

    const filteredServices = useMemo(() => {
        if (selectedPlatform === 'all') {
            return advertiserServices;
        }
        return advertiserServices.filter(s => s.platform === selectedPlatform);
    }, [selectedPlatform]);

    const addToCart = (service: AdvertiserService) => {
        if (cart.find(item => item.id === service.id)) {
            toast({
                title: "Already in cart",
                description: `${service.name} is already in your order summary.`,
            });
            return;
        }
        setCart(prev => [...prev, service]);
    };

    const removeFromCart = (serviceId: string) => {
        setCart(prev => prev.filter(item => item.id !== serviceId));
    };

    return (
        <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline text-2xl flex items-center gap-2"><Rocket />Advertiser Dashboard</CardTitle>
                            <CardDescription>Promote your content across multiple platforms.</CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 justify-end">
                                <Wallet className="h-4 w-4" />
                                Balance
                            </div>
                            <div className="text-lg font-bold font-headline">₹{walletBalance.toFixed(2)}</div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Tabs value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as any)}>
                <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto">
                    <TabsTrigger value="all">All Services</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube ({serviceCounts.youtube})</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook ({serviceCounts.facebook})</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram ({serviceCounts.instagram})</TabsTrigger>
                    <TabsTrigger value="app">App Store ({serviceCounts.app})</TabsTrigger>
                    <TabsTrigger value="google">Google ({serviceCounts.google})</TabsTrigger>
                </TabsList>
            </Tabs>
            
            <div className="grid lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="font-bold text-xl font-headline">Select Services</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map(service => (
                            <Card key={service.id} className="flex flex-col">
                                <CardHeader className="flex-row items-center justify-between pb-2">
                                     <div className="p-2 bg-primary/10 rounded-md">
                                        <service.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold font-headline text-primary">₹{service.perAction}</p>
                                        <p className="text-xs text-muted-foreground">per action</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <h3 className="font-bold">{service.name}</h3>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                </CardContent>
                                <CardContent>
                                    <Button 
                                        className="w-full bg-primary/90 hover:bg-primary"
                                        onClick={() => addToCart(service)}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="lg:sticky top-6 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline text-lg">Order Summary</CardTitle>
                             <Badge variant="secondary" className="text-base">{cart.length}</Badge>
                        </CardHeader>
                        <CardContent>
                            {cart.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <span>{item.name}</span>
                                                <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full" onClick={() => setIsSheetOpen(true)}>
                                        Proceed to Order
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    <ShoppingCart className="mx-auto h-12 w-12" />
                                    <p className="mt-2">No services selected</p>
                                    <p className="text-xs">Choose services to get started</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
             <OrderFormSheet 
                isOpen={isSheetOpen}
                setIsOpen={setIsSheetOpen}
                cart={cart}
                setCart={setCart}
            />
        </div>
    );
}
