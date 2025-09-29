'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dummyUser } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { BadgeIndianRupee, Mail, Smartphone, User, UserPlus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function ProfilePage() {
    const { toast } = useToast();
    const [role, setRole] = useState(dummyUser.role);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Updated",
            description: "Your information has been saved successfully.",
        });
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                 <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="name" defaultValue={dummyUser.name} className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email / Mobile</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="email" defaultValue={dummyUser.email} className="pl-10" />
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                 <div className="relative">
                                    <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="upiId" defaultValue={dummyUser.upiId} placeholder="your-upi-id@okhdfcbank" className="pl-10" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="referralCode">Your Referral Code</Label>
                                <div className="relative">
                                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input id="referralCode" value={dummyUser.referralCode} readOnly className="pl-10" />
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
