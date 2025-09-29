
'use client'

import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import YouTube from 'react-youtube';
import type { YouTubePlayer } from 'react-youtube';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Play, SkipForward } from "lucide-react";
import { WalletContext } from "@/app/dashboard/layout";
import { initialOrders } from "@/lib/data";
import type { VideoTask } from "@/lib/types";


const VIDEO_DURATION = 30; // seconds

export default function YoutubeViewsTask() {
    const [tasks, setTasks] = useState<VideoTask[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(VIDEO_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAllCompleted, setIsAllCompleted] = useState(false);
    const [showTaskCompletePopup, setShowTaskCompletePopup] = useState(false);
    const [sessionEarnings, setSessionEarnings] = useState(0);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const { setWalletBalance } = useContext(WalletContext);

    useEffect(() => {
        // Load tasks from localStorage
        const savedOrders = localStorage.getItem('adminOrders');
        const orders = savedOrders ? JSON.parse(savedOrders) : initialOrders;

        const viewTasks: VideoTask[] = orders
            .filter((order: any) => order.service === 'YouTube Views' && order.status === 'in progress')
            .map((order: any, index: number) => ({
                id: `view-task-${order.id}-${index}`,
                title: `Watch video from ${order.user}`,
                url: order.link,
                reward: 0.75, // Standard reward
            }));
        
        setTasks(viewTasks);
        setCurrentTaskIndex(0);
        setIsAllCompleted(false);
        setSessionEarnings(0);

    }, []);

    const currentTask = useMemo(() => tasks[currentTaskIndex], [tasks, currentTaskIndex]);
    const progress = useMemo(() => ((VIDEO_DURATION - timeLeft) / VIDEO_DURATION) * 100, [timeLeft]);
    
    const videoId = useMemo(() => {
        if (!currentTask) return null;
        try {
            const url = new URL(currentTask.url);
            if (url.hostname === 'youtu.be') {
                return url.pathname.slice(1);
            }
            return url.searchParams.get('v');
        } catch (e) {
            return null;
        }
    }, [currentTask]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0 && isPlaying) {
             setIsPlaying(false);
             if (player) {
                player.pauseVideo();
            }
             setSessionEarnings(prev => prev + currentTask.reward);
             setWalletBalance(prev => prev + currentTask.reward);
             if (currentTaskIndex < tasks.length - 1) {
                 setShowTaskCompletePopup(true);
             } else {
                 setIsAllCompleted(true);
             }
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, currentTaskIndex, currentTask, player, setWalletBalance, tasks.length]);
    
    const onPlayerReady = useCallback((event: { target: YouTubePlayer }) => {
        setPlayer(event.target);
    }, []);

    const onPlayerStateChange = useCallback((event: { data: number }) => {
        // HACK: Sometimes onStateChange is called with a null target.
        if (!event.target?.getPlayerState) {
            return;
        }
        if (event.data === 1 && timeLeft > 0) { // Playing
            setIsPlaying(true);
        } else { // Paused, ended, etc.
            setIsPlaying(false);
        }
    }, [timeLeft]);
    
    const handleNext = useCallback(() => {
        setShowTaskCompletePopup(false);
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setTimeLeft(VIDEO_DURATION);
            setIsPlaying(false);
            setPlayer(null); // Force re-render of YouTube component
        } else {
            setIsAllCompleted(true);
        }
    }, [currentTaskIndex, tasks.length]);

    const handleRestart = () => {
        setIsAllCompleted(false);
        setCurrentTaskIndex(0);
        setTimeLeft(VIDEO_DURATION);
        setIsPlaying(false);
        setSessionEarnings(0);
    }

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
        )
    }

    if (!currentTask) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Loading video tasks...</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Watch Videos & Earn</CardTitle>
                <CardDescription>Watch each video for 30 seconds to earn ₹0.75. Complete all available tasks to maximize your earnings.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative flex items-center justify-center">
                   {videoId ? (
                    <YouTube
                        key={currentTaskIndex} // Add key to force re-render
                        videoId={videoId}
                        opts={{
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                            },
                        }}
                        onReady={onPlayerReady}
                        onStateChange={onPlayerStateChange}
                        className="w-full h-full"
                    />
                   ) : (
                    <p>Could not load video.</p>
                   )}
                </div>
                <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">{currentTask.title}</h3>
                    <Progress value={progress} />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Time left: {timeLeft}s</span>
                        <span>Task: {currentTaskIndex + 1} / {tasks.length}</span>
                        <span>Session Earnings: ₹{sessionEarnings.toFixed(2)}</span>
                    </div>
                </div>
                 <div className="mt-4">
                    <Button onClick={handleNext} disabled={timeLeft > 0 || currentTaskIndex >= tasks.length - 1}>
                        Next Video <SkipForward className="ml-2 h-4 w-4" />
                    </Button>
                 </div>
            </CardContent>

             <AlertDialog open={showTaskCompletePopup} onOpenChange={setShowTaskCompletePopup}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">Task Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You've earned ₹{currentTask.reward.toFixed(2)}. This has been added to your main wallet.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={handleNext}>Next Video</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

             <AlertDialog open={isAllCompleted}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">All Tasks Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Congratulations! You've earned a total of ₹{sessionEarnings.toFixed(2)} in this session. 
                        Come back tomorrow for more videos.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={handleRestart}>Start Over (Demo)</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}
