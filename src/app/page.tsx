
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';
import { ArrowRight, CheckCircle, Users, BarChart, Megaphone, X } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const features = [
    {
        icon: Users,
        title: "Build Your Team",
        description: "Invite friends and build your network to earn a lifetime 10% commission from their earnings."
    },
    {
        icon: BarChart,
        title: "Boost Your Content",
        description: "Promote your social media channels and videos to a massive, engaged audience at competitive prices."
    },
    {
        icon: CheckCircle,
        title: "Simple & Reliable Tasks",
        description: "Complete easy tasks like watching videos, subscribing, and liking content to earn money daily."
    },
]

export default function WelcomePage() {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    const savedAnnouncement = localStorage.getItem('sociara-announcement');
    if (savedAnnouncement) {
      setAnnouncement(savedAnnouncement);
    }
  }, []);


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/about">About Us</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {announcement && (
          <div className="container mx-auto px-4 pt-6">
            <Alert>
              <Megaphone className="h-4 w-4" />
              <AlertTitle>Announcement</AlertTitle>
              <AlertDescription>
                {announcement}
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
             <div 
                aria-hidden="true" 
                className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary tracking-tighter">
                   Earn Money by Completing Simple Social Media Tasks.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                    Join thousands of users in India who are achieving financial independence from home. Watch videos, subscribe to channels, and get paid. It's that simple.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/login">Start Earning Now <ArrowRight className="ml-2" /></Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard/advertiser">Promote Your Content</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
                    <p className="text-muted-foreground mt-2">A simple platform for both earners and advertisers.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <CardContent className="p-6 text-center">
                                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to Change Your Financial Future?</h2>
                <p className="text-muted-foreground mb-8">Join the Sociara community today. It's free to sign up!</p>
                <Button size="lg" asChild>
                    <Link href="/login">Join for Free <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sociara. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
