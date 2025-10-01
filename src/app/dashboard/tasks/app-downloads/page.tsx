
'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import type { AppDownloadTask } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initialOrders } from '@/lib/data';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';

const SERVICE_NAME = 'App Downloads';

export default function AppDownloadsPage() {
  const { toast } = useToast();
  const { setWalletBalance } = useContext(WalletContext);
  const { incrementTaskCount } = useContext(TaskContext);
  const [tasks, setTasks] = useState<AppDownloadTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const getAppNameFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('play.google.com')) {
        return urlObj.searchParams.get('id') || 'Unknown Android App';
      }
      if (urlObj.hostname.includes('apps.apple.com')) {
        const pathParts = urlObj.pathname.split('/');
        return pathParts[pathParts.length - 2] || 'Unknown iOS App';
      }
    } catch (e) {
      // fallback for invalid URLs
    }
    return 'Unknown App';
  };
  
  const loadTasks = useCallback(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    const orders = savedOrders ? JSON.parse(savedOrders) : initialOrders;

    const dynamicTasks: AppDownloadTask[] = orders
        .filter((order: any) => order.service === SERVICE_NAME && order.status === 'in progress')
        .map((order: any) => ({
            id: order.id,
            url: order.link,
            reward: 2.0, // Example reward
            appName: getAppNameFromUrl(order.link),
        }));
    
    setTasks(dynamicTasks);
  }, []);

  useEffect(() => {
    loadTasks();
    window.addEventListener('storage', loadTasks);
    return () => window.removeEventListener('storage', loadTasks);
  }, [loadTasks]);

  const handleTaskComplete = (task: AppDownloadTask) => {
    if (completedTasks.has(task.id)) return;

    setWalletBalance(prev => prev + task.reward);
    incrementTaskCount();
    setCompletedTasks(prev => new Set(prev).add(task.id));
    window.open(task.url, '_blank');
    toast({
        title: 'Task Complete!',
        description: `You've earned ₹${task.reward.toFixed(2)}. Please download the app to finalize.`,
    });
  }

  const availableTasks = tasks.filter(task => !completedTasks.has(task.id));
  const finishedTasks = tasks.filter(task => completedTasks.has(task.id));

  return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Download/> App Download Tasks</CardTitle>
                <CardDescription>Earn money by downloading and installing apps on your device.</CardDescription>
            </CardHeader>
            <CardContent>
                {tasks.length === 0 ? (
                     <div className="text-center py-12 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">No app download tasks available right now.</p>
                    </div>
                ) : (
                    <div className="border rounded-lg">
                        <div className="divide-y">
                            {availableTasks.map((task) => (
                                <div key={task.id} className="p-3 flex items-center justify-between">
                                    <div>
                                    <p className="font-semibold">{task.appName}</p>
                                    <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                                    </div>
                                    <Button onClick={() => handleTaskComplete(task)} size="sm">
                                        Download App <ExternalLink className="ml-2 h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            {finishedTasks.map(task => (
                                <div key={task.id} className="p-3 flex items-center justify-between bg-muted/50">
                                    <div>
                                        <p className="font-semibold text-muted-foreground line-through">
                                            {task.appName}
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
