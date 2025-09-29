'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Gift, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type WelcomeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  referralCode: string;
};

export default function WelcomeDialog({ isOpen, onClose, username, referralCode }: WelcomeDialogProps) {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (isOpen) {
        setReferralLink(`${window.location.origin}/?ref=${referralCode}`);
    }
  }, [isOpen, referralCode]);

  const copyReferralLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Copied to clipboard!',
      description: 'Your referral link is ready to be shared.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Gift className="h-6 w-6 text-primary" />
            Welcome to WeTube, {username}!
          </DialogTitle>
          <DialogDescription>
            Watch videos, earn money, and enjoy with family & friends.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Share your referral link to earn</p>
          <p className="text-2xl font-bold text-accent-foreground">₹25 for each new member!</p>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p className="text-sm font-semibold">Your Referral Code:</p>
            <div className="flex items-center justify-between rounded-md border bg-muted px-3 py-2">
                <span className="font-mono text-primary">{referralCode}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={onClose}>
            Start Earning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
