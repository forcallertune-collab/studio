
'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import type { FacebookLikeTask, FacebookFollowTask, Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, UserPlus, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';

type TaskType = 'like' | 'follow';
type Task = FacebookLikeTask | FacebookFollowTask;

type FacebookTasksProps = {
  type: TaskType;
};

const typeConfig = {
  like: {
    title: 'Like Pages & Posts',
    description: 'Like these pages or posts to earn money.',
    icon: ThumbsUp,
    actionText: 'Like Page',
    serviceName: 'Facebook Page Likes',
    reward: 0.50,
  },
  follow: {
    title: 'Follow Profiles',
    description: 'Follow these profiles to earn money.',
    icon: UserPlus,
    actionText: 'Follow',
    serviceName: 'Facebook Followers',
    reward: 1.00,
  },
};

export default function FacebookTasks({ type }: FacebookTasksProps) {
  const config = typeConfig[type];
  const { toast } = useToast();
  const { setWalletBalance } = useContext(WalletContext);
  const { incrementTaskCount } = useContext(TaskContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const loadTasks = useCallback(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

    const dynamicTasks: Task[] = orders
        .filter((order) => order.service === config.serviceName && order.status === 'in progress')
        .map((order) => ({
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

  const handleTaskComplete = (task: Task) => {
    setWalletBalance(prev => prev + task.reward);
    incrementTaskCount();
    setCompletedTasks(prev => new Set(prev).add(task.id));
    window.open(task.url, '_blank');
    toast({
        title: 'Task Complete!',
        description: `You've earned ₹${task.reward.toFixed(2)}.`,
    });
  }

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
            {availableTasks.map((task) => (
              <div key={task.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {task.pageName}
                  </p>
                  <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                </div>
                <Button onClick={() => handleTaskComplete(task)} size="sm">
                    {config.actionText} <ExternalLink className="ml-2 h-4 w-4"/>
                </Button>
              </div>
            ))}
             {tasks.filter(task => completedTasks.has(task.id)).map(task => (
                 <div key={task.id} className="p-3 flex items-center justify-between bg-muted/50">
                    <div>
                        <p className="font-semibold text-muted-foreground line-through">
                            {task.pageName}
                        </p>
                         <p className="text-sm text-primary/50 font-bold">+ ₹{task.reward.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <CheckCircle className="h-5 w-5" />
                        <span>Completed</span>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
