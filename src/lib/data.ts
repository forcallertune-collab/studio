
import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask, SupportTicket } from './types';
import { Eye, ThumbsUp, UserPlus, MessageSquare, Rocket, Facebook, Instagram } from 'lucide-react';

export const dummyUser: User = {
  userId: 'dummy-user-01',
  name: 'Ankit Sharma',
  email: 'ankit.sharma@example.com',
  password: 'password123',
  role: 'both',
  referralCode: 'ANKIT2024',
  walletBalance: 0.00,
  upiId: 'ankit.sharma@upi',
  avatarUrl: `https://i.pravatar.cc/150?u=ankit.sharma@example.com`,
};

export const youtubeSubscribeTasks: SubscriptionTask[] = [];

export const youtubeLikeTasks: LikeTask[] = [];

export const youtubeCommentTasks: CommentTask[] = [];

export const facebookLikeTasks: FacebookLikeTask[] = [];

export const facebookFollowTasks: FacebookFollowTask[] = [];

export const advertiserServices: AdvertiserService[] = [
  // YouTube
  { id: 'yt-subs', platform: 'youtube', name: 'Subscribers', price: 1200, unit: 'per 1k', icon: UserPlus, min: 100, max: 10000 },
  { id: 'yt-views', platform: 'youtube', name: 'YouTube Views', price: 120, unit: 'per 1k', icon: Eye, min: 1000, max: 1000000 },
  { id: 'yt-likes', platform: 'youtube', name: 'Likes', price: 120, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 50000 },
  { id: 'yt-watchtime', platform: 'youtube', name: 'Watch Time (Hours)', price: 1000, unit: 'per 1k', icon: Rocket, min: 100, max: 4000 },
  { id: 'yt-comments', platform: 'youtube', name: 'Comments', price: 500, unit: 'per 1k', icon: MessageSquare, min: 100, max: 10000 },
  // Facebook
  { id: 'fb-likes', platform: 'facebook', name: 'Page Likes', price: 800, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 100000 },
  { id: 'fb-followers', platform: 'facebook', name: 'Followers', price: 850, unit: 'per 1k', icon: UserPlus, min: 500, max: 100000 },
  { id: 'fb-views', platform: 'facebook', name: 'Video Views', price: 100, unit: 'per 1k', icon: Eye, min: 1000, max: 1000000 },
   // Instagram
  { id: 'ig-followers', platform: 'instagram', name: 'Followers', price: 900, unit: 'per 1k', icon: UserPlus, min: 500, max: 50000 },
  { id: 'ig-likes', platform: 'instagram', name: 'Post Likes', price: 150, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 100000 },
  { id: 'ig-views', platform: 'instagram', name: 'Video/Reel Views', price: 80, unit: 'per 1k', icon: Eye, min: 1000, max: 2000000 },
];

export const referralChartData = [
  { referrals: 10, earnings: 150 },
  { referrals: 20, earnings: 300 },
  { referrals: 30, earnings: 450 },
  { referrals: 40, earnings: 600 },
  { referrals: 50, earnings: 750 },
  { referrals: 60, earnings: 900 },
  { referrals: 70, earnings: 1050 },
];

export const initialSupportTickets: SupportTicket[] = [];

export const initialOrders = [
    {
        id: 'ORD-001',
        user: 'Advertiser One',
        service: 'YouTube Views',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        quantity: 10000,
        amount: 1200.00,
        status: 'in progress' as const,
        date: '2024-07-29',
    }
];
