
import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask, SupportTicket, InstagramReelTask } from './types';
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

export const advertiserServices: AdvertiserService[] = [
  // YouTube
  { id: 'yt-subs', serviceName: 'YouTube Subscribers', platform: 'youtube', name: 'Subscribers', price: 1200, unit: 'per 1k', icon: UserPlus, min: 100, max: 10000 },
  { id: 'yt-views', serviceName: 'YouTube Views', platform: 'youtube', name: 'YouTube Views', price: 120, unit: 'per 1k', icon: Eye, min: 1000, max: 1000000 },
  { id: 'yt-likes', serviceName: 'YouTube Likes', platform: 'youtube', name: 'Likes', price: 120, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 50000 },
  { id: 'yt-watchtime', serviceName: 'YouTube Watch Time', platform: 'youtube', name: 'Watch Time (Hours)', price: 1000, unit: 'per 1k', icon: Rocket, min: 100, max: 4000 },
  { id: 'yt-comments', serviceName: 'YouTube Comments', platform: 'youtube', name: 'Comments', price: 500, unit: 'per 1k', icon: MessageSquare, min: 100, max: 10000 },
  // Facebook
  { id: 'fb-likes', serviceName: 'Facebook Page Likes', platform: 'facebook', name: 'Page Likes', price: 800, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 100000 },
  { id: 'fb-followers', serviceName: 'Facebook Followers', platform: 'facebook', name: 'Followers', price: 850, unit: 'per 1k', icon: UserPlus, min: 500, max: 100000 },
  { id: 'fb-views', serviceName: 'Facebook Video Views', platform: 'facebook', name: 'Video Views', price: 100, unit: 'per 1k', icon: Eye, min: 1000, max: 1000000 },
   // Instagram
  { id: 'ig-followers', serviceName: 'Instagram Followers', platform: 'instagram', name: 'Followers', price: 900, unit: 'per 1k', icon: UserPlus, min: 500, max: 50000 },
  { id: 'ig-likes', serviceName: 'Instagram Likes', platform: 'instagram', name: 'Post Likes', price: 150, unit: 'per 1k', icon: ThumbsUp, min: 500, max: 100000 },
  { id: 'ig-views', serviceName: 'Instagram Reel Views', platform: 'instagram', name: 'Video/Reel Views', price: 80, unit: 'per 1k', icon: Eye, min: 1000, max: 2000000 },
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

export const initialOrders = [];
