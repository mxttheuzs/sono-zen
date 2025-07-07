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
    question: "Me conta, que horas você costuma ir pra cama?",
    options: [
      { id: "early", text: "💤 Sou das antigas... antes das 22h", icon: <Sun className="h-5 w-5" />, value: "early_bird" },
      { id: "normal", text: "🌙 Normal, entre 22h e meia-noite", icon: <Moon className="h-5 w-5" />, value: "normal" },
      { id: "late", text: "🦉 Coruja da madrugada (depois da meia-noite)", icon: <Star className="h-5 w-5" />, value: "night_owl" }
    ]
  },
  {
    id: "fall_asleep",
    question: "Quando você deita na cama, quanto tempo demora pra pegar no sono?",
    options: [
      { id: "fast", text: "⚡ Rapidinho! Caio no sono fácil", icon: <Zap className="h-5 w-5" />, value: "fast_sleeper" },
      { id: "medium", text: "🤔 Uns 15-30 minutinhos", icon: <Cloud className="h-5 w-5" />, value: "medium_sleeper" },
      { id: "slow", text: "😴 Ai, demoro mais de meia hora", icon: <Moon className="h-5 w-5" />, value: "slow_sleeper" }
    ]
  },
  {
    id: "wake_frequency",
    question: "Durante a noite, você costuma acordar?",
    options: [
      { id: "never", text: "💙 Raramente! Durmo que nem um bebê", icon: <Heart className="h-5 w-5" />, value: "deep_sleeper" },
      { id: "sometimes", text: "😊 Às vezes acordo 1 ou 2 vezes", icon: <Cloud className="h-5 w-5" />, value: "light_sleeper" },
      { id: "often", text: "😵 Fico acordando várias vezes", icon: <Star className="h-5 w-5" />, value: "restless_sleeper" }
    ]
  },
  {
    id: "morning_feeling",
    question: "E de manhã? Como você se sente quando acorda?",
    options: [
      { id: "refreshed", text: "☀️ Top! Acordo bem disposto e animado", icon: <Sun className="h-5 w-5" />, value: "good_sleeper" },
      { id: "tired", text: "😪 Acordo meio cansado ainda, sabe?", icon: <Cloud className="h-5 w-5" />, value: "poor_sleeper" },
      { id: "groggy", text: "🥱 Destruído... não dormi nada", icon: <Moon className="h-5 w-5" />, value: "very_poor_sleeper" }
    ]
  },
  {
    id: "stress_level",
    question: "Na hora de dormir, como anda sua cabeça?",
    options: [
      { id: "low", text: "😌 Tranquilo, consigo relaxar bem", icon: <Heart className="h-5 w-5" />, value: "relaxed" },
      { id: "medium", text: "😅 Meio ansioso, mas nada demais", icon: <Cloud className="h-5 w-5" />, value: "moderate_stress" },
      { id: "high", text: "😰 Muito estressado, a mente não para!", icon: <Zap className="h-5 w-5" />, value: "high_stress" }
    ]
  }
];

