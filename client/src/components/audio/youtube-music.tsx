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
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Função para iniciar o timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Parar música quando o tempo acabar
          if (playerRef.current) {
            try {
              playerRef.current.pauseVideo();
              setIsPlaying(false);
              setHasFinished(true);
            } catch (error) {
              console.error('Erro ao parar música:', error);
            }
          }
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

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
            loop: 0, // Não loop pois vamos parar em 30s
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
              console.log('Player YouTube pronto');
              
              setTimeout(() => {
                try {
                  // Definir volume
                  event.target.setVolume(volume * 100);
                  
                  // Tentar tocar automaticamente
                  event.target.playVideo();
                  setIsPlaying(true);
                  
                  // Iniciar timer de 30 segundos
                  startTimer();
                  
                  console.log('Música iniciada - tocará por 30 segundos');
                } catch (err) {
                  console.error('Erro ao iniciar:', err);
                }
              }, 500);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                // Se ainda não iniciou o timer, iniciar agora
                if (timeLeft === 30 && !timerRef.current) {
                  startTimer();
                }
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Erro ao destruir player:', error);
        }
      }
    };
  }, [videoId, autoPlay, volume]);

  // Não renderizar nada se não for autoplay ou se já terminou
  if (!autoPlay || hasFinished) {
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

      {/* Indicador visual pequeno e discreto */}
      {isPlaying && timeLeft > 0 && (
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-slate-300">
              🎵 {timeLeft}s
            </span>
          </div>
        </div>
      )}
    </div>
  );
}