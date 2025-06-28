import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedMusicProps {
  autoPlay?: boolean;
  volume?: number;
}

export function GeneratedMusic({ autoPlay = false, volume = 0.3 }: GeneratedMusicProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const animationFrameRef = useRef<number>();

  // Notas musicais para criar harmonia relaxante (escala pentatônica em Lá menor)
  const baseFrequencies = [
    110.00, // A2
    123.47, // B2  
    146.83, // D3
    164.81, // E3
    196.00, // G3
    220.00, // A3
    246.94, // B3
    293.66, // D4
  ];

  // Sons da natureza sintéticos
  const natureSounds = {
    rain: { freq: 100, type: 'brown' },
    wind: { freq: 80, type: 'white' },
    ocean: { freq: 60, type: 'pink' }
  };

  useEffect(() => {
    // Criar contexto de áudio
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();
    
    // Criar nó de ganho master
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.value = currentVolume;

    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : currentVolume;
    }
  }, [currentVolume, isMuted]);

  const createOscillator = (frequency: number, type: OscillatorType = 'sine', detune: number = 0) => {
    if (!audioContextRef.current || !masterGainRef.current) return null;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();

    // Configurar oscilador
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;

    // Configurar filtro passa-baixa para suavizar o som
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // Configurar ganho (volume baixo para ser relaxante)
    gainNode.gain.value = 0.03;

    // Conectar nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    return { oscillator, gainNode, filter };
  };

  // Criar ruído para sons da natureza (chuva, vento, oceano)
  const createNoiseNode = (type: 'white' | 'brown' | 'pink' = 'white') => {
    if (!audioContextRef.current || !masterGainRef.current) return null;

    const bufferSize = audioContextRef.current.sampleRate * 2;
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = buffer.getChannelData(0);

    // Gerar diferentes tipos de ruído
    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }
    }

    const bufferSource = audioContextRef.current.createBufferSource();
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();

    bufferSource.buffer = buffer;
    bufferSource.loop = true;

    // Configurar filtro para simular diferentes ambientes
    filter.type = 'lowpass';
    filter.frequency.value = type === 'brown' ? 400 : type === 'pink' ? 600 : 800;
    filter.Q.value = 0.5;

    // Volume muito baixo para ambiente
    gainNode.gain.value = 0.015;

    bufferSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    return { bufferSource, gainNode, filter };
  };

  const startMusic = () => {
    if (!audioContextRef.current) return;

    // Parar música anterior se existir
    stopMusic();

    const context = audioContextRef.current;

    // Adicionar som de ambiente (chuva suave)
    const rainSound = createNoiseNode('brown');
    if (rainSound) {
      rainSound.bufferSource.start();
      oscillatorsRef.current.push(rainSound.bufferSource as any);
      filtersRef.current.push(rainSound.filter);
    }

    // Adicionar vento suave
    setTimeout(() => {
      if (!isPlaying) return;
      const windSound = createNoiseNode('pink');
      if (windSound) {
        windSound.gainNode.gain.value = 0.008; // Ainda mais sutil
        windSound.bufferSource.start();
        oscillatorsRef.current.push(windSound.bufferSource as any);
        filtersRef.current.push(windSound.filter);
      }
    }, 3000);

    // Criar camadas de sons relaxantes (acordes suaves)
    baseFrequencies.forEach((freq, index) => {
      const delay = index * 3; // Delay maior para transições mais suaves
      
      setTimeout(() => {
        if (!isPlaying) return;

        // Nota principal com timbre suave
        const mainNote = createOscillator(freq, 'sine');
        if (mainNote) {
          const { oscillator, gainNode } = mainNote;
          
          // Fade in muito suave
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.02, context.currentTime + 4);
          
          oscillator.start();
          oscillatorsRef.current.push(oscillator);
          filtersRef.current.push(mainNote.filter);
        }

        // Sub-harmônico (oitava inferior) para profundidade
        if (index % 2 === 0) {
          const subHarmonic = createOscillator(freq * 0.5, 'triangle', Math.random() * 5 - 2.5);
          if (subHarmonic) {
            const { oscillator, gainNode } = subHarmonic;
            
            gainNode.gain.setValueAtTime(0, context.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.015, context.currentTime + 6);
            
            oscillator.start();
            oscillatorsRef.current.push(oscillator);
            filtersRef.current.push(subHarmonic.filter);
          }
        }

        // Harmônico superior muito sutil
        const harmonic = createOscillator(freq * 1.5, 'triangle', Math.random() * 8 - 4);
        if (harmonic) {
          const { oscillator, gainNode } = harmonic;
          
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.008, context.currentTime + 5);
          
          oscillator.start();
          oscillatorsRef.current.push(oscillator);
          filtersRef.current.push(harmonic.filter);
        }
      }, delay * 1000);
    });

    // Adicionar modulação suave para criar movimento orgânico
    const modulateFilters = () => {
      if (!isPlaying || filtersRef.current.length === 0) return;

      const time = Date.now() * 0.001;
      filtersRef.current.forEach((filter, index) => {
        // Modulação muito lenta e sutil
        const slowWave = Math.sin(time * 0.05 + index * 0.3) * 50 + 650;
        const microWave = Math.sin(time * 0.2 + index * 0.8) * 20;
        filter.frequency.value = Math.max(300, Math.min(1000, slowWave + microWave));
      });

      animationFrameRef.current = requestAnimationFrame(modulateFilters);
    };

    // Iniciar modulação após tempo para permitir fade-in
    setTimeout(() => {
      if (isPlaying) {
        modulateFilters();
      }
    }, 8000);
  };

  const stopMusic = () => {
    // Parar todas as modulações
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Parar todos os osciladores e buffer sources
    oscillatorsRef.current.forEach((source) => {
      try {
        if ('stop' in source) {
          source.stop();
        }
      } catch (e) {
        // Source já pode ter parado
      }
    });

    oscillatorsRef.current = [];
    filtersRef.current = [];
  };

  const togglePlay = async () => {
    if (!audioContextRef.current) return;

    // Reactivar contexto de áudio se necessário (política do navegador)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startMusic();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
  };

  // Auto-play inicial (se permitido pelo navegador)
  useEffect(() => {
    if (autoPlay && audioContextRef.current) {
      // Aguardar interação do usuário antes de tentar tocar
      const handleUserInteraction = () => {
        if (!isPlaying && autoPlay) {
          togglePlay();
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [autoPlay]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 shadow-2xl">
        {/* Header com indicador de som */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-xs text-slate-300 font-medium">
            {isPlaying ? 'Tocando' : 'Pausado'}
          </span>
        </div>

        {/* Controles principais */}
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30"
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
            className="h-10 w-10 p-0 hover:bg-slate-700/50 rounded-xl border border-slate-600/30"
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
            max="1"
            step="0.1"
            value={currentVolume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-300"
          />
          <span className="text-xs text-slate-500 min-w-[2rem]">{Math.round(currentVolume * 100)}%</span>
        </div>
        
        {/* Título */}
        <div className="text-xs text-slate-400 text-center border-t border-slate-700/50 pt-2">
          Sons Relaxantes
        </div>
      </div>
    </div>
  );
}