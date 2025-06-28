import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
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

export function YouTubeMusic({ videoId, autoPlay = false, volume = 0.2 }: YouTubeMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [currentVolume, setCurrentVolume] = useState(volume * 100);
  const [isLoading, setIsLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    // Função para inicializar o player
    const initializePlayer = () => {
      if (!containerRef.current || !window.YT || !window.YT.Player) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initializePlayer, 1000);
        }
        return;
      }

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 0, // Não autoplay para evitar problemas
            mute: 0,
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
              console.log('Player pronto');
              setIsLoading(false);
              setPlayerReady(true);
              
              // Aguardar um pouco antes de configurar o volume
              setTimeout(() => {
                try {
                  event.target.setVolume(currentVolume);
                  console.log('Volume definido para:', currentVolume);
                } catch (err) {
                  console.error('Erro ao definir volume inicial:', err);
                }
              }, 500);
            },
            onStateChange: (event: any) => {
              console.log('Estado mudou:', event.data);
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Loop manual
                setTimeout(() => {
                  if (playerRef.current && playerReady) {
                    try {
                      playerRef.current.seekTo(0);
                      playerRef.current.playVideo();
                    } catch (err) {
                      console.error('Erro ao fazer loop:', err);
                    }
                  }
                }, 100);
              }
            },
            onError: (event: any) => {
              console.error('Erro no YouTube Player:', event.data);
              setIsLoading(false);
              setPlayerReady(false);
            }
          }
        });
      } catch (error) {
        console.error('Erro ao criar player:', error);
        setIsLoading(false);
      }
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

  // Função auxiliar para aguardar que o player esteja pronto
  const waitForPlayer = (callback: () => void, maxWait = 3000) => {
    const startTime = Date.now();
    const checkPlayer = () => {
      if (playerRef.current && playerReady && 
          typeof playerRef.current.getPlayerState === 'function') {
        callback();
      } else if (Date.now() - startTime < maxWait) {
        setTimeout(checkPlayer, 100);
      } else {
        console.error('Player não está pronto após tempo limite');
      }
    };
    checkPlayer();
  };

  const togglePlay = () => {
    waitForPlayer(() => {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.error('Erro ao controlar reprodução:', error);
      }
    });
  };

  const toggleMute = () => {
    waitForPlayer(() => {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (error) {
        console.error('Erro ao controlar som:', error);
      }
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setCurrentVolume(newVolume);
    
    waitForPlayer(() => {
      try {
        playerRef.current.setVolume(newVolume);
        if (newVolume === 0) {
          setIsMuted(true);
        } else if (isMuted) {
          setIsMuted(false);
        }
        console.log('Volume alterado para:', newVolume);
      } catch (error) {
        console.error('Erro ao alterar volume:', error);
      }
    });
  };

  const unmuteAndPlay = () => {
    waitForPlayer(() => {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(currentVolume);
        setIsMuted(false);
        if (!isPlaying) {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.error('Erro ao ativar som:', error);
      }
    });
  };

  const resetPlayer = () => {
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (error) {
        console.error('Erro ao destruir player:', error);
      }
    }
    
    setIsLoading(true);
    setPlayerReady(false);
    setIsPlaying(false);
    setIsMuted(false);
    
    // Recriar player após pequeno delay
    setTimeout(() => {
      if (containerRef.current && window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player(containerRef.current, {
            height: '1',
            width: '1',
            videoId: videoId,
            playerVars: {
              autoplay: 0,
              mute: 0,
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
                console.log('Player reiniciado e pronto');
                setIsLoading(false);
                setPlayerReady(true);
                setTimeout(() => {
                  try {
                    event.target.setVolume(currentVolume);
                  } catch (err) {
                    console.error('Erro ao definir volume após reset:', err);
                  }
                }, 500);
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  setTimeout(() => {
                    if (playerRef.current && playerReady) {
                      try {
                        playerRef.current.seekTo(0);
                        playerRef.current.playVideo();
                      } catch (err) {
                        console.error('Erro ao fazer loop após reset:', err);
                      }
                    }
                  }, 100);
                }
              },
              onError: (event: any) => {
                console.error('Erro no player reiniciado:', event.data);
                setIsLoading(false);
                setPlayerReady(false);
              }
            }
          });
        } catch (error) {
          console.error('Erro ao recriar player:', error);
          setIsLoading(false);
        }
      }
    }, 1000);
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
            !playerReady ? 'bg-red-400 animate-pulse' :
            isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-600'
          }`}></div>
          <span className="text-xs text-slate-300 font-medium">
            {isLoading ? 'Carregando...' : 
             !playerReady ? 'Conectando...' :
             isPlaying ? 'Tocando' : 'Pausado'}
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
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            disabled={isLoading || !playerReady}
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
            disabled={isLoading || !playerReady}
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30 disabled:opacity-50"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-slate-400" />
            ) : (
              <Volume2 className="h-5 w-5 text-blue-400" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetPlayer}
            disabled={isLoading}
            title="Reiniciar player"
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4 text-orange-400" />
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