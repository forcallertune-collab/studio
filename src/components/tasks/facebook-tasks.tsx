
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FacebookLikeTask, FacebookFollowTask } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, UserPlus, ExternalLink } from 'lucide-react';
import { initialOrders } from '@/lib/data';

type TaskType = 'like' | 'follow';
type Task = FacebookLikeTask | FacebookFollowTask;

type FacebookTasksProps = {
  type: TaskType;
};

const typeConfig = {
  like: {
    title: 'Like Pages & Posts',
    description: 'Like these pages or posts to earn ₹0.50 per like.',
    icon: ThumbsUp,
    actionText: 'Like Page',
    serviceName: 'Facebook Page Likes',
    reward: 0.50,
  },
  follow: {
    title: 'Follow Profiles',
    description: 'Follow these profiles to earn ₹1.00 per follow.',
    icon: UserPlus,
    actionText: 'Follow',
    serviceName: 'Facebook Followers',
    reward: 1.00,
  },
};

export default function FacebookTasks({ type }: FacebookTasksProps) {
  const config = typeConfig[type];
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    const orders = savedOrders ? JSON.parse(savedOrders) : initialOrders;

    const dynamicTasks: Task[] = orders
        .filter((order: any) => order.service === config.serviceName && order.status === 'in progress')
        .map((order: any) => ({
            id: order.id,
            url: order.link,
            reward: config.reward,
            pageName: `Page from ${order.user}`, // Placeholder name
        }));
    
    setTasks(dynamicTasks);
  }, [config.serviceName, config.reward]);

  useEffect(() => {
    loadTasks();
    window.addEventListener('storage', loadTasks);
    return () => window.removeEventListener('storage', loadTasks);
  }, [loadTasks]);

  if (tasks.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <config.icon /> {config.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">No {type} tasks available right now.</p>
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
            {tasks.map((task) => (
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