const quizResults: Record<string, QuizResult> = {
  excellent: {
    type: "excellent",
    title: "Você é um Dorminhoco dos Sonhos! 🌟",
    description: "Que inveja boa! Você já tem hábitos lindos de sono. O Método Sono Zen vai ser aquele 'plus' pra você dormir ainda melhor e acordar se sentindo uma nova pessoa.",
    recommendations: [
      "💫 Continue com seus horários certinhos",
      "🧘‍♀️ Vamos aprimorar suas técnicas de relaxamento",
      "🌙 Que tal explorar meditações mais profundas?"
    ],
    color: "from-[var(--mint-green)] to-[var(--celestial-blue)]",
    icon: <Heart className="h-8 w-8" />
  },
  good: {
    type: "good",
    title: "Você tá no Caminho Certo! 😊",
    description: "Olha, você tem uma base boa! Só precisa de alguns ajustes pra transformar suas noites. Muita gente com seu perfil teve resultados incríveis em poucos dias.",
    recommendations: [
      "🌙 Vamos criar uma rotina noturna gostosa",
      "🫁 Respirações especiais antes de dormir vão te ajudar muito",
      "📱 Que tal dar um tempo no celular 1h antes de deitar?"
    ],
    color: "from-[var(--sky-blue)] to-[var(--celestial-blue)]",
    icon: <Star className="h-8 w-8" />
  },
  moderate: {
    type: "moderate",
    title: "Você Veio ao Lugar Certo! 🤗",
    description: "Seu sono precisa de um carinho especial, né? Relaxa, o Método Sono Zen foi criado pensando exatamente em pessoas como você. Você não está sozinho nisso!",
    recommendations: [
      "🛁 Rituais relaxantes vão virar seu momento sagrado",
      "🧘‍♂️ Técnicas orientais pra acalmar essa mente agitada",
      "🏠 Vamos transformar seu quarto no cantinho perfeito"
    ],
    color: "from-[var(--celestial-blue)] to-[var(--sky-blue)]",
    icon: <Cloud className="h-8 w-8" />
  },
  poor: {
    type: "poor",
    title: "Guerreiro, Você Merece Descansar! 💙",
    description: "Eu sei como é difícil... Passar noites em claro é muito pesado. Mas olha, MUITAS pessoas que estavam exatamente como você transformaram suas noites com o método. Sua vez chegou!",
    recommendations: [
      "😌 Primeiro, vamos trabalhar essa ansiedade na hora de dormir",
      "🕯️ Um ritual noturno de 30 minutinhos vai virar seu momento sagrado",
      "🎵 Sons relaxantes e frequências especiais vão acalmar sua mente",
      "🧘‍♀️ Mindfulness antes de dormir vai ser seu novo melhor amigo"
    ],
    color: "from-[var(--celestial-blue)] to-[var(--mint-green)]",
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
        
        <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
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
            <div className="bg-gradient-to-r from-[var(--celestial-blue)]/15 to-[var(--mint-green)]/10 border border-[var(--celestial-blue)]/40 rounded-lg p-6">
              <p className="text-[var(--celestial-blue)] font-semibold mb-4">
                🌟 Perfeito! O Método Sono Zen foi criado pensando exatamente em pessoas como você. Sua jornada para noites tranquilas começa agora!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button 
                  onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-gradient-to-r from-[var(--celestial-blue)] to-[var(--sky-blue)] hover:from-[var(--celestial-blue)]/90 hover:to-[var(--sky-blue)]/90 text-white px-4 sm:px-8 py-3 rounded-xl text-base sm:text-lg font-semibold"
                >
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-tight">
                    Quero Transformar Meu Sono!
                  </span>
                </Button>
                
                <Button 
                  onClick={resetQuiz}
                  variant="outline"
                  className="w-full sm:w-auto border-[var(--celestial-blue)]/30 text-[var(--celestial-blue)] hover:bg-[var(--celestial-blue)]/10 px-4 sm:px-6 py-3 rounded-xl"
                >
                  <RefreshCw className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    Fazer Novamente
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-1 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 via-transparent to-[var(--warm-accent)]/5"></div>
      <FloatingClouds className="opacity-5" />
      <FloatingStars className="opacity-10" density="light" />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10 quiz-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--celestial-blue)]/20 backdrop-blur-sm border border-[var(--celestial-blue)]/40 rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-[var(--celestial-blue)]" />
            <span className="text-sm text-[var(--celestial-blue)] font-medium">💤 Descubra Seu Tipo de Sono</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--cloud-white)] mb-4">
            Como Anda Seu Sono? 🤗
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Vamos conversar um pouquinho sobre seu sono? São só 5 perguntinhas rápidas pra eu te conhecer melhor e dar dicas personalizadas! 😊
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
        <Card className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-subtle)] mb-8 mx-1 sm:mx-0">
          <CardHeader className="pb-4 sm:pb-6 px-3 sm:px-6">
            <CardTitle className="text-base sm:text-xl text-[var(--text-primary)] text-center leading-tight px-2">
              {quizQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="grid gap-3 sm:gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                  variant="outline"
                  className="quiz-option-button flex items-start gap-2 sm:gap-3 p-3 sm:p-6 h-auto text-left justify-start border-[var(--border-subtle)] hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/5 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-all duration-300 group w-full min-h-[60px] sm:min-h-[70px] overflow-hidden"
                >
                  <div className="text-[var(--accent-blue)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-0.5">
                    {option.icon}
                  </div>
                  <span className="quiz-option-text font-medium text-sm sm:text-lg leading-tight flex-1 text-left break-words word-wrap overflow-wrap-anywhere pr-1">{option.text}</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-1 sm:mt-0" />
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