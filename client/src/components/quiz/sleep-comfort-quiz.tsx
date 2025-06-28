import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Moon, Star, Cloud, Sun, Zap, Heart, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { FloatingStars } from "@/components/ui/floating-stars";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    icon: React.ReactNode;
    value: string;
  }[];
}

interface QuizResult {
  type: string;
  title: string;
  description: string;
  recommendations: string[];
  color: string;
  icon: React.ReactNode;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "sleep_time",
    question: "Que horas você costuma ir dormir?",
    options: [
      { id: "early", text: "Antes das 22h", icon: <Sun className="h-5 w-5" />, value: "early_bird" },
      { id: "normal", text: "Entre 22h e 24h", icon: <Moon className="h-5 w-5" />, value: "normal" },
      { id: "late", text: "Depois da meia-noite", icon: <Star className="h-5 w-5" />, value: "night_owl" }
    ]
  },
  {
    id: "fall_asleep",
    question: "Quanto tempo você leva para adormecer?",
    options: [
      { id: "fast", text: "Menos de 15 minutos", icon: <Zap className="h-5 w-5" />, value: "fast_sleeper" },
      { id: "medium", text: "15 a 30 minutos", icon: <Cloud className="h-5 w-5" />, value: "medium_sleeper" },
      { id: "slow", text: "Mais de 30 minutos", icon: <Moon className="h-5 w-5" />, value: "slow_sleeper" }
    ]
  },
  {
    id: "wake_frequency",
    question: "Quantas vezes você acorda durante a noite?",
    options: [
      { id: "never", text: "Raramente acordo", icon: <Heart className="h-5 w-5" />, value: "deep_sleeper" },
      { id: "sometimes", text: "1-2 vezes", icon: <Cloud className="h-5 w-5" />, value: "light_sleeper" },
      { id: "often", text: "3+ vezes", icon: <Star className="h-5 w-5" />, value: "restless_sleeper" }
    ]
  },
  {
    id: "morning_feeling",
    question: "Como você se sente ao acordar?",
    options: [
      { id: "refreshed", text: "Descansado e energizado", icon: <Sun className="h-5 w-5" />, value: "good_sleeper" },
      { id: "tired", text: "Ainda cansado", icon: <Cloud className="h-5 w-5" />, value: "poor_sleeper" },
      { id: "groggy", text: "Sonolento e confuso", icon: <Moon className="h-5 w-5" />, value: "very_poor_sleeper" }
    ]
  },
  {
    id: "stress_level",
    question: "Como está seu nível de estresse antes de dormir?",
    options: [
      { id: "low", text: "Calmo e relaxado", icon: <Heart className="h-5 w-5" />, value: "relaxed" },
      { id: "medium", text: "Um pouco ansioso", icon: <Cloud className="h-5 w-5" />, value: "moderate_stress" },
      { id: "high", text: "Muito estressado", icon: <Zap className="h-5 w-5" />, value: "high_stress" }
    ]
  }
];

const quizResults: Record<string, QuizResult> = {
  excellent: {
    type: "excellent",
    title: "Dorminhoco Zen 🌙",
    description: "Você já tem ótimos hábitos de sono! O Método Sono Zen pode ajudar você a otimizar ainda mais sua qualidade de descanso.",
    recommendations: [
      "Continue mantendo horários regulares",
      "Aprimore suas técnicas de relaxamento",
      "Explore meditações guiadas para sono profundo"
    ],
    color: "from-emerald-500 to-teal-500",
    icon: <Heart className="h-8 w-8" />
  },
  good: {
    type: "good",
    title: "Aprendiz do Sono 🌟",
    description: "Você tem uma base boa, mas há espaço para melhorias significativas em sua qualidade de sono.",
    recommendations: [
      "Estabeleça uma rotina noturna consistente",
      "Pratique técnicas de respiração antes de dormir",
      "Reduza estímulos eletrônicos 1h antes de deitar"
    ],
    color: "from-blue-500 to-cyan-500",
    icon: <Star className="h-8 w-8" />
  },
  moderate: {
    type: "moderate",
    title: "Buscador de Tranquilidade 🌙",
    description: "Seu sono precisa de atenção especial. O Método Sono Zen foi criado exatamente para pessoas como você!",
    recommendations: [
      "Implemente rituais relaxantes antes de dormir",
      "Aprenda técnicas orientais de acalmamento mental",
      "Crie um ambiente mais propício ao sono profundo"
    ],
    color: "from-purple-500 to-indigo-500",
    icon: <Cloud className="h-8 w-8" />
  },
  poor: {
    type: "poor",
    title: "Guerreiro da Insônia 💪",
    description: "Você enfrenta desafios significativos com o sono, mas há esperança! Muitas pessoas com seu perfil transformaram suas noites com o Método Sono Zen.",
    recommendations: [
      "Priorize técnicas de redução de ansiedade",
      "Estabeleça um ritual noturno de 30 minutos",
      "Use sons relaxantes e frequências específicas",
      "Pratique exercícios de mindfulness antes de dormir"
    ],
    color: "from-orange-500 to-red-500",
    icon: <Zap className="h-8 w-8" />
  }
};

