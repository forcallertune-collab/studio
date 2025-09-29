'use client';

import type { FacebookLikeTask, FacebookFollowTask } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, UserPlus, ExternalLink } from 'lucide-react';

type TaskType = 'like' | 'follow';
type Task = FacebookLikeTask | FacebookFollowTask;

type FacebookTasksProps = {
  type: TaskType;
  tasks: Task[];
};

const typeConfig = {
  like: {
    title: 'Like Pages & Posts',
    description: 'Like these pages or posts to earn ₹0.50 per like.',
    icon: ThumbsUp,
    actionText: 'Like Page',
  },
  follow: {
    title: 'Follow Profiles',
    description: 'Follow these profiles to earn ₹1.00 per follow.',
    icon: UserPlus,
    actionText: 'Follow',
  },
};

export default function FacebookTasks({ type, tasks }: FacebookTasksProps) {
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
                    {task.pageName}
                  </p>
                  <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                </div>
                <Button asChild size="sm">
                  <a href={task.url} target="_blank" rel="noopener noreferrer">
                    {config.actionText} <ExternalLink className="ml-2 h-4 w-4"/>
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
