import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Clock, 
  Moon, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Heart,
  Zap,
  Target,
  Coffee,
  Smartphone,
  Home,
  Bed,
  Sun,
  ChevronLeft,
  Timer,
  Activity,
  Lightbulb
} from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

interface QuizAnswer {
  id: string;
  text: string;
  value: number;
  category: string;
}

interface QuizQuestion {
  id: string;
  title: string;
  description: string;
  type: "single" | "scale" | "multiple";
  answers: QuizAnswer[];
  icon: React.ReactNode;
}

interface ProfileData {
  name: string;
  answers: Record<string, any>;
  score: number;
  profile: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "sleep_quality",
    title: "Como você avalia a qualidade do seu sono atualmente?",
    description: "Seja honesto sobre como você se sente em relação ao seu sono nos últimos 30 dias",
    type: "single",
    icon: <Moon className="h-6 w-6" />,
    answers: [
      { id: "excellent", text: "Excelente - Durmo bem e acordo descansado", value: 5, category: "quality" },
      { id: "good", text: "Bom - Geralmente durmo bem, mas poderia melhorar", value: 4, category: "quality" },
      { id: "fair", text: "Regular - Alguns dias bons, outros nem tanto", value: 3, category: "quality" },
      { id: "poor", text: "Ruim - Frequentemente tenho problemas para dormir", value: 2, category: "quality" },
      { id: "terrible", text: "Terrível - Raramente consigo ter uma boa noite de sono", value: 1, category: "quality" }
    ]
  },
  {
    id: "sleep_time",
    title: "Quanto tempo você leva para adormecer após deitar?",
    description: "Considere o tempo médio desde quando você se deita até realmente adormecer",
    type: "single",
    icon: <Timer className="h-6 w-6" />,
    answers: [
      { id: "fast", text: "Menos de 10 minutos - Adormeço rapidamente", value: 5, category: "onset" },
      { id: "normal", text: "10-20 minutos - Tempo normal", value: 4, category: "onset" },
      { id: "moderate", text: "20-30 minutos - Um pouco demorado", value: 3, category: "onset" },
      { id: "slow", text: "30-60 minutos - Demoro bastante", value: 2, category: "onset" },
      { id: "very_slow", text: "Mais de 1 hora - Muito difícil adormecer", value: 1, category: "onset" }
    ]
  },
  {
    id: "night_awakenings",
    title: "Com que frequência você acorda durante a noite?",
    description: "Pense em quantas vezes você desperta completamente durante uma noite típica",
    type: "single",
    icon: <Activity className="h-6 w-6" />,
    answers: [
      { id: "never", text: "Nunca - Durmo a noite toda", value: 5, category: "continuity" },
      { id: "rarely", text: "Raramente - 1 vez por semana ou menos", value: 4, category: "continuity" },
      { id: "sometimes", text: "Às vezes - 2-3 vezes por semana", value: 3, category: "continuity" },
      { id: "often", text: "Frequentemente - 4-5 vezes por semana", value: 2, category: "continuity" },
      { id: "always", text: "Sempre - Toda noite acordo várias vezes", value: 1, category: "continuity" }
    ]
  },
  {
    id: "stress_level",
    title: "Qual seu nível de estresse/ansiedade na hora de dormir?",
    description: "Como você se sente mentalmente quando vai para a cama",
    type: "scale",
    icon: <Zap className="h-6 w-6" />,
    answers: [
      { id: "1", text: "1 - Muito calmo", value: 1, category: "stress" },
      { id: "2", text: "2", value: 2, category: "stress" },
      { id: "3", text: "3", value: 3, category: "stress" },
      { id: "4", text: "4", value: 4, category: "stress" },
      { id: "5", text: "5", value: 5, category: "stress" },
      { id: "6", text: "6", value: 6, category: "stress" },
      { id: "7", text: "7", value: 7, category: "stress" },
      { id: "8", text: "8", value: 8, category: "stress" },
      { id: "9", text: "9", value: 9, category: "stress" },
      { id: "10", text: "10 - Muito ansioso", value: 10, category: "stress" }
    ]
  },
  {
    id: "morning_feeling",
    title: "Como você se sente ao acordar pela manhã?",
    description: "Sua sensação típica nos primeiros 30 minutos após acordar",
    type: "single",
    icon: <Sun className="h-6 w-6" />,
    answers: [
      { id: "energized", text: "Energizado e revigorado - Pronto para o dia", value: 5, category: "recovery" },
      { id: "refreshed", text: "Descansado - Me sinto bem", value: 4, category: "recovery" },
      { id: "okay", text: "Normal - Nem bem nem mal", value: 3, category: "recovery" },
      { id: "tired", text: "Cansado - Preciso de mais sono", value: 2, category: "recovery" },
      { id: "exhausted", text: "Exausto - Como se não tivesse dormido", value: 1, category: "recovery" }
    ]
  },
  {
    id: "bedtime_routine",
    title: "Você tem uma rotina estabelecida antes de dormir?",
    description: "Atividades consistentes que você faz todas as noites antes de deitar",
    type: "single",
    icon: <Bed className="h-6 w-6" />,
    answers: [
      { id: "consistent", text: "Sim, tenho uma rotina bem definida e sigo sempre", value: 5, category: "habits" },
      { id: "mostly", text: "Sim, mas nem sempre consigo seguir", value: 4, category: "habits" },
      { id: "basic", text: "Tenho algumas coisas que faço, mas não é estruturado", value: 3, category: "habits" },
      { id: "minimal", text: "Raramente - só escovo os dentes e vou dormir", value: 2, category: "habits" },
      { id: "none", text: "Não, vario muito o que faço antes de dormir", value: 1, category: "habits" }
    ]
  },
  {
    id: "screen_time",
    title: "Quanto tempo antes de dormir você para de usar telas?",
    description: "Celular, TV, computador, tablet - qualquer dispositivo com tela",
    type: "single",
    icon: <Smartphone className="h-6 w-6" />,
    answers: [
      { id: "early", text: "2+ horas antes - Evito telas à noite", value: 5, category: "habits" },
      { id: "good", text: "1-2 horas antes - Tenho disciplina com isso", value: 4, category: "habits" },
      { id: "moderate", text: "30-60 minutos antes - Às vezes esqueço", value: 3, category: "habits" },
      { id: "late", text: "15-30 minutos antes - Difícil parar de usar", value: 2, category: "habits" },
      { id: "never", text: "Uso até a hora de dormir - Durmo com o celular", value: 1, category: "habits" }
    ]
  },
  {
    id: "caffeine_intake",
    title: "Quando você costuma tomar sua última dose de cafeína?",
    description: "Café, chá, refrigerante, energético - qualquer bebida com cafeína",
    type: "single",
    icon: <Coffee className="h-6 w-6" />,
    answers: [
      { id: "morning", text: "Só pela manhã - Até 12h", value: 5, category: "lifestyle" },
      { id: "afternoon", text: "Tarde - Até 15h", value: 4, category: "lifestyle" },
      { id: "late_afternoon", text: "Final da tarde - Até 17h", value: 3, category: "lifestyle" },
      { id: "evening", text: "Início da noite - Até 19h", value: 2, category: "lifestyle" },
      { id: "night", text: "À noite - Depois das 19h", value: 1, category: "lifestyle" }
    ]
  },
  {
    id: "sleep_environment",
    title: "Como você avalia seu ambiente de sono?",
    description: "Temperatura, ruído, luminosidade, conforto da cama",
    type: "single",
    icon: <Home className="h-6 w-6" />,
    answers: [
      { id: "perfect", text: "Perfeito - Escuro, silencioso e temperatura ideal", value: 5, category: "environment" },
      { id: "good", text: "Bom - Apenas pequenos ajustes necessários", value: 4, category: "environment" },
      { id: "okay", text: "Razoável - Alguns problemas ocasionais", value: 3, category: "environment" },
      { id: "poor", text: "Ruim - Vários fatores atrapalham", value: 2, category: "environment" },
      { id: "terrible", text: "Terrível - Ambiente totalmente inadequado", value: 1, category: "environment" }
    ]
  },
  {
    id: "sleep_goals",
    title: "Qual é seu principal objetivo com o sono?",
    description: "O que você mais gostaria de alcançar melhorando seu sono",
    type: "single",
    icon: <Target className="h-6 w-6" />,
    answers: [
      { id: "fall_asleep", text: "Adormecer mais rapidamente", value: 1, category: "goals" },
      { id: "stay_asleep", text: "Dormir a noite toda sem acordar", value: 2, category: "goals" },
      { id: "wake_refreshed", text: "Acordar mais descansado e energizado", value: 3, category: "goals" },
      { id: "reduce_stress", text: "Reduzir ansiedade e estresse noturno", value: 4, category: "goals" },
      { id: "establish_routine", text: "Criar uma rotina saudável de sono", value: 5, category: "goals" }
    ]
  }
];

