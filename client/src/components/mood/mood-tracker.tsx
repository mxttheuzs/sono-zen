import React, { useState, useEffect } from 'react';
import { Moon, Sun, Star, Heart, Brain, Zap, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  timestamp: number;
  relaxationLevel: number;
  energyLevel: number;
  sleepQuality: number;
  stressLevel: number;
  emoji: string;
  notes?: string;
}

const moodEmojis = [
  { value: 1, emoji: '😴', label: 'Muito Cansado', color: '#ef4444' },
  { value: 2, emoji: '😮‍💨', label: 'Estressado', color: '#f97316' },
  { value: 3, emoji: '😐', label: 'Neutro', color: '#eab308' },
  { value: 4, emoji: '😌', label: 'Relaxado', color: '#22c55e' },
  { value: 5, emoji: '🧘‍♀️', label: 'Zen Total', color: '#3b82f6' },
];

const relaxationTips = {
  1: "Tente uma respiração profunda: inspire por 4, segure por 7, expire por 8",
  2: "Que tal uma meditação de 5 minutos? Foque na sua respiração",
  3: "Um banho morno pode ajudar a relaxar antes de dormir",
  4: "Continue assim! Talvez um chá calmante complete seu relaxamento",
  5: "Perfeito! Você está no estado ideal para um sono reparador",
};

export function MoodTracker() {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'relaxation' | 'energy' | 'sleep' | 'stress'>('relaxation');

  useEffect(() => {
    // Load mood history from localStorage
    const savedHistory = localStorage.getItem('sono-zen-mood-history');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      relaxationLevel: currentMood,
      energyLevel: Math.floor(Math.random() * 5) + 1, // Simulated for demo
      sleepQuality: Math.floor(Math.random() * 5) + 1, // Simulated for demo
      stressLevel: 6 - currentMood, // Inverse of relaxation
      emoji: moodEmojis[currentMood - 1].emoji,
      notes: '',
    };

    const updatedHistory = [newEntry, ...moodHistory.slice(0, 29)]; // Keep last 30 entries
    setMoodHistory(updatedHistory);
    localStorage.setItem('sono-zen-mood-history', JSON.stringify(updatedHistory));
  };

  const getWeeklyAverage = () => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekEntries = moodHistory.filter(entry => entry.timestamp > weekAgo);
    if (weekEntries.length === 0) return 0;
    
    const sum = weekEntries.reduce((acc, entry) => acc + entry.relaxationLevel, 0);
    return (sum / weekEntries.length).toFixed(1);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'stable';
    
    const recent = moodHistory.slice(0, 3);
    const older = moodHistory.slice(3, 6);
    
    if (recent.length === 0 || older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.relaxationLevel, 0) / recent.length;
    const olderAvg = older.reduce((acc, entry) => acc + entry.relaxationLevel, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.5) return 'improving';
    if (recentAvg < olderAvg - 0.5) return 'declining';
    return 'stable';
  };

  const currentMoodData = moodEmojis[currentMood - 1];
  const weeklyAverage = getWeeklyAverage();
  const trend = getMoodTrend();

  return (
    <section id="mood-tracker" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)]/5 to-[var(--celestial-blue)]/5"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-4 py-2 rounded-full mb-6">
            <Heart className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] font-semibold">Monitor de Relaxamento</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Como Está Seu{' '}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Relaxamento
            </span>{' '}
            Hoje?
          </h2>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Acompanhe seu estado de relaxamento e receba insights personalizados para melhorar seu sono
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Mood Selector */}
          <div className="bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
              Selecione Seu Estado Atual
            </h3>
            
            {/* Current Mood Display */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-bounce-gentle">
                {currentMoodData.emoji}
              </div>
              <div 
                className="text-2xl font-semibold mb-2"
                style={{ color: currentMoodData.color }}
              >
                {currentMoodData.label}
              </div>
              <div className="text-[var(--text-secondary)]">
                Nível {currentMood}/5
              </div>
            </div>

            {/* Mood Selector */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setCurrentMood(mood.value)}
                  className={`
                    p-4 rounded-xl text-3xl transition-all duration-300 border-2
                    ${currentMood === mood.value 
                      ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/20 scale-110' 
                      : 'border-transparent hover:border-[var(--accent-blue)]/50 hover:bg-[var(--accent-blue)]/10'
                    }
                  `}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>

            {/* Save Button */}
            <button
              onClick={saveMoodEntry}
              className="w-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              Registrar Estado
            </button>

            {/* Relaxation Tip */}
            <div className="mt-6 p-4 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-[var(--warm-accent)] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[var(--warm-accent)] mb-1">
                    Dica Personalizada
                  </h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {relaxationTips[currentMood as keyof typeof relaxationTips]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                Seus Insights
              </h3>
              <button
                onClick={() => setShowInsights(!showInsights)}
                className="text-[var(--accent-blue)] hover:text-[var(--celestial-blue)] transition-colors"
              >
                <BarChart3 className="h-6 w-6" />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--celestial-blue)]/10 border border-[var(--accent-blue)]/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[var(--accent-blue)] mb-1">
                  {weeklyAverage || '--'}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  Média Semanal
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/20 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-1">
                  {trend === 'improving' && <TrendingUp className="h-6 w-6 text-green-400" />}
                  {trend === 'declining' && <TrendingUp className="h-6 w-6 text-red-400 rotate-180" />}
                  {trend === 'stable' && <Star className="h-6 w-6 text-[var(--warm-accent)]" />}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {trend === 'improving' && 'Melhorando'}
                  {trend === 'declining' && 'Atenção'}
                  {trend === 'stable' && 'Estável'}
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">
                Histórico Recente
              </h4>
              
              {moodHistory.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  <Moon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Comece registrando seu primeiro estado de relaxamento</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {moodHistory.slice(0, 7).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-[var(--card-bg)]/50 rounded-lg border border-[var(--border-subtle)]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{entry.emoji}</span>
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">
                            {moodEmojis[entry.relaxationLevel - 1].label}
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {new Date(entry.timestamp).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[var(--accent-blue)]">
                          {entry.relaxationLevel}/5
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        {moodHistory.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--celestial-blue)]/10 border border-[var(--warm-accent)]/30 px-6 py-3 rounded-full">
              <Zap className="h-5 w-5 text-[var(--warm-accent)]" />
              <span className="text-[var(--text-primary)] font-medium">
                Continue acompanhando seu progresso para insights mais precisos!
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}