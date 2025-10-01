
'use client';

import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import type { YouTubePlayer } from 'react-youtube';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { WalletContext, TaskContext } from '@/app/dashboard/layout';
import type { Order, VideoTask } from '@/lib/types';
import { initialOrders } from '@/lib/data';

const VIDEO_DURATION = 30; // seconds

const getYouTubeVideoId = (url: string) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        return urlObj.searchParams.get('v');
    } catch (e) {
        return null;
    }
};

const VideoPlayerDialog = ({ task, onComplete, children }: { task: VideoTask; onComplete: () => void; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const [timeLeft, setTimeLeft] = useState(VIDEO_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const { setWalletBalance } = useContext(WalletContext);
    const { incrementTaskCount } = useContext(TaskContext);

    const videoId = useMemo(() => getYouTubeVideoId(task.url), [task.url]);
    const progress = useMemo(() => ((VIDEO_DURATION - timeLeft) / VIDEO_DURATION) * 100, [timeLeft]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => Math.max(0, prev - 1));
            }, 1000);
        } else if (timeLeft <= 0 && isPlaying) {
            setIsPlaying(false);
            if (player) {
                player.pauseVideo();
            }
            if (!isCompleted) {
                setWalletBalance(prev => prev + task.reward);
                incrementTaskCount();
                setIsCompleted(true);
                onComplete();
            }
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, player, task.reward, setWalletBalance, isCompleted, onComplete, incrementTaskCount]);

    const onPlayerReady = useCallback((event: { target: YouTubePlayer }) => {
        setPlayer(event.target);
    }, []);

    const onPlayerStateChange = useCallback((event: { data: number }) => {
        if (!event.target?.getPlayerState) return;
        
        // When video starts playing
        if (event.data === 1 && timeLeft > 0) { 
            setIsPlaying(true);
        } else { // When paused, ended, etc.
            setIsPlaying(false);
        }
    }, [timeLeft]);
    
    const handleClose = () => {
        setIsOpen(false);
        // Reset state when closing dialog
        setTimeLeft(VIDEO_DURATION);
        setIsPlaying(false);
        setPlayer(null);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
                    {videoId ? (
                        <YouTube
                            videoId={videoId}
                            opts={{ height: '100%', width: '100%', playerVars: { autoplay: 0, controls: 1 } }}
                            onReady={onPlayerReady}
                            onStateChange={onPlayerStateChange}
                            className="w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">Could not load video.</div>
                    )}
                </div>
                <div className="mt-4 space-y-2">
                    <Progress value={progress} />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Time left: {timeLeft}s</span>
                        {isCompleted && (
                            <span className="flex items-center gap-1 text-green-600 font-semibold">
                                <CheckCircle className="h-4 w-4" /> Completed (+₹{task.reward.toFixed(2)})
                            </span>
                        )}
                    </div>
                </div>
                 <DialogFooter>
                    <Button onClick={handleClose} variant="secondary">Close</Button>
                </DialogFooter>
            </DialogContent>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
        </Dialog>
    );
};


export default function YoutubeViewsTask() {
    const [tasks, setTasks] = useState<VideoTask[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const loadTasks = useCallback(() => {
        const savedOrders = localStorage.getItem('adminOrders');
        const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : initialOrders;

        const viewTasks: VideoTask[] = orders
            .filter((order) => order.service === 'YouTube Views' && order.status === 'in progress')
            .map((order) => ({
                id: order.id, // Use order ID as unique task ID
                title: `Watch video from ${order.user}`,
                url: order.link,
                reward: 0.75,
            }));
        
        setTasks(viewTasks);
    }, []);

    useEffect(() => {
        loadTasks();
        window.addEventListener('storage', loadTasks);
        return () => window.removeEventListener('storage', loadTasks);
    }, [loadTasks]);

    const handleTaskComplete = (taskId: string) => {
        setCompletedTasks(prev => new Set(prev).add(taskId));
    };

    if (tasks.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Watch Videos & Earn</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground">No video tasks available right now.</p>
                        <p className="text-sm text-muted-foreground">Please check back later.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Watch Videos & Earn</CardTitle>
                <CardDescription>Watch each video for 30 seconds to earn ₹0.75. Click on any video below to start.</CardDescription>
            </Header>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tasks.map(task => {
                        const videoId = getYouTubeVideoId(task.url);
                        const isCompleted = completedTasks.has(task.id);
                        return (
                            <VideoPlayerDialog key={task.id} task={task} onComplete={() => handleTaskComplete(task.id)}>
                                <Card className="overflow-hidden cursor-pointer group hover:border-primary transition-all">
                                    <div className="relative aspect-video">
                                        {videoId ? (
                                            <Image 
                                                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                                                alt={task.title} 
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No preview</div>
                                        )}
                                        {isCompleted && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <CheckCircle className="h-10 w-10 text-green-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-semibold truncate group-hover:text-primary">{task.title}</p>
                                        <p className="text-xs text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                                    </div>
                                </Card>
                            </VideoPlayerDialog>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
