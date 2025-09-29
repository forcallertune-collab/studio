import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask } from './types';
import { Eye, ThumbsUp, UserPlus, MessageSquare, BadgeIndianRupee, Rocket } from 'lucide-react';

export const dummyUser: User = {
  name: 'Ankit Sharma',
  email: 'ankit.sharma@example.com',
  role: 'both',
  referralCode: 'ANKIT2024',
  walletBalance: 1250.75,
  upiId: 'ankit.sharma@upi',
};

export const youtubeViewTasks: VideoTask[] = Array.from({ length: 200 }, (_, i) => ({
  id: `view-${i + 1}`,
  title: `Exciting Tech Review ${i + 1}`,
  url: `https://www.youtube.com/watch?v=example${i}`,
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
  { id: 'subs', name: 'Subscribers', price: '1200', unit: 'per 1k', icon: UserPlus },
  { id: 'views', name: 'Views', price: '120', unit: 'per 1k', icon: Eye },
  { id: 'likes', name: 'Likes', price: '120', unit: 'per 1k', icon: ThumbsUp },
  { id: 'watchtime', name: 'Watch Time', price: '1000', unit: 'per 1k hours', icon: Rocket },
  { id: 'comments', name: 'Comments', price: '500', unit: 'per 1k', icon: MessageSquare },
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
