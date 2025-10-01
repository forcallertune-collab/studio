
'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import type { InstagramReelTask, Order } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';
import { useToast } from '@/hooks/use-toast';

const REWARD = 0.75;
const SERVICE_NAME = 'Instagram Reel Views';

export default function InstagramReelsTask() {
  const [tasks, setTasks] = useState<InstagramReelTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const { setWalletBalance } = useContext(WalletContext);
  const { incrementTaskCount } = useContext(TaskContext);
  const { toast } = useToast();

  const loadTasks = useCallback(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

    const dynamicTasks: InstagramReelTask[] = orders
      .filter((order) => order.service === SERVICE_NAME && order.status === 'in progress')
      .map((order) => ({
        id: order.id,
        url: order.link,
        reward: REWARD,
        reelTitle: `Reel from ${order.user}`, // Placeholder name
      }));
    
    setTasks(dynamicTasks);
  }, []);

  useEffect(() => {
    loadTasks();
    window.addEventListener('storage', loadTasks);
    return () => window.removeEventListener('storage', loadTasks);
  }, [loadTasks]);

  const handleTaskComplete = (task: InstagramReelTask, e: React.MouseEvent) => {
    e.preventDefault(); 
    if (completedTasks.has(task.id)) return;
    
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

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Watch Reels & Earn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No Reel tasks available right now.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch Reels</CardTitle>
        <CardDescription>Watch these Reels to earn money. Click on any video below to go to Instagram.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map((task, index) => {
             const isCompleted = completedTasks.has(task.id);
             return (
                <a key={task.id} href={isCompleted ? undefined : task.url} onClick={(e) => handleTaskComplete(task, e)} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="overflow-hidden cursor-pointer group hover:border-primary transition-all">
                    <div className="relative aspect-[9/16]">
                      <Image 
                        src={`https://picsum.photos/seed/${index + 100}/270/480`}
                        alt={task.reelTitle}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="social media"
                      />
                       {isCompleted ? (
                          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                            <CheckCircle className="h-10 w-10 text-green-500" />
                            <span className="mt-2 font-semibold">Completed</span>
                          </div>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-2">
                                <p className="text-white text-sm font-semibold truncate group-hover:text-primary">{task.reelTitle}</p>
                                <p className="text-xs text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white">
                                <ExternalLink className="h-4 w-4"/>
                            </div>
                          </>
                        )}
                    </div>
                  </Card>
                </a>
              )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
