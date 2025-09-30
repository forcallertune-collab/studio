
'use client';

import type { InstagramReelTask } from '@/lib/types';
import Image from 'next/image';
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
        <CardDescription>Watch these Reels to earn money. Click on any video below to go to Instagram.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task, index) => (
            <a key={task.id} href={task.url} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="overflow-hidden cursor-pointer group hover:border-primary transition-all">
                <div className="relative aspect-[9/16]">
                  <Image 
                    src={`https://picsum.photos/seed/${index + 100}/270/480`}
                    alt={task.reelTitle}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint="social media"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-2">
                      <p className="text-white text-sm font-semibold truncate group-hover:text-primary">{task.reelTitle}</p>
                      <p className="text-xs text-primary font-bold">+ ₹{task.reward.toFixed(2)}</p>
                  </div>
                   <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white">
                      <ExternalLink className="h-4 w-4"/>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
