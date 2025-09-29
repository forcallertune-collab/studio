
import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask, SupportTicket } from './types';
import { Eye, ThumbsUp, UserPlus, MessageSquare, Rocket, Facebook, Instagram } from 'lucide-react';

export const dummyUser: User = {
  userId: 'dummy-user-01',
  name: 'Ankit Sharma',
  email: 'ankit.sharma@example.com',
  password: 'password123',
  role: 'both',
  referralCode: 'ANKIT2024',
  walletBalance: 1250.75,
  upiId: 'ankit.sharma@upi',
};

const videoUrls = [
  'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Big Buck Bunny
  'https://www.youtube.com/watch?v= பேர_vmjBBPE', // Sintel
  'https://www.youtube.com/watch?v=m-v-p-dJ7pA', // Elephants Dream
  'https://www.youtube.com/watch?v=t564ksd-uh8', // Tears of Steel
  'https://www.youtube.com/watch?v=zO8y1gWkffE', // Caminandes 2
];

export const youtubeViewTasks: VideoTask[] = Array.from({ length: 200 }, (_, i) => ({
  id: `view-${i + 1}`,
  title: `Watch and Earn Video ${i + 1}`,
  url: videoUrls[i % videoUrls.length], // Cycle through the videoUrls array
  reward: 0.75,
}));

export const youtubeSubscribeTasks: SubscriptionTask[] = Array.from({ length: 100 }, (_, i) => ({
  id: `sub-${i + 1}`,
  channelName: `Awesome Creator ${i + 1}`,
  url: `https://www.youtube.com/channel/example${i}`,
  reward: 1.0,
}));

export const youtubeLikeTasks: LikeTask[] = Array.from({ length: 100 }, (_, i) => ({
  id: `like-${i + 1}`,
  videoTitle: `Cool Video Clip ${i + 1}`,
  url: `https://www.youtube.com/watch?v=like_example${i}`,
  reward: 0.5,
}));

export const youtubeCommentTasks: CommentTask[] = Array.from({ length: 100 }, (_, i) => ({
  id: `comment-${i + 1}`,
  videoTitle: `Viral Moment ${i + 1}`,
  url: `https://www.youtube.com/watch?v=comment_example${i}`,
  reward: 0.5,
  templates: [
    "Wow, this is amazing!",
    "Great content, keep it up!",
    "I learned so much from this.",
    "This is so helpful, thank you!",
    "Can't wait for the next video!"
  ]
}));

export const facebookLikeTasks: FacebookLikeTask[] = Array.from({ length: 20 }, (_, i) => ({
    id: `fb-like-${i + 1}`,
    pageName: `Facebook Page ${i + 1}`,
    url: `https://www.facebook.com/example${i}`,
    reward: 0.5,
}));

export const facebookFollowTasks: FacebookFollowTask[] = Array.from({ length: 20 }, (_, i) => ({
    id: `fb-follow-${i + 1}`,
    pageName: `Influencer Profile ${i + 1}`,
    url: `https://www.facebook.com/example_follow${i}`,
    reward: 1.0,
}));

export const advertiserServices: AdvertiserService[] = [
  // YouTube
  { id: 'yt-subs', platform: 'youtube', name: 'Subscribers', price: 1200, unit: 'per 1k', icon: UserPlus, min: 100, max: 10000 },
  { id: 'yt-views', platform: 'youtube', name: 'Views', price: 120, unit: 'per 1k', icon: Eye, min: 1000, max: 1000000 },
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

export const initialSupportTickets: SupportTicket[] = [
    { id: 'TICKET-7A5B1C', subject: 'Withdrawal not processed', status: 'open', lastUpdated: '2024-07-28' },
    { id: 'TICKET-9D3E8F', subject: 'Referral bonus not credited', status: 'open', lastUpdated: '2024-07-27' },
    { id: 'TICKET-4G2H6I', subject: 'Account login issue', status: 'closed', lastUpdated: '2024-07-25' },
];

export const initialOrders = [
  { id: 'ORD-001', user: 'Amit Patel', service: 'YouTube Subscribers', amount: 1200, status: 'completed' as const, date: '2024-07-29' },
  { id: 'ORD-002', user: 'Priya Singh', service: 'Facebook Page Likes', amount: 400, status: 'in progress' as const, date: '2024-07-29' },
  { id: 'ORD-003', user: 'Rohan Gupta', service: 'Instagram Followers', amount: 900, status: 'completed' as const, date: '2024-07-28' },
  { id: 'ORD-004', user: 'Sneha Reddy', service: 'YouTube Views', amount: 240, status: 'pending' as const, date: '2024-07-28' },
  { id: 'ORD-005', user: 'Vikram Kumar', service: 'YouTube Watch Time', amount: 2000, status: 'cancelled' as const, date: '2024-07-27' },
];
