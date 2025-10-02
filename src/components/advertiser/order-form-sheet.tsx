
'use client';

import { useState, useContext } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { UserContext, WalletContext } from '@/app/dashboard/layout';
import type { AdvertiserService, Order, Transaction } from '@/lib/types';
import { initialOrders } from '@/lib/data';

type OrderItem = {
    serviceId: string;
    link: string;
    quantity: string;
};

type OrderFormSheetProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    cart: AdvertiserService[];
    setCart: (cart: AdvertiserService[]) => void;
};

export default function OrderFormSheet({ isOpen, setIsOpen, cart, setCart }: OrderFormSheetProps) {
    const { toast } = useToast();
    const { user, setUser } = useContext(UserContext);
    const { walletBalance, setWalletBalance } = useContext(WalletContext);

    const [orderItems, setOrderItems] = useState<Record<string, { link: string; quantity: string }>>({});
    
    const handleInputChange = (serviceId: string, field: 'link' | 'quantity', value: string) => {
        setOrderItems(prev => ({
            ...prev,
            [serviceId]: {
                ...prev[serviceId],
                [field]: value
            }
        }));
    };

    const totalCost = cart.reduce((total, service) => {
        const item = orderItems[service.id];
        const quantity = Number(item?.quantity) || 0;
        return total + (quantity / 1000) * service.price;
    }, 0);

    const handlePlaceOrder = () => {
        if (!user || !setUser) return;

        // Validation
        for (const service of cart) {
            const item = orderItems[service.id];
            if (!item?.link || !item?.quantity) {
                toast({ title: "Missing Information", description: `Please provide a link and quantity for ${service.name}.`, variant: "destructive" });
                return;
            }
            const quantity = Number(item.quantity);
            if (quantity < service.min || quantity > service.max) {
                 toast({ title: "Invalid Quantity", description: `Quantity for ${service.name} must be between ${service.min} and ${service.max}.`, variant: "destructive" });
                return;
            }
        }
        
        if (totalCost > walletBalance) {
            toast({ title: "Insufficient Funds", description: "Your wallet balance is too low to place this order.", variant: "destructive" });
            return;
        }

        // Process order
        const newBalance = walletBalance - totalCost;
        const newOrders: Order[] = [];
        const newTransactions: Transaction[] = [];

        const savedOrders = JSON.parse(localStorage.getItem('adminOrders') || JSON.stringify(initialOrders));

        cart.forEach(service => {
            const item = orderItems[service.id];
            const quantity = Number(item.quantity);
            const cost = (quantity / 1000) * service.price;

            const newOrder: Order = {
                id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                userId: user.userId,
                user: user.name,
                service: service.serviceName,
                link: item.link,
                quantity: quantity,
                amount: cost,
                status: 'in progress',
                date: new Date().toISOString(),
                progress: 0,
            };
            newOrders.push(newOrder);

            const newTransaction: Transaction = {
                id: `ORD-TXN-${newOrder.id}`,
                type: 'order_placed',
                amount: cost,
                status: 'completed',
                date: new Date().toISOString(),
                description: `Order: ${service.name} x${quantity}`,
            };
            newTransactions.push(newTransaction);
        });

        // Update user state
        setUser(prevUser => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                walletBalance: newBalance,
                transactions: [...(prevUser.transactions || []), ...newTransactions],
            };
        });
        
        setWalletBalance(newBalance);

        // Update admin orders
        const updatedAdminOrders = [...newOrders, ...savedOrders];
        localStorage.setItem('adminOrders', JSON.stringify(updatedAdminOrders));
        window.dispatchEvent(new StorageEvent('storage', { key: 'adminOrders' }));

        toast({
            title: "Order Placed Successfully!",
            description: `A total of ${cart.length} campaigns have been started.`,
        });

        // Reset and close
        setCart([]);
        setOrderItems({});
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="sm:max-w-xl w-full flex flex-col">
                <SheetHeader>
                    <SheetTitle className="font-headline">Complete Your Order</SheetTitle>
                    <SheetDescription>Provide the necessary details for each service in your cart.</SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-grow pr-6 -mr-6">
                    <div className="space-y-6 py-4">
                        {cart.map(service => (
                            <Card key={service.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{service.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor={`link-${service.id}`}>Link</Label>
                                        <Input
                                            id={`link-${service.id}`}
                                            placeholder="https://..."
                                            value={orderItems[service.id]?.link || ''}
                                            onChange={(e) => handleInputChange(service.id, 'link', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`quantity-${service.id}`}>Quantity</Label>
                                        <Input
                                            id={`quantity-${service.id}`}
                                            type="number"
                                            placeholder={`Min: ${service.min}, Max: ${service.max}`}
                                            value={orderItems[service.id]?.quantity || ''}
                                            onChange={(e) => handleInputChange(service.id, 'quantity', e.target.value)}
                                            min={service.min}
                                            max={service.max}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Rate: ₹{service.price}/1k</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
                <SheetFooter className="mt-auto border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Cost:</span>
                        <span className="font-headline text-primary text-2xl">₹{totalCost.toFixed(2)}</span>
                    </div>
                    <Button onClick={handlePlaceOrder} className="w-full" disabled={cart.length === 0}>
                        Place Order (₹{totalCost.toFixed(2)})
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
