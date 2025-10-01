
'use client';

import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import type { LikeTask, SubscriptionTask, CommentTask, Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, UserPlus, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { moderateYouTubeComments } from '@/ai/flows/moderate-youtube-comments';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';
import { initialOrders } from '@/lib/data';

type TaskType = 'like' | 'subscribe' | 'comment';

type Task = LikeTask | SubscriptionTask | CommentTask;

type YoutubeOtherTasksProps = {
  type: TaskType;
};

const typeConfig = {
  like: {
    title: 'Like Videos',
    description: 'Like these videos to earn ₹0.50 per like.',
    icon: ThumbsUp,
    actionText: 'Like Video',
    serviceName: 'YouTube Likes',
    reward: 0.50,
  },
  subscribe: {
    title: 'Subscribe to Channels',
    description: 'Subscribe to these channels to earn ₹1.00 per subscription.',
    icon: UserPlus,
    actionText: 'Subscribe',
    serviceName: 'YouTube Subscribers',
    reward: 1.00,
  },
  comment: {
    title: 'Comment on Videos',
    description: 'Post an approved comment on these videos to earn ₹0.50.',
    icon: MessageSquare,
    actionText: 'Add Comment',
    serviceName: 'YouTube Comments',
    reward: 0.50,
  },
};

const getYouTubeVideoId = (url: string) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        if (urlObj.hostname.includes('youtube.com')) {
            return urlObj.searchParams.get('v');
        }
        return null;
    } catch (e) {
        return null;
    }
}

const VideoActionDialog = ({ task, onComplete, children, type }: { task: Task; onComplete: (taskId: string) => void; children: React.ReactNode; type: TaskType }) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const { setWalletBalance } = useContext(WalletContext);
    const { incrementTaskCount } = useContext(TaskContext);
    
    const videoId = getYouTubeVideoId(task.url);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    const title = 'videoTitle' in task ? task.videoTitle : ('channelName' in task ? task.channelName : '');
    const { actionText, reward } = typeConfig[type];

    const handleAction = () => {
        setWalletBalance(prev => prev + reward);
        incrementTaskCount();
        onComplete(task.id);
        toast({
            title: 'Task Complete!',
            description: `You've earned ₹${reward.toFixed(2)}.`,
        });

        // Open YouTube link in a new tab
        window.open(task.url, '_blank');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                     <DialogDescription>
                        Watch the video, then click the button below to go to YouTube and complete the action.
                    </DialogDescription>
                </DialogHeader>
                {embedUrl ? (
                     <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                         <iframe
                            key={task.id}
                            src={embedUrl}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                     </div>
                ) : <p>Could not load video preview.</p>}
                <DialogFooter>
                    <Button onClick={handleAction}>
                        Go to YouTube & {actionText} <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const CommentDialog = ({ task, onComplete }: { task: CommentTask, onComplete: (taskId: string) => void }) => {
    const { toast } = useToast();
    const { setWalletBalance } = useContext(WalletContext);
    const { incrementTaskCount } = useContext(TaskContext);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await moderateYouTubeComments({ comment, templates: task.templates });
            if (result.isApproved) {
                setWalletBalance(prev => prev + task.reward);
                incrementTaskCount();
                onComplete(task.id);
                toast({
                    title: "Comment Approved!",
                    description: `You've earned ₹${task.reward.toFixed(2)}.`,
                });
                setIsOpen(false);
            } else {
                 toast({
                    title: "Comment Not Approved",
                    description: "Please use one of the approved templates.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "An error occurred",
                description: "Could not verify your comment. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm">{typeConfig.comment.actionText}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comment on: {task.videoTitle}</DialogTitle>
                    <DialogDescription>
                        Copy one of the templates below and paste it in the YouTube comments section. Then, paste your comment here for verification.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Approved Templates</Label>
                        <div className="p-2 border rounded-md bg-muted/50 space-y-1 text-sm">
                            {task.templates.map((t, i) => <p key={i}>"{t}"</p>)}
                        </div>
                    </div>
                     <a href={task.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        Open YouTube Video <ExternalLink className="h-4 w-4" />
                    </a>
                    <div>
                        <Label htmlFor="comment-input">Paste Your Comment for Verification</Label>
                        <Textarea id="comment-input" value={comment} onChange={e => setComment(e.target.value)} placeholder="Paste your comment here..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isLoading || !comment}>
                        {isLoading ? 'Verifying...' : 'Verify & Earn'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};


export default function YoutubeOtherTasks({ type }: YoutubeOtherTasksProps) {
  const config = typeConfig[type];
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const loadTasks = useCallback(() => {
      const savedOrders = localStorage.getItem('adminOrders');
      const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : initialOrders;

      const dynamicTasks: Task[] = orders
          .filter((order) => order.service === config.serviceName && order.status === 'in progress')
          .map((order) => {
              const baseTask = {
                  id: order.id,
                  url: order.link,
                  reward: config.reward,
              };
              if (type === 'subscribe') {
                  return {
                      ...baseTask,
                      channelName: `Channel from ${order.user}`, // Placeholder
                  } as SubscriptionTask;
              } else if (type === 'like') {
                  return {
                      ...baseTask,
                      videoTitle: `Video from ${order.user}`, // Placeholder
                  } as LikeTask;
              } else { // comment
                   return {
                      ...baseTask,
                      videoTitle: `Video from ${order.user}`, // Placeholder
                      templates: ["Great video!", "Nice content!", "Awesome!"], // Default templates
                  } as CommentTask;
              }
          });
      
      setTasks(dynamicTasks);
  }, [config.serviceName, config.reward, type]);

  useEffect(() => {
      loadTasks();
      window.addEventListener('storage', loadTasks);
      return () => window.removeEventListener('storage', loadTasks);
  }, [loadTasks]);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set(prev).add(taskId));
  };


  const availableTasks = tasks.filter(task => !completedTasks.has(task.id));

  if (availableTasks.length === 0) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <config.icon /> {config.title}
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="text-center py-12 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground">No new {type} tasks available right now.</p>
                  </div>
              </CardContent>
          </Card>
      );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <config.icon /> {config.title}
        </CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <div className="divide-y">
            {availableTasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              return (
              <div key={task.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {type === 'subscribe' ? (task as SubscriptionTask).channelName : (task as LikeTask | CommentTask).videoTitle}
                  </p>
                  <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                </div>
                {isCompleted ? (
                   <div className="flex items-center gap-2 text-green-600 font-semibold text-sm pr-4">
                        <CheckCircle className="h-5 w-5" />
                        <span>Completed</span>
                    </div>
                ) : type === 'comment' ? (
                   <CommentDialog task={task as CommentTask} onComplete={handleTaskComplete} />
                ) : (
                  <VideoActionDialog task={task} onComplete={handleTaskComplete} type={type}>
                    <Button size="sm">
                      {config.actionText}
                    </Button>
                  </VideoActionDialog>
                )}
              </div>
            )})}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    
