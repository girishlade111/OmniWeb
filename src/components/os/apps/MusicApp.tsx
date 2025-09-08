
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const mockSongs = [
  { id: 1, title: 'Summer Breeze', artist: 'The Isley Brothers', duration: 188, cover: '823', hint: 'nature landscape' },
  { id: 2, title: 'Electric Feel', artist: 'MGMT', duration: 229, cover: '76', hint: 'abstract pattern' },
  { id: 3, title: 'Midnight City', artist: 'M83', duration: 243, cover: '1050', hint: 'city night' },
  { id: 4, title: 'Golden Hour', artist: 'Kacey Musgraves', duration: 198, cover: '1074', hint: 'sunset beach' },
  { id: 5, title: 'Lost in Yesterday', artist: 'Tame Impala', duration: 249, cover: '10', hint: 'person thinking' },
  { id: 6, title: 'Redbone', artist: 'Childish Gambino', duration: 326, cover: '42', hint: 'abstract portrait' },
];

const MusicApp = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = mockSongs[currentSongIndex];

  const handleSkipForward = useCallback(() => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % mockSongs.length);
    setProgress(0);
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          const newProgress = p + (100 / currentSong.duration);
          if (newProgress >= 100) {
            handleSkipForward();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong.duration, handleSkipForward]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    if (progress > 3) {
      setProgress(0);
      return;
    }
    const prevIndex = (currentSongIndex - 1 + mockSongs.length) % mockSongs.length;
    setCurrentSongIndex(prevIndex);
    setProgress(0);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setProgress(0);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Music</h2>
      </div>
      <div className="flex-grow flex flex-col p-4 space-y-4 overflow-hidden">
        {/* Now Playing section */}
        <Card className="flex-shrink-0 border-0 bg-transparent shadow-none">
          <CardContent className="p-0 flex flex-col items-center text-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg mb-4">
              <Image 
                src={`https://picsum.photos/id/${currentSong.cover}/200/200`}
                alt={currentSong.title}
                width={200}
                height={200}
                className="object-cover"
                data-ai-hint={currentSong.hint}
              />
            </div>
            <h3 className="font-semibold text-lg">{currentSong.title}</h3>
            <p className="text-muted-foreground text-sm">{currentSong.artist}</p>
            
            <div className="w-full mt-4">
              <Progress value={progress} className="h-1" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatTime(progress / 100 * currentSong.duration)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <Button variant="ghost" size="icon" onClick={handleSkipBack}>
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button variant="default" size="icon" className="h-12 w-12 rounded-full" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSkipForward}>
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Playlist */}
        <div className="flex-grow min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-2 pr-4">
              {mockSongs.map((song, index) => (
                <div
                  key={song.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted",
                    index === currentSongIndex && "bg-muted"
                  )}
                  onClick={() => selectSong(index)}
                >
                  <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                     <Image 
                      src={`https://picsum.photos/id/${song.cover}/40/40`}
                      alt={song.title}
                      width={40}
                      height={40}
                      className="object-cover"
                      data-ai-hint={song.hint}
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatTime(song.duration)}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
