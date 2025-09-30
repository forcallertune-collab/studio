
'use client';

import type { InstagramReelTask } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, ExternalLink } from 'lucide-react';

type InstagramReelsTasksProps = {
  tasks: InstagramReelTask[];
};

export default function InstagramReelsTask({ tasks }: InstagramReelsTasksProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video /> Watch Reels
        </CardTitle>
        <CardDescription>Watch these Reels to earn money.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {task.reelTitle}
                  </p>
                  <p className="text-sm text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                </div>
                <Button asChild size="sm">
                  <a href={task.url} target="_blank" rel="noopener noreferrer">
                    Watch Reel <ExternalLink className="ml-2 h-4 w-4"/>
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
