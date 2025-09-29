'use client';

import { useState } from 'react';
import type { LikeTask, SubscriptionTask, CommentTask } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, UserPlus, MessageSquare, ExternalLink } from 'lucide-react';
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

type TaskType = 'like' | 'subscribe' | 'comment';

type Task = LikeTask | SubscriptionTask | CommentTask;

type YoutubeOtherTasksProps = {
  type: TaskType;
  tasks: Task[];
};

const typeConfig = {
  like: {
    title: 'Like Videos',
    description: 'Like these videos to earn ₹0.50 per like.',
    icon: ThumbsUp,
    actionText: 'Like Video',
  },
  subscribe: {
    title: 'Subscribe to Channels',
    description: 'Subscribe to these channels to earn ₹1.00 per subscription.',
    icon: UserPlus,
    actionText: 'Subscribe',
  },
  comment: {
    title: 'Comment on Videos',
    description: 'Post an approved comment on these videos to earn ₹0.50.',
    icon: MessageSquare,
    actionText: 'Add Comment',
  },
};

const CommentDialog = ({ task }: { task: CommentTask }) => {
    const { toast } = useToast();
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await moderateYouTubeComments({ comment, templates: task.templates });
            if (result.isApproved) {
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


export default function YoutubeOtherTasks({ type, tasks }: YoutubeOtherTasksProps) {
  const config = typeConfig[type];

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
            {tasks.slice(0, 10).map((task) => ( // Show first 10 for demo
              <div key={task.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {type === 'subscribe' ? (task as SubscriptionTask).channelName : (task as LikeTask | CommentTask).videoTitle}
                  </p>
                  <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                </div>
                {type === 'comment' ? (
                   <CommentDialog task={task as CommentTask} />
                ) : (
                  <Button asChild size="sm">
                    <a href={task.url} target="_blank" rel="noopener noreferrer">
                      {config.actionText} <ExternalLink className="ml-2 h-4 w-4"/>
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
