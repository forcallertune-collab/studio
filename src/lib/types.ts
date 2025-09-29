export type User = {
  name: string;
  email: string;
  role: 'earner' | 'advertiser' | 'both';
  referralCode: string;
  walletBalance: number;
  upiId?: string;
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
  url: string;
  reward: number;
};

export type FacebookFollowTask = {
  id: string;
  pageName: string;
  url: string;
  reward: number;
};

export type AdvertiserService = {
  id: string;
  name: string;
  price: string;
  unit: string;
  icon: React.ElementType;
};
