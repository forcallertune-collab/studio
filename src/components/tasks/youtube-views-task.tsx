
'use client'

import { useState, useEffect, useCallback } from "react";
import YouTube from 'react-youtube';
import type { YouTubePlayer } from 'react-youtube';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { youtubeViewTasks } from "@/lib/data";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Play, SkipForward } from "lucide-react";

const TOTAL_VIDEOS = 200;
const VIDEO_DURATION = 30; // seconds

export default function YoutubeViewsTask() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(VIDEO_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAllCompleted, setIsAllCompleted] = useState(false);
    const [showTaskCompletePopup, setShowTaskCompletePopup] = useState(false);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);

    const currentTask = youtubeViewTasks[currentTaskIndex];
    const progress = ((VIDEO_DURATION - timeLeft) / VIDEO_DURATION) * 100;
    
    const videoId = new URL(currentTask.url).searchParams.get('v');

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (isPlaying) { // Only trigger once
                setIsPlaying(false);
                setTotalEarnings(prev => prev + currentTask.reward);
                if (currentTaskIndex < TOTAL_VIDEOS - 1) {
                    setShowTaskCompletePopup(true);
                } else {
                    setIsAllCompleted(true);
                }
            }
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, currentTaskIndex, currentTask.reward]);
    
    const onPlayerReady = (event: { target: YouTubePlayer }) => {
        setPlayer(event.target);
    };

    const onPlayerStateChange = (event: { data: number }) => {
        // Player state codes: 1 for playing, 2 for paused
        if (event.data === 1 && timeLeft > 0) { // Playing
            setIsPlaying(true);
        } else if (event.data === 2) { // Paused
            setIsPlaying(false);
        }
    };
    
    const handleNext = () => {
        setShowTaskCompletePopup(false);
        if (currentTaskIndex < TOTAL_VIDEOS - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setTimeLeft(VIDEO_DURATION);
            setIsPlaying(false);
        }
    };

    const handleRestart = () => {
        setCurrentTaskIndex(0);
        setTimeLeft(VIDEO_DURATION);
        setIsPlaying(false);
        setIsAllCompleted(false);
        setTotalEarnings(0);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Watch Videos & Earn</CardTitle>
                <CardDescription>Watch each video for 30 seconds to earn ₹0.75. You can watch up to 200 videos per day.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative flex items-center justify-center">
                   <YouTube
                        videoId={videoId || ''}
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
                </div>
                <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">{currentTask.title}</h3>
                    <Progress value={progress} />
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Time left: {timeLeft}s</span>
                        <span>Task: {currentTaskIndex + 1} / {TOTAL_VIDEOS}</span>
                        <span>Earnings: ₹{totalEarnings.toFixed(2)}</span>
                    </div>
                </div>
                 <div className="mt-4">
                    <Button onClick={handleNext} disabled={timeLeft > 0 || currentTaskIndex >= TOTAL_VIDEOS - 1}>
                        Next Video <SkipForward className="ml-2 h-4 w-4" />
                    </Button>
                 </div>
            </CardContent>

             <AlertDialog open={showTaskCompletePopup} onOpenChange={setShowTaskCompletePopup}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline">Task Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You've earned ₹{currentTask.reward.toFixed(2)}. You can now proceed to the next video.
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
                    <AlertDialogTitle className="font-headline">Daily Tasks Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Congratulations! You've earned ₹{totalEarnings.toFixed(2)} today. 
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
