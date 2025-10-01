
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AtSign, KeyRound, ArrowRight, Users, UserPlus, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from '@/components/logo';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';

function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupReferral, setSignupReferral] = useState('');
  const [role, setRole] = useState<'earner' | 'advertiser' | 'both'>('earner');

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      setSignupReferral(refCode);
    }
  }, [searchParams]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // On first signup, clear all previous local storage to ensure a fresh start
    if (!localStorage.getItem('users')) {
      localStorage.clear();
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    const emailExists = Object.values(users).some((u: any) => u.email === signupEmail);
    if (emailExists) {
        toast({
            title: "Signup Failed",
            description: "An account with this email already exists.",
            variant: "destructive"
        });
        return;
    }

    const userId = `user_${new Date().getTime()}`;
    const newUser: User = {
        userId,
        name: signupName,
        email: signupEmail,
        password: signupPassword, // In a real app, this should be hashed
        role: role,
        referralCode: `${signupName.split(' ')[0].toUpperCase()}${new Date().getFullYear()}`,
        walletBalance: 0.00,
    };

    users[userId] = newUser; // Use userId as the key
    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('loggedInUserId', userId); // Save userId instead of email
    localStorage.setItem('welcomeShown', 'false');
    
    toast({
        title: "Account Created!",
        description: "Welcome to Sociara!"
    });
    router.push('/dashboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>Join us to start your journey.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="name-signup" type="text" placeholder="Full Name" className="pl-10" required value={signupName} onChange={e => setSignupName(e.target.value)} />
          </div>
           <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="email-signup" type="email" placeholder="Email or Mobile Number" className="pl-10" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
          </div>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="password-signup" type="password" placeholder="Password" className="pl-10" required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
          </div>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="referral" type="text" placeholder="Referral Code (Optional)" className="pl-10" value={signupReferral} onChange={e => setSignupReferral(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2 block">I am an:</Label>
            <RadioGroup defaultValue="earner" value={role} onValueChange={(v) => setRole(v as any)} className="flex space-x-4">
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
  );
}

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = Object.values(users).find((u: any) => u.email === loginEmail && u.password === loginPassword) as User | undefined;

    if (user) {
      localStorage.setItem('loggedInUserId', user.userId); // Save userId instead of email
      localStorage.setItem('welcomeShown', 'false');
      router.push('/dashboard');
    } else {
        toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive"
        });
    }
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
                    <Input id="email-login" type="email" placeholder="Email or Mobile Number" className="pl-10" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password-login" type="password" placeholder="Password" className="pl-10" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
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
            <Suspense fallback={<div>Loading...</div>}>
              <SignupForm />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
