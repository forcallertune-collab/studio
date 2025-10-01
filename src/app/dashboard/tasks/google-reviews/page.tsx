
'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import type { GoogleReviewTask, Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';

const SERVICE_NAME = 'Google Reviews';

export default function GoogleReviewsPage() {
  const { toast } = useToast();
  const { setWalletBalance } = useContext(WalletContext);
  const { incrementTaskCount } = useContext(TaskContext);
  const [tasks, setTasks] = useState<GoogleReviewTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const getBusinessNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      // Basic extraction, a more robust parser may be needed for all Google URL types
      const pathParts = urlObj.pathname.split('/');
      const searchIndex = pathParts.indexOf('search');
      if (searchIndex > -1 && searchIndex + 1 < pathParts.length) {
        return pathParts[searchIndex + 1].replace(/\+/g, ' ');
      }
    } catch (e) {
      // fallback for invalid URLs
    }
    return 'Google Business';
  };
  
  const loadTasks = useCallback(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

    const dynamicTasks: GoogleReviewTask[] = orders
        .filter((order) => order.service === SERVICE_NAME && order.status === 'in progress')
        .map((order) => ({
            id: order.id,
            url: order.link,
            reward: 5.0, // Example reward, higher for reviews
            businessName: getBusinessNameFromUrl(order.link),
        }));
    
    setTasks(dynamicTasks);
  }, []);

  useEffect(() => {
    loadTasks();
    window.addEventListener('storage', loadTasks);
    return () => window.removeEventListener('storage', loadTasks);
  }, [loadTasks]);

  const handleTaskComplete = (task: GoogleReviewTask) => {
    if (completedTasks.has(task.id)) return;

    setWalletBalance(prev => prev + task.reward);
    incrementTaskCount();
    setCompletedTasks(prev => new Set(prev).add(task.id));
    window.open(task.url, '_blank');
    toast({
        title: 'Task Complete!',
        description: `You've earned ₹${task.reward.toFixed(2)}. Please leave a review to finalize.`,
    });
  }

  const availableTasks = tasks.filter(task => !completedTasks.has(task.id));
  const finishedTasks = tasks.filter(task => completedTasks.has(task.id));

  return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Star/> Google Review Tasks</CardTitle>
                <CardDescription>Earn money by writing reviews for local businesses.</CardDescription>
            </CardHeader>
            <CardContent>
                {tasks.length === 0 ? (
                     <div className="text-center py-12 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">No Google Review tasks available right now.</p>
                    </div>
                ) : (
                    <div className="border rounded-lg">
                        <div className="divide-y">
                            {availableTasks.map((task) => (
                                <div key={task.id} className="p-3 flex items-center justify-between">
                                    <div>
                                    <p className="font-semibold">{task.businessName}</p>
                                    <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                                    </div>
                                    <Button onClick={() => handleTaskComplete(task)} size="sm">
                                        Write Review <ExternalLink className="ml-2 h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            {finishedTasks.map(task => (
                                <div key={task.id} className="p-3 flex items-center justify-between bg-muted/50">
                                    <div>
                                        <p className="font-semibold text-muted-foreground line-through">
                                            {task.businessName}
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
                )}
            </CardContent>
        </Card>
    );
}
