
import type { User, VideoTask, SubscriptionTask, LikeTask, CommentTask, AdvertiserService, FacebookLikeTask, FacebookFollowTask, SupportTicket, InstagramReelTask } from './types';
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

export const initialOrders = [];
