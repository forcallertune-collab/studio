
'use client';

import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BadgeIndianRupee, Mail, User, UserPlus, Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserContext } from "../layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Local state for form inputs, initialized from context
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [upiId, setUpiId] = useState(user?.upiId || '');
    const [role, setRole] = useState(user?.role || 'earner');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

    // Effect to update local state if the user context changes from elsewhere
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setUpiId(user.upiId || '');
            setRole(user.role);
            setAvatarUrl(user.avatarUrl || '');
        }
    }, [user]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Update the central context. This will trigger the save effect in layout.tsx.
        if (setUser && user) {
             setUser(prevUser => {
                if (!prevUser) return null;
                return {
                    ...prevUser,
                    name,
                    email,
                    upiId,
                    role,
                    avatarUrl,
                }
            });
        }

        toast({
            title: "Profile Updated",
            description: "Your information has been saved successfully.",
        });

        router.push('/dashboard');
    }

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className="grid gap-6">
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">My Profile</CardTitle>
                        <CardDescription>Update your personal information and payment details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={avatarUrl} alt={name} />
                                <AvatarFallback>{name ? name.charAt(0) : ''}</AvatarFallback>
                            </Avatar>
                             <div className="w-full space-y-2">
                                <Label>Profile Picture</Label>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Image
                                </Button>
                                <p className="text-xs text-muted-foreground">Select an image from your device.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                 <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email / Mobile</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                 <div className="relative">
                                    <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="upiId" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="your-upi-id@okhdfcbank" className="pl-10" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="referralCode">Your Referral Code</Label>
                                <div className="relative">
                                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="referralCode" value={user.referralCode} readOnly className="pl-10" />
                                </div>
                            </div>
                        </div>
                         <div>
                            <Label className="mb-2 block">My Role</Label>
                            <RadioGroup value={role} onValueChange={(value) => setRole(value as any)} className="flex space-x-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="earner" id="r-earner" />
                                <Label htmlFor="r-earner">Earner</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="advertiser" id="r-advertiser" />
                                <Label htmlFor="r-advertiser">Advertiser</Label>
                              </div>
                               <div className="flex items-center space-x-2">
                                <RadioGroupItem value="both" id="r-both" />
                                <Label htmlFor="r-both">Both</Label>
                              </div>
                            </RadioGroup>
                          </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