export function SleepComfortQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => calculateResult(newAnswers), 300);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const scores = {
      excellent: 0,
      good: 0,
      moderate: 0,
      poor: 0
    };

    // Scoring logic based on answers
    Object.values(finalAnswers).forEach(answer => {
      switch (answer) {
        case "early_bird":
        case "fast_sleeper":
        case "deep_sleeper":
        case "good_sleeper":
        case "relaxed":
          scores.excellent += 2;
          scores.good += 1;
          break;
        case "normal":
        case "medium_sleeper":
        case "light_sleeper":
        case "moderate_stress":
          scores.good += 2;
          scores.moderate += 1;
          break;
        case "night_owl":
        case "slow_sleeper":
        case "poor_sleeper":
          scores.moderate += 2;
          scores.poor += 1;
          break;
        case "restless_sleeper":
        case "very_poor_sleeper":
        case "high_stress":
          scores.poor += 2;
          scores.moderate += 1;
          break;
      }
    });

    // Determine result type
    const resultType = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    setResult(quizResults[resultType]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult && result) {
    return (
      <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 via-transparent to-[var(--warm-accent)]/5"></div>
        <FloatingClouds className="opacity-5" />
        <FloatingStars className="opacity-10" density="light" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${result.color} mb-6`}>
              <div className="text-white">
                {result.icon}
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              {result.title}
            </h2>
            
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          <Card className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-subtle)] mb-8">
            <CardHeader>
              <CardTitle className="text-[var(--text-primary)] text-center">
                🎯 Suas Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--card-hover)] border border-[var(--border-subtle)]">
                    <CheckCircle className="h-5 w-5 text-[var(--success-green)] flex-shrink-0" />
                    <span className="text-[var(--text-secondary)]">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/30 rounded-lg p-6">
              <p className="text-[var(--accent-blue)] font-semibold mb-4">
                ✨ O Método Sono Zen foi desenvolvido especificamente para pessoas com seu perfil de sono!
              </p>
              <Button 
                onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] hover:from-[var(--accent-blue)]/90 hover:to-[var(--warm-accent)]/90 text-white px-8 py-3 rounded-xl text-lg font-semibold mr-4 mb-2"
              >
                <Moon className="h-5 w-5 mr-2" />
                Transformar Meu Sono Agora
              </Button>
              
              <Button 
                onClick={resetQuiz}
                variant="outline"
                className="border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--card-hover)] px-6 py-3 rounded-xl"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refazer Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 via-transparent to-[var(--warm-accent)]/5"></div>
      <FloatingClouds className="opacity-5" />
      <FloatingStars className="opacity-10" density="light" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-[var(--accent-blue)]" />
            <span className="text-sm text-[var(--text-secondary)] font-medium">Quiz Personalizado</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Descubra Seu Perfil de Sono
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Responda algumas perguntas e receba recomendações personalizadas para melhorar sua qualidade de sono
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[var(--text-muted)]">Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
            <span className="text-sm text-[var(--text-muted)]">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[var(--card-hover)]" />
        </div>

        {/* Question Card */}
        <Card className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-subtle)] mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--text-primary)] text-center">
              {quizQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                  variant="outline"
                  className="flex items-center gap-3 p-6 h-auto text-left justify-start border-[var(--border-subtle)] hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all duration-300 group"
                >
                  <div className="text-[var(--accent-blue)] group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </div>
                  <span className="font-medium">{option.text}</span>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index <= currentQuestion 
                    ? 'bg-[var(--accent-blue)]' 
                    : 'bg-[var(--card-hover)]'
                }`}
              />
            ))}
          </div>
          
          <div className="text-sm text-[var(--text-muted)]">
            ✨ Suas respostas são completamente privadas
          </div>
        </div>
      </div>
    </section>
  );
}