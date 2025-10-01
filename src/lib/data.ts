
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
    // YouTube Samples (9)
    { id: 'SAMPLE-YT-VIEW-1', userId: 'sample-user', user: 'Music Mogul', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quantity: 5000, amount: 600, status: 'in progress', date: new Date().toISOString(), progress: 10 },
    { id: 'SAMPLE-YT-VIEW-2', userId: 'sample-user', user: 'Tech Guru', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', quantity: 10000, amount: 1200, status: 'in progress', date: new Date().toISOString(), progress: 25 },
    { id: 'SAMPLE-YT-VIEW-3', userId: 'sample-user', user: 'Gamer God', service: 'YouTube Views', link: 'https://www.youtube.com/watch?v=F-Rj2F0oTfA', quantity: 2000, amount: 240, status: 'in progress', date: new Date().toISOString(), progress: 50 },
    { id: 'SAMPLE-YT-LIKE-1', userId: 'sample-user', user: 'Comedy Central', service: 'YouTube Likes', link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', quantity: 500, amount: 60, status: 'in progress', date: new Date().toISOString(), progress: 75 },
    { id: 'SAMPLE-YT-LIKE-2', userId: 'sample-user', user: 'DIY Queen', service: 'YouTube Likes', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', quantity: 1000, amount: 120, status: 'in progress', date: new Date().toISOString(), progress: 5 },
    { id: 'SAMPLE-YT-SUB-1', userId: 'sample-user', user: 'Science Wiz', service: 'YouTube Subscribers', link: 'https://www.youtube.com/@Google', quantity: 100, amount: 120, status: 'in progress', date: new Date().toISOString(), progress: 90 },
    { id: 'SAMPLE-YT-SUB-2', userId: 'sample-user', user: 'Travel Vlogger', service: 'YouTube Subscribers', link: 'https://www.youtube.com/@mkbhd', quantity: 200, amount: 240, status: 'in progress', date: new Date().toISOString(), progress: 20 },
    { id: 'SAMPLE-YT-COMMENT-1', userId: 'sample-user', user: 'Foodie Fanatic', service: 'YouTube Comments', link: 'https://www.youtube.com/watch?v=F-Rj2F0oTfA', quantity: 100, amount: 50, status: 'in progress', date: "2024-08-01T12:00:00.000Z", progress: 0 },
    { id: 'SAMPLE-YT-COMMENT-2', userId: 'sample-user', user: 'Fitness Pro', service: 'YouTube Comments', link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', quantity: 50, amount: 25, status: 'in progress', date: "2024-08-02T12:00:00.000Z", progress: 0 },
    
    // Facebook Samples (9)
    { id: 'SAMPLE-FB-LIKE-1', userId: 'sample-user', user: 'Local Bakery', service: 'Facebook Page Likes', link: 'https://www.facebook.com/facebook/', quantity: 500, amount: 400, status: 'in progress', date: new Date().toISOString(), progress: 30 },
    { id: 'SAMPLE-FB-LIKE-2', userId: 'sample-user', user: 'Fashion Boutique', service: 'Facebook Page Likes', link: 'https://www.facebook.com/meta/', quantity: 300, amount: 240, status: 'in progress', date: new Date().toISOString(), progress: 60 },
    { id: 'SAMPLE-FB-LIKE-3', userId: 'sample-user', user: 'Pet Store', service: 'Facebook Page Likes', link: 'https://www.facebook.com/instagram/', quantity: 400, amount: 320, status: 'in progress', date: new Date().toISOString(), progress: 15 },
    { id: 'SAMPLE-FB-FOLLOW-1', userId: 'sample-user', user: 'Indie Artist', service: 'Facebook Followers', link: 'https://www.facebook.com/profile.php?id=100044133318255', quantity: 500, amount: 425, status: 'in progress', date: new Date().toISOString(), progress: 45 },
    { id: 'SAMPLE-FB-FOLLOW-2', userId: 'sample-user', user: 'Life Coach', service: 'Facebook Followers', link: 'https://www.facebook.com/zuck', quantity: 1000, amount: 850, status: 'in progress', date: new Date().toISOString(), progress: 80 },
    { id: 'SAMPLE-FB-FOLLOW-3', userId: 'sample-user', user: 'Book Author', service: 'Facebook Followers', link: 'https://www.facebook.com/BillGates', quantity: 250, amount: 212.5, status: 'in progress', date: new Date().toISOString(), progress: 5 },
    { id: 'SAMPLE-FB-VIEWS-1', userId: 'sample-user', user: 'Movie Trailers', service: 'Facebook Video Views', link: 'https://www.facebook.com/watch/?v=1943031469145509', quantity: 10000, amount: 1000, status: 'in progress', date: new Date().toISOString(), progress: 55 },
    { id: 'SAMPLE-FB-VIEWS-2', userId: 'sample-user', user: 'Cooking Show', service: 'Facebook Video Views', link: 'https://www.facebook.com/watch/?v=10156229442387139', quantity: 5000, amount: 500, status: 'in progress', date: new Date().toISOString(), progress: 22 },
    { id: 'SAMPLE-FB-VIEWS-3', userId: 'sample-user', user: 'Travel Diaries', service: 'Facebook Video Views', link: 'https://www.facebook.com/watch/?v=3084364995123380', quantity: 20000, amount: 2000, status: 'in progress', date: new Date().toISOString(), progress: 70 },
    
    // Instagram Samples (9)
    { id: 'SAMPLE-IG-REEL-1', userId: 'sample-user', user: 'Influencer', service: 'Instagram Reel Views', link: 'https://www.instagram.com/reels/C2Y8c8cyoX_/', quantity: 10000, amount: 800, status: 'in progress', date: new Date().toISOString(), progress: 65 },
    { id: 'SAMPLE-IG-REEL-2', userId: 'sample-user', user: 'Dance Crew', service: 'Instagram Reel Views', link: 'https://www.instagram.com/reel/C8q4J4UN2B4/', quantity: 50000, amount: 4000, status: 'in progress', date: new Date().toISOString(), progress: 10 },
    { id: 'SAMPLE-IG-REEL-3', userId: 'sample-user', user: 'Skateboarder', service: 'Instagram Reel Views', link: 'https://www.instagram.com/reel/C8o7oV9t1yB/', quantity: 25000, amount: 2000, status: 'in progress', date: new Date().toISOString(), progress: 33 },
    { id: 'SAMPLE-IG-FOLLOW-1', userId: 'sample-user', user: 'Photographer', service: 'Instagram Followers', link: 'https://www.instagram.com/instagram/', quantity: 200, amount: 180, status: 'in progress', date: new Date().toISOString(), progress: 85 },
    { id: 'SAMPLE-IG-FOLLOW-2', userId: 'sample-user', user: 'Meme Page', service: 'Instagram Followers', link: 'https://www.instagram.com/nasa/', quantity: 1000, amount: 900, status: 'in progress', date: new Date().toISOString(), progress: 40 },
    { id: 'SAMPLE-IG-FOLLOW-3', userId: 'sample-user', user: 'Startup', service: 'Instagram Followers', link: 'https://www.instagram.com/google/', quantity: 500, amount: 450, status: 'in progress', date: new Date().toISOString(), progress: 12 },
    { id: 'SAMPLE-IG-LIKE-1', userId: 'sample-user', user: 'Food Blogger', service: 'Instagram Likes', link: 'https://www.instagram.com/p/C8uJ6X5y9i8/', quantity: 1000, amount: 150, status: 'in progress', date: new Date().toISOString(), progress: 95 },
    { id: 'SAMPLE-IG-LIKE-2', userId: 'sample-user', user: 'Car Enthusiast', service: 'Instagram Likes', link: 'https://www.instagram.com/p/C8s_yX6A-gZ/', quantity: 500, amount: 75, status: 'in progress', date: new Date().toISOString(), progress: 50 },
    { id: 'SAMPLE-IG-LIKE-3', userId: 'sample-user', user: 'Art Gallery', service: 'Instagram Likes', link: 'https://www.instagram.com/p/C8t8o3-hL4E/', quantity: 2000, amount: 300, status: 'in progress', date: new Date().toISOString(), progress: 28 },

    // App/Google Samples
    { id: 'SAMPLE-APP-DOWNLOAD-1', userId: 'sample-user', user: 'New Game Studio', service: 'App Downloads', link: 'https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox', quantity: 100, amount: 200, status: 'in progress', date: new Date().toISOString(), progress: 5 },
    { id: 'SAMPLE-GOOGLE-REVIEW-1', userId: 'sample-user', user: 'Local Restaurant', service: 'Google Reviews', link: 'https://www.google.com/maps/place/Eiffel+Tower', quantity: 50, amount: 150, status: 'in progress', date: new Date().toISOString(), progress: 88 }
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


