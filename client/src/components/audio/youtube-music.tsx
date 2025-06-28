import React, { useRef, useEffect, useState } from 'react';

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

export function YouTubeMusic({ videoId, autoPlay = true, volume = 0.2 }: YouTubeMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;

    // Função para inicializar o player
    const initializePlayer = () => {
      if (!containerRef.current || !window.YT || !window.YT.Player) {
        setTimeout(initializePlayer, 1000);
        return;
      }

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 0,
            loop: 1, // Loop contínuo
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
              console.log('Player YouTube pronto - música contínua');
              setPlayerReady(true);
              
              setTimeout(() => {
                try {
                  // Definir volume para 20%
                  event.target.setVolume(volume * 100);
                  
                  // Tocar automaticamente
                  event.target.playVideo();
                  setIsPlaying(true);
                  
                  console.log('Música iniciada - tocará continuamente a 20% volume');
                } catch (err) {
                  console.error('Erro ao iniciar:', err);
                }
              }, 500);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Garantir que toque novamente se acabar
                setTimeout(() => {
                  try {
                    event.target.playVideo();
                  } catch (err) {
                    console.error('Erro ao reiniciar:', err);
                  }
                }, 100);
              }
            },
            onError: (event: any) => {
              console.error('Erro no YouTube Player:', event.data);
            }
          }
        });
      } catch (error) {
        console.error('Erro ao criar player:', error);
      }
    };

    // Verificar se a API já está carregada
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Carregar a API do YouTube
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.head.appendChild(tag);
      }
      
      // Definir callback global
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    // Cleanup
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Erro ao destruir player:', error);
        }
      }
    };
  }, [videoId, autoPlay, volume]);

  // Funções de controle
  const togglePlayPause = () => {
    if (!playerRef.current || !playerReady) return;
    
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Erro ao alternar play/pause:', error);
    }
  };

  // Não renderizar nada se não for autoplay
  if (!autoPlay) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
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

      {/* Botão pequeno de play/pause */}
      {playerReady && (
        <button
          onClick={togglePlayPause}
          className="bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-105"
          title={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          {isPlaying ? (
            // Ícone de pause
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-300">
              <rect x="6" y="4" width="4" height="16" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" fill="currentColor" />
            </svg>
          ) : (
            // Ícone de play
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-300">
              <polygon points="5,3 19,12 5,21" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}