const sleepProfiles = {
  excellent: {
    title: "Especialista em Sono",
    description: "Você já tem excelentes hábitos de sono! O Método Sono Zen vai aprimorar ainda mais sua qualidade de descanso.",
    color: "from-emerald-400 to-teal-500",
    recommendations: [
      "Técnicas avançadas de meditação oriental",
      "Rotinas de sono para manter a consistência",
      "Métodos para sono ainda mais reparador"
    ]
  },
  good: {
    title: "Praticante do Sono",
    description: "Você tem uma boa base! Com alguns ajustes personalizados, chegará ao sono perfeito.",
    color: "from-blue-400 to-cyan-500",
    recommendations: [
      "Refinamento da rotina noturna",
      "Técnicas de respiração orientais",
      "Otimização do ambiente de sono"
    ]
  },
  moderate: {
    title: "Aprendiz do Descanso",
    description: "Há espaço para melhorias significativas. O método foi desenvolvido especialmente para pessoas como você.",
    color: "from-amber-400 to-orange-500",
    recommendations: [
      "Estabelecimento de rotina estruturada",
      "Técnicas de relaxamento profundo",
      "Estratégias para reduzir ansiedade noturna"
    ]
  },
  poor: {
    title: "Guerreiro do Sono",
    description: "Você enfrenta desafios sérios com o sono. Nossa abordagem intensiva trará a transformação que precisa.",
    color: "from-red-400 to-pink-500",
    recommendations: [
      "Protocolo intensivo de 7 noites",
      "Técnicas orientais para insônia",
      "Recondicionamento completo dos hábitos"
    ]
  }
};

