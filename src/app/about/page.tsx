
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
       <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
            <Logo />
            <Button asChild>
                <Link href="/">Join Now</Link>
            </Button>
        </div>
       </header>

       <main className="container mx-auto py-12 px-4">
        <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">About Sociara</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Empowering individuals across India to achieve financial independence through simple, accessible social media tasks.
            </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                    Our goal is to create a reliable platform that connects advertisers with a vast network of users, providing a mutually beneficial ecosystem. We believe in the power of the gig economy and aim to provide legitimate work-from-home opportunities for everyone.
                </p>
                <p className="text-muted-foreground">
                    Join us and become a part of a growing community. Build your team, increase your income, and work towards a brighter financial future, all from the comfort of your home.
                </p>
            </div>
            <div>
                <Image 
                    src={placeholderImages.placeholderImages[3].imageUrl}
                    alt="Our Vision"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint={placeholderImages.placeholderImages[3].imageHint}
                />
            </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
             <div>
                <Image 
                    src={placeholderImages.placeholderImages[4].imageUrl}
                    alt="Our Community"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint={placeholderImages.placeholderImages[4].imageHint}
                />
            </div>
            <div>
                <h2 className="text-3xl font-bold font-headline mb-4">How It Works</h2>
                <p className="text-muted-foreground mb-4">
                    <strong>For Earners:</strong> Sign up, complete simple tasks like watching videos, subscribing to channels, and liking content. Earn money for each task and get paid directly to your account. Grow your income by building a referral network and earn a lifetime 10% commission from your team's earnings.
                </p>
                <p className="text-muted-foreground">
                    <strong>For Advertisers:</strong> Reach a massive, engaged audience to promote your YouTube channels, videos, apps, and more. Get real engagement from real users at competitive prices.
                </p>
            </div>
        </section>

         <section className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of others and start your earning journey today!</p>
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/">Sign Up & Earn</Link>
            </Button>
        </section>

       </main>
    </div>
  );
}
