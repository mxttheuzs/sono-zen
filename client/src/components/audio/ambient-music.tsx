import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AmbientMusicProps {
  audioSrc: string;
  autoPlay?: boolean;
  volume?: number;
}

export function AmbientMusic({ audioSrc, autoPlay = false, volume = 0.3 }: AmbientMusicProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = currentVolume;
    audio.loop = true;

    if (autoPlay) {
      // Tentar reproduzir automaticamente (pode ser bloqueado pelo navegador)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    }

    const handleCanPlay = () => {
      if (isPlaying && !audio.paused) {
        audio.play().catch(() => setIsPlaying(false));
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    return () => audio.removeEventListener('canplay', handleCanPlay);
  }, [audioSrc, currentVolume, autoPlay, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = currentVolume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="h-8 w-8 p-0 hover:bg-slate-700"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-blue-400" />
            ) : (
              <Play className="h-4 w-4 text-blue-400" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="h-8 w-8 p-0 hover:bg-slate-700"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-blue-400" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 min-w-0">♪</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={currentVolume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                     [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        
        <div className="text-xs text-slate-500 mt-1 text-center">
          Música Relaxante
        </div>
      </div>

      <audio ref={audioRef} preload="metadata">
        <source src={audioSrc} type="audio/mpeg" />
        <source src={audioSrc} type="audio/wav" />
        <source src={audioSrc} type="audio/ogg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
}