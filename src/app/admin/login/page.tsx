
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AtSign, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would verify these against a secure backend.
    if (email === 'admin@wetube.com' && password === 'admin123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      toast({
        title: 'Login Successful',
        description: 'Welcome to the Admin Panel.',
      });
      router.push('/admin');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6 items-center gap-2 text-primary">
            <Shield className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline tracking-tighter">
                WeTube Admin
            </span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
            <CardDescription>Please enter your credentials to continue.</CardDescription>
          </CardHeader>
          <form onSubmit={handleAdminLogin}>
            <CardContent className="space-y-4">
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardContent>
              <Button type="submit" className="w-full">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </main>
  );
}
