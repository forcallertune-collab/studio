
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, BarChart2 } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <main className="container mx-auto max-w-4xl text-center">
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome to <span className="text-primary font-bold">mhfl</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Watch YouTube videos, earn real money! Complete simple tasks and get paid for every action. New video player system with automatic rewards!
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-12 text-left">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                   <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Video Rewards</h3>
              </div>
              <p className="text-center text-muted-foreground mb-4">
                Watch videos for 30 seconds and earn instantly!
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Watch Videos: ₹0.75 per video (500/day)</li>
                <li>YouTube Likes: ₹0.5 per like</li>
                <li>YouTube Subscribe: ₹2 per subscription</li>
                <li>YouTube Comments: ₹0.75 per comment</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-4">
                 <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <BarChart2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">For Advertisers</h3>
              </div>
              <p className="text-center text-muted-foreground mb-4">
                Promote your content across multiple platforms!
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>YouTube promotion</li>
                <li>Facebook marketing</li>
                <li>Instagram growth</li>
                <li>Play Store reviews</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-10 py-6 text-lg">
            <Link href="/login">Start Earning - Watch Videos Now!</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            New! Automatic video player with timer - Just watch and earn!
          </p>
        </section>
      </main>
    </div>
  );
}
