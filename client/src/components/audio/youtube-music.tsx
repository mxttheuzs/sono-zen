import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YouTubeMusicProps {
  videoId: string;
  autoPlay?: boolean;
  volume?: number;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export function YouTubeMusic({ videoId, autoPlay = false, volume = 0.5 }: YouTubeMusicProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [currentVolume, setCurrentVolume] = useState(volume * 100);
  const [isLoading, setIsLoading] = useState(true);
  const [apiReady, setApiReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Função para inicializar o player
    const initializePlayer = () => {
      if (!containerRef.current || !window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          mute: autoPlay ? 1 : 0,
          loop: 1,
          playlist: videoId,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          disablekb: 1,
          fs: 0
        },
        events: {
          onReady: (event: any) => {
            setIsLoading(false);
            event.target.setVolume(currentVolume);
            if (autoPlay) {
              event.target.mute();
              setTimeout(() => {
                event.target.playVideo();
                setIsPlaying(true);
              }, 100);
            }
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(0);
                  playerRef.current.playVideo();
                }
              }, 100);
            }
          },
          onError: (event: any) => {
            console.error('Erro no YouTube Player:', event.data);
            setIsLoading(false);
          }
        }
      });
    };

    // Verificar se a API já está carregada
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Carregar a API do YouTube
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }

    // Definir callback global
    window.onYouTubeIframeAPIReady = initializePlayer;

    // Cleanup
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, autoPlay, currentVolume]);

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setCurrentVolume(newVolume);
    
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const unmuteAndPlay = () => {
    if (playerRef.current) {
      playerRef.current.unMute();
      playerRef.current.setVolume(currentVolume);
      setIsMuted(false);
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 shadow-2xl">
        {/* Player invisível */}
        <div 
          ref={containerRef} 
          style={{ 
            position: 'absolute', 
            left: '-9999px',
            width: '1px',
            height: '1px'
          }} 
        />

        {/* Header com indicador de som */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <div className={`w-2 h-2 rounded-full ${
            isLoading ? 'bg-yellow-400 animate-pulse' : 
            isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-600'
          }`}></div>
          <span className="text-xs text-slate-300 font-medium">
            {isLoading ? 'Carregando...' : isPlaying ? 'Tocando' : 'Pausado'}
          </span>
        </div>

        {/* Aviso de som mutado */}
        {!isLoading && isMuted && (
          <div className="mb-3 p-2 bg-blue-900/50 border border-blue-700/50 rounded-lg">
            <p className="text-xs text-blue-300 text-center mb-2">
              Clique para ativar o som
            </p>
            <Button
              onClick={unmuteAndPlay}
              className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-500"
            >
              Ativar Som e Tocar
            </Button>
          </div>
        )}

        {/* Controles principais */}
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            disabled={isLoading}
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30 disabled:opacity-50"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-blue-400" />
            ) : (
              <Play className="h-5 w-5 text-blue-400" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            disabled={isLoading}
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30 disabled:opacity-50"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-slate-400" />
            ) : (
              <Volume2 className="h-5 w-5 text-blue-400" />
            )}
          </Button>
        </div>
        
        {/* Controle de volume */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-400 min-w-0">🎵</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={currentVolume}
            onChange={handleVolumeChange}
            disabled={isLoading}
            className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-300
                     disabled:opacity-50"
          />
          <span className="text-xs text-slate-500 min-w-[2rem]">{currentVolume}%</span>
        </div>
        
        {/* Título */}
        <div className="text-xs text-slate-400 text-center border-t border-slate-700/50 pt-2">
          Música Relaxante
        </div>
      </div>
    </div>
  );
}