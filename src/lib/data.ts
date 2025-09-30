
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

export const facebookLikeTasks: FacebookLikeTask[] = [
  { id: 'fbl-1', pageName: 'Creative Minds', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-2', pageName: 'Tech Updates', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-3', pageName: 'Gamer\'s Hub', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-4', pageName: 'Foodies Corner', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-5', pageName: 'Travel Escapes', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-6', pageName: 'Fitness World', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-7', pageName: 'Startup Stories', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-8', pageName: 'Movie Buffs', url: 'https://www.facebook.com/facebook', reward: 0.50 },
  { id: 'fbl-9', pageName: 'Music Lovers', url: 'https://www.facebook.com/facebook', reward: 0.50 },
];

export const facebookFollowTasks: FacebookFollowTask[] = [
  { id: 'fbf-1', pageName: 'Digital Creator', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-2', pageName: 'Influencer Insights', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-3', pageName: 'Public Figure Official', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-4', pageName: 'Tech Guru', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-5', pageName: 'Artist\'s Profile', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-6', pageName: 'Entrepreneur Talks', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-7', pageName: 'Comedy King', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-8', pageName: 'Fashion Icon', url: 'https://www.facebook.com/facebook', reward: 1.00 },
  { id: 'fbf-9', pageName: 'Health & Wellness Coach', url: 'https://www.facebook.com/facebook', reward: 1.00 },
];

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
    { id: 'ORD-001', user: 'Advertiser One', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quantity: 10000, amount: 1200.00, status: 'in progress' as const, date: '2024-07-29'},
    { id: 'ORD-002', user: 'Advertiser Two', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=3JZ_D3p3Q2Q', quantity: 5000, amount: 600.00, status: 'in progress' as const, date: '2024-07-28'},
    { id: 'ORD-003', user: 'Advertiser Three', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=9bZkp7q19f0', quantity: 20000, amount: 2400.00, status: 'in progress' as const, date: '2024-07-27'},
    { id: 'ORD-004', user: 'Advertiser Four', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=Y-x0efG1seA', quantity: 15000, amount: 1800.00, status: 'in progress' as const, date: '2024-07-26'},
    { id: 'ORD-005', user: 'Advertiser Five', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', quantity: 50000, amount: 6000.00, status: 'in progress' as const, date: '2024-07-25'},
    { id: 'ORD-006', user: 'Advertiser Six', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=C0DPdy98e4c', quantity: 2000, amount: 240.00, status: 'in progress' as const, date: '2024-07-24'},
    { id: 'ORD-007', user: 'Advertiser Seven', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=pXRviuL6vMY', quantity: 8000, amount: 960.00, status: 'in progress' as const, date: '2024-07-23'},
    { id: 'ORD-008', user: 'Advertiser Eight', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=taken_yv-2g', quantity: 12000, amount: 1440.00, status: 'in progress' as const, date: '2024-07-22'},
    { id: 'ORD-009', user: 'Advertiser Nine', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=0-7IHOXkiV8', quantity: 3000, amount: 360.00, status: 'in progress' as const, date: '2024-07-21'},
    { id: 'ORD-010', user: 'Advertiser Ten', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=ru0K8uYEbDE', quantity: 1000, amount: 120.00, status: 'in progress' as const, date: '2024-07-20'},
    { id: 'ORD-011', user: 'Advertiser Eleven', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=6-HUgzYPm9g', quantity: 7500, amount: 900.00, status: 'in progress' as const, date: '2024-07-19'},
    { id: 'ORD-012', user: 'Advertiser Twelve', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=hT_nvWreIhg', quantity: 25000, amount: 3000.00, status: 'in progress' as const, date: '2024-07-18'},
];
