

export type Transaction = {
  id: string;
  type: 'recharge' | 'withdrawal' | 'task_earning';
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  date: string;
  description: string;
};

export type User = {
  userId: string; // Add a stable user ID
  name: string;
  email: string;
  password?: string; // Should be hashed in a real app
  role: 'earner' | 'advertiser' | 'both';
  referralCode: string;
  walletBalance: number;
  upiId?: string;
  avatarUrl?: string;
  transactions?: Transaction[];
};

export type VideoTask = {
  id: string;
  title: string;
  url: string;
  reward: number;
};

export type SubscriptionTask = {
  id: string;
  channelName: string;
  url: string;
  reward: number;
};

export type LikeTask = {
  id: string;
  videoTitle: string;
  url: string;
  reward: number;
};

export type CommentTask = {
  id: string;
  videoTitle: string;
  url: string;
  reward: number;
  templates: string[];
};

export type FacebookLikeTask = {
  id: string;
  pageName: string;
  url:string;
  reward: number;
};

export type FacebookFollowTask = {
  id: string;
  pageName: string;
  url: string;
  reward: number;
};

export type InstagramReelTask = {
  id: string;
  reelTitle: string;
  url: string;
  reward: number;
};

export type AppDownloadTask = {
  id: string;
  appName: string;
  url: string;
  reward: number;
};

export type Platform = 'youtube' | 'facebook' | 'instagram' | 'app';

export type AdvertiserService = {
  id: string;
  platform: Platform;
  name: string;
  serviceName: string; // Add a more descriptive service name
  price: number; // Price per 1000
  unit: string;
  icon: React.ElementType;
  min: number;
  max: number;
};

export type SupportTicket = {
  id: string;
  subject: string;
  status: 'open' | 'closed';
  lastUpdated: string;
};

export type PaymentRequest = {
    id: string;
    userId: string; // Use the stable userId instead of email
    userEmail: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
}

export type WithdrawalRequest = {
    id: string;
    userId: string;
    userEmail: string;
    amount: number;
    upiId: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
};