export function SleepPlanningSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    answers: {},
    score: 0,
    profile: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Animate when step changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentStep]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    const question = quizQuestions.find(q => q.id === questionId);
    const answer = question?.answers.find(a => a.id === answerId);
    
    if (answer) {
      setProfileData(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: answer
        }
      }));

      // Auto-advance to next question after a short delay
      setTimeout(() => {
        if (currentStep < quizQuestions.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Last question, analyze profile
          analyzeProfile();
        }
      }, 800);
    }
  };



  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const analyzeProfile = async () => {
    setIsAnalyzing(true);
    
    // Calcular score
    const totalAnswers = Object.values(profileData.answers);
    const totalScore = totalAnswers.reduce((sum, answer) => sum + answer.value, 0);
    const averageScore = totalScore / totalAnswers.length;
    
    // Determinar perfil
    let profile = "";
    if (averageScore >= 4.5) profile = "excellent";
    else if (averageScore >= 3.5) profile = "good";
    else if (averageScore >= 2.5) profile = "moderate";
    else profile = "poor";
    
    // Simular análise da IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProfileData(prev => ({
      ...prev,
      score: averageScore,
      profile
    }));
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setProfileData({
      name: "",
      answers: {},
      score: 0,
      profile: ""
    });
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const scrollToPreview = () => {
    const element = document.getElementById("preview-video");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const currentQuestion = quizQuestions[currentStep];
  const isCurrentAnswered = currentQuestion && profileData.answers[currentQuestion.id];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  // Render Results
  if (showResults && profileData.profile) {
    const profile = sleepProfiles[profileData.profile as keyof typeof sleepProfiles];
    
    return (
      <section id="planejamento-sono" className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
        <FloatingClouds />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full mb-6 animate-pulse">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold">Sono Zen AI - Análise Completa</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Seu Perfil: {" "}
              <span className={`bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                {profile.title}
              </span>
            </h2>

            <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/70 bg-[var(--card-bg)]/30 px-4 py-2 rounded-full border border-[var(--border-subtle)]">
              <Brain className="h-4 w-4 text-[var(--accent-blue)]" />
              <span>Baseado em análise científica da Sono Zen AI</span>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-[var(--card-bg)]/90 to-[var(--card-bg)]/70 backdrop-blur-sm border border-[var(--border-subtle)] mb-8 transform transition-all duration-700 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${profile.color} flex items-center justify-center animate-pulse`}>
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                  {profile.description}
                </p>
                
                <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/30 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Seu Plano Personalizado Inclui:
                  </h4>
                  <div className="space-y-3">
                    {profile.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-3 transform transition-all duration-300 hover:scale-105">
                        <div className="w-2 h-2 bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] rounded-full animate-pulse"></div>
                        <span className="text-[var(--text-secondary)]">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToPreview}
                  className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105 group"
                >
                  <Lightbulb className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Ver Demonstração do Método
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--card-bg)] px-6 py-4 rounded-xl"
                >
                  Refazer Análise
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Render Analysis Loading
  if (isAnalyzing) {
    return (
      <section id="planejamento-sono" className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
        <FloatingClouds />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Card className="bg-gradient-to-br from-[var(--card-bg)]/90 to-[var(--card-bg)]/70 backdrop-blur-sm border border-[var(--border-subtle)]">
            <CardContent className="p-12 text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto">
                  <div className="animate-spin rounded-full h-32 w-32 border-4 border-[var(--accent-blue)]/30 border-t-[var(--accent-blue)]"></div>
                  <Brain className="h-16 w-16 text-[var(--accent-blue)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Sono Zen AI Analisando...
              </h3>
              
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Nossa inteligência artificial está processando suas respostas e criando seu perfil personalizado
              </p>
              
              <div className="space-y-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 transform transition-all duration-500 hover:scale-105">
                  <div className="w-3 h-3 bg-[var(--accent-blue)] rounded-full animate-bounce"></div>
                  <p className="text-lg">🧠 Analisando padrões neurológicos de sono...</p>
                </div>
                <div className="flex items-center justify-center gap-3 transform transition-all duration-500 hover:scale-105" style={{animationDelay: '0.2s'}}>
                  <div className="w-3 h-3 bg-[var(--warm-accent)] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <p className="text-lg">🔍 Identificando seu perfil único de descanso...</p>
                </div>
                <div className="flex items-center justify-center gap-3 transform transition-all duration-500 hover:scale-105" style={{animationDelay: '0.4s'}}>
                  <div className="w-3 h-3 bg-[var(--celestial-blue)] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  <p className="text-lg">📋 Calibrando técnicas orientais personalizadas...</p>
                </div>
                <div className="flex items-center justify-center gap-3 transform transition-all duration-500 hover:scale-105" style={{animationDelay: '0.6s'}}>
                  <div className="w-3 h-3 bg-[var(--mint-green)] rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
                  <p className="text-lg">✨ Finalizando protocolo de transformação...</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/60">
                  <Sparkles className="h-4 w-4 text-[var(--warm-accent)] animate-pulse" />
                  <span>Powered by Sono Zen AI</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="planejamento-sono" className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Brain className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] font-semibold">Sono Zen AI</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6">
            Avaliação Inteligente do{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Seu Perfil de Sono
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-6">
            Nossa <strong>Inteligência Artificial especializada</strong> irá analisar 10 aspectos científicos do seu sono para criar um protocolo personalizado exclusivo para sua transformação
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/80 bg-[var(--card-bg)]/30 px-4 py-2 rounded-full border border-[var(--border-subtle)]">
            <Sparkles className="h-4 w-4 text-[var(--warm-accent)]" />
            <span>Powered by Sono Zen AI</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-2">
            <span>Pergunta {currentStep + 1} de {quizQuestions.length}</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <div className="w-full bg-[var(--card-bg)]/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Question */}
        <Card 
          key={animationKey}
          className="bg-gradient-to-br from-[var(--card-bg)]/90 to-[var(--card-bg)]/70 backdrop-blur-sm border border-[var(--border-subtle)] mb-8 transform transition-all duration-700 animate-in slide-in-from-right-4 fade-in"
        >
          <CardContent className="p-8">
            {/* Question Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 rounded-full flex items-center justify-center border border-[var(--accent-blue)]/30 transform transition-all duration-300 hover:scale-110">
                {currentQuestion.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight">
                {currentQuestion.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {currentQuestion.description}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.type === "scale" ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {currentQuestion.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                      variant={profileData.answers[currentQuestion.id]?.id === answer.id ? "default" : "outline"}
                      className={`
                        h-12 transition-all duration-300 transform hover:scale-105
                        ${profileData.answers[currentQuestion.id]?.id === answer.id 
                          ? 'bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white border-none shadow-lg scale-105' 
                          : 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--card-bg)] hover:border-[var(--accent-blue)]/50'
                        }
                      `}
                    >
                      {answer.text}
                    </Button>
                  ))}
                </div>
              ) : (
                currentQuestion.answers.map((answer) => (
                  <Button
                    key={answer.id}
                    onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                    variant="outline"
                    className={`
                      w-full p-4 h-auto text-left justify-start transition-all duration-300 transform hover:scale-[1.02]
                      ${profileData.answers[currentQuestion.id]?.id === answer.id 
                        ? 'bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-lg scale-[1.02]' 
                        : 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--card-bg)] hover:border-[var(--accent-blue)]/50'
                      }
                    `}
                  >
                    <div className="flex items-center w-full">
                      <div className={`
                        w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 transition-all duration-300
                        ${profileData.answers[currentQuestion.id]?.id === answer.id 
                          ? 'bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] border-transparent' 
                          : 'border-[var(--border-subtle)]'
                        }
                      `}>
                        {profileData.answers[currentQuestion.id]?.id === answer.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{answer.text}</span>
                    </div>
                  </Button>
                ))
              )}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center items-center mt-8">
              <div className="flex space-x-2">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] scale-110' 
                        : 'bg-[var(--card-hover)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* AI Instruction */}
            <div className="text-center mt-6">
              <p className="text-sm text-[var(--text-secondary)]/80 flex items-center justify-center gap-2">
                <Brain className="h-4 w-4 text-[var(--accent-blue)] animate-pulse" />
                Selecione uma resposta - a Sono Zen AI avançará automaticamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}