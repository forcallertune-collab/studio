
import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask, SupportTicket, InstagramReelTask, Order } from './types';
import { Eye, ThumbsUp, UserPlus, MessageSquare, Rocket, Facebook, Instagram, Download, Star } from 'lucide-react';

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
  // App Downloads
  { id: 'app-downloads', serviceName: 'App Downloads', platform: 'app', name: 'App Downloads', price: 2000, unit: 'per 1k', icon: Download, min: 100, max: 10000 },
  // Google Reviews
  { id: 'google-reviews', serviceName: 'Google Reviews', platform: 'google', name: 'Google Reviews', price: 3000, unit: 'per 1k', icon: Star, min: 50, max: 5000 },
];

export const initialSupportTickets: SupportTicket[] = [];

export const initialOrders: Order[] = [
    // 9 Sample orders for all platforms
    { id: 'SAMPLE-YT-VIEW-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quantity: 1000, amount: 120, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-YT-LIKE-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'YouTube Likes', link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', quantity: 500, amount: 60, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-YT-SUB-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'YouTube Subscribers', link: 'https://www.youtube.com/@Google', quantity: 100, amount: 120, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-YT-COMMENT-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'YouTube Comments', link: 'https://www.youtube.com/watch?v=VIDEO_ID_FOR_COMMENTS', quantity: 100, amount: 50, status: 'in progress', date: new "2024-08-01T12:00:00.000Z", progress: 0 },
    { id: 'SAMPLE-FB-LIKE-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'Facebook Page Likes', link: 'https://www.facebook.com/facebook/', quantity: 500, amount: 400, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-FB-FOLLOW-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'Facebook Followers', link: 'https://www.facebook.com/profile.php?id=100044133318255', quantity: 500, amount: 425, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-IG-REEL-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'Instagram Reel Views', link: 'https://www.instagram.com/reels/C2Y8c8cyoX_/', quantity: 1000, amount: 80, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-APP-DOWNLOAD-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'App Downloads', link: 'https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox', quantity: 100, amount: 200, status: 'in progress', date: new Date().toISOString(), progress: 0 },
    { id: 'SAMPLE-GOOGLE-REVIEW-1', userId: 'sample-user', user: 'Sample Advertiser', service: 'Google Reviews', link: 'https://www.google.com/maps/place/Eiffel+Tower', quantity: 50, amount: 150, status: 'in progress', date: new Date().toISOString(), progress: 0 }
];


export const referralChartData = [
  { referrals: 10, earnings: 150 },
  { referrals: 20, earnings: 350 },
  { referrals: 30, earnings: 600 },
  { referrals: 40, earnings: 800 },
  { referrals: 50, earnings: 1200 },
  { referrals: 60, earnings: 1500 },
  { referrals: 70, earnings: 1800 },
  { referrals: 80, earnings: 2200 },
  { referrals: 90, earnings: 2500 },
  { referrals: 100, earnings: 3000 },
]

