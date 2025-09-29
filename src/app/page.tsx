'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AtSign, KeyRound, ArrowRight, Users, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Logo from '@/components/logo';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('earner');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    localStorage.setItem('userRole', role);
    localStorage.setItem('welcomeShown', 'false');
    router.push('/dashboard');
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy signup logic
    localStorage.setItem('userRole', role);
    localStorage.setItem('welcomeShown', 'false');
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login"><Users className="mr-2 h-4 w-4" />Login</TabsTrigger>
            <TabsTrigger value="signup"><UserPlus className="mr-2 h-4 w-4" />Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email-login" type="email" placeholder="Email or Mobile Number" className="pl-10" required />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password-login" type="password" placeholder="Password" className="pl-10" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                <CardDescription>Join us! Registration is by referral only.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                   <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email-signup" type="email" placeholder="Email or Mobile Number" className="pl-10" required />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password-signup" type="password" placeholder="Password" className="pl-10" required />
                  </div>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="referral" type="text" placeholder="Referral Code" className="pl-10" required />
                  </div>
                  <div>
                    <Label className="mb-2 block">I am an:</Label>
                    <RadioGroup defaultValue="earner" value={role} onValueChange={setRole} className="flex space-x-4">
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
                <CardFooter>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
