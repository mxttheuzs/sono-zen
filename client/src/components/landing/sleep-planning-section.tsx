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
    id: "sleep_pain",
    title: "Qual é a sua maior dor relacionada ao sono?",
    description: "Seja honesto sobre o que mais te incomoda na hora de dormir",
    type: "single",
    icon: <Moon className="h-6 w-6" />,
    answers: [
      { id: "cant_fall_asleep", text: "Fico horas acordado tentando dormir", value: 1, category: "pain" },
      { id: "wake_up_tired", text: "Acordo mais cansado do que quando fui dormir", value: 1, category: "pain" },
      { id: "wake_up_night", text: "Acordo várias vezes durante a noite", value: 1, category: "pain" },
      { id: "anxious_bedtime", text: "Fico ansioso só de pensar em ir para a cama", value: 1, category: "pain" },
      { id: "mind_racing", text: "Minha mente não para quando deito", value: 1, category: "pain" }
    ]
  },
  {
    id: "sleep_impact",
    title: "Como a falta de sono está afetando sua vida?",
    description: "Qual o impacto mais doloroso que você sente no dia a dia",
    type: "single",
    icon: <Brain className="h-6 w-6" />,
    answers: [
      { id: "work_performance", text: "Não consigo render no trabalho", value: 1, category: "impact" },
      { id: "relationships", text: "Estou irritado com as pessoas que amo", value: 1, category: "impact" },
      { id: "health_issues", text: "Sinto que minha saúde está piorando", value: 1, category: "impact" },
      { id: "no_energy", text: "Não tenho energia para nada", value: 1, category: "impact" },
      { id: "depression", text: "Me sinto triste e sem esperança", value: 1, category: "impact" }
    ]
  },
  {
    id: "desperation_level",
    title: "Há quanto tempo você sofre com o sono?",
    description: "O tempo que você carrega esse peso",
    type: "single",
    icon: <Clock className="h-6 w-6" />,
    answers: [
      { id: "few_weeks", text: "Algumas semanas", value: 3, category: "duration" },
      { id: "few_months", text: "Alguns meses", value: 2, category: "duration" },
      { id: "one_year", text: "Mais de um ano", value: 1, category: "duration" },
      { id: "years", text: "Vários anos... estou desesperado", value: 1, category: "duration" },
      { id: "always", text: "Sempre foi assim, não lembro de dormir bem", value: 1, category: "duration" }
    ]
  },
  {
    id: "failed_attempts",
    title: "O que você já tentou para melhorar seu sono?",
    description: "Quantas coisas você já testou sem sucesso",
    type: "single",
    icon: <Zap className="h-6 w-6" />,
    answers: [
      { id: "nothing", text: "Nada ainda, preciso de ajuda urgente", value: 1, category: "attempts" },
      { id: "few_things", text: "Algumas coisas, mas nada funciona", value: 1, category: "attempts" },
      { id: "many_things", text: "Muitas coisas, gastei muito dinheiro", value: 1, category: "attempts" },
      { id: "everything", text: "Já tentei de tudo, estou sem esperança", value: 1, category: "attempts" },
      { id: "medications", text: "Até remédios, mas não quero depender deles", value: 1, category: "attempts" }
    ]
  },
  {
    id: "urgency_level",
    title: "Quão urgente é resolver isso para você?",
    description: "O nível de desespero que você sente",
    type: "single",
    icon: <Heart className="h-6 w-6" />,
    answers: [
      { id: "very_urgent", text: "Extremamente urgente - não aguento mais", value: 1, category: "urgency" },
      { id: "urgent", text: "Urgente - preciso resolver logo", value: 2, category: "urgency" },
      { id: "important", text: "Importante - mas posso esperar um pouco", value: 3, category: "urgency" },
      { id: "moderate", text: "Moderado - gostaria de melhorar", value: 4, category: "urgency" },
      { id: "curious", text: "Curioso - só quero saber mais", value: 5, category: "urgency" }
    ]
  },
  {
    id: "dream_scenario",
    title: "Como seria sua vida se você dormisse perfeitamente?",
    description: "O que mudaria se você acordasse renovado todos os dias",
    type: "single",
    icon: <Sun className="h-6 w-6" />,
    answers: [
      { id: "energy_life", text: "Teria energia para viver plenamente", value: 3, category: "dream" },
      { id: "better_relationships", text: "Seria mais paciente com quem amo", value: 3, category: "dream" },
      { id: "career_success", text: "Seria mais produtivo e bem-sucedido", value: 3, category: "dream" },
      { id: "health_wellness", text: "Me sentiria saudável e em forma", value: 3, category: "dream" },
      { id: "happiness", text: "Seria genuinamente feliz novamente", value: 3, category: "dream" }
    ]
  }
];

const sleepProfiles = {
  critical: {
    title: "🔴 Perfil de Sono Crítico",
    subtitle: "Situação que requer atenção imediata",
    description: "Sua análise indica um padrão de sono severamente comprometido com impactos significativos na qualidade de vida. Há indicadores de que você tem enfrentado dificuldades prolongadas com tentativas anteriores de melhoria.",
    color: "from-red-400 to-rose-500",
    urgency: "SITUAÇÃO CRÍTICA IDENTIFICADA",
    transformation: "Requer abordagem intensiva e suporte profissional",
    recommendations: [
      "🏥 Considere consultar um especialista em medicina do sono",
      "📋 Avalie a possibilidade de um estudo do sono (polissonografia)",
      "💊 Discuta com médico sobre medicações temporárias se necessário",
      "🧘‍♂️ Técnicas de relaxamento profundo para reduzir ansiedade noturna",
      "📱 Higiene do sono rigorosa com eliminação de estimulantes"
    ]
  },
  moderate: {
    title: "🟡 Perfil de Sono Moderado", 
    subtitle: "Dificuldades significativas que podem ser melhoradas",
    description: "Você apresenta desafios moderados com o sono que têm impactado sua rotina. Suas respostas indicam que você já tentou algumas soluções e está buscando métodos mais eficazes.",
    color: "from-yellow-400 to-orange-500",
    urgency: "OPORTUNIDADE DE MELHORIA",
    transformation: "Resultados graduais com técnicas consistentes",
    recommendations: [
      "🌙 Estabeleça uma rotina de sono consistente e relaxante",
      "🧘‍♀️ Pratique técnicas de meditação e respiração antes de dormir",
      "📚 Estude e implemente princípios de higiene do sono",
      "⏰ Regule seu ciclo circadiano com exposição à luz natural",
      "🛌 Otimize seu ambiente de sono (temperatura, ruído, luz)"
    ]
  },
  mild: {
    title: "🟢 Perfil de Sono Leve",
    subtitle: "Questões menores que podem ser facilmente ajustadas",
    description: "Você tem um padrão de sono relativamente bom com algumas áreas que podem ser otimizadas. Suas dificuldades são administráveis e respondem bem a ajustes simples na rotina.",
    color: "from-green-400 to-emerald-500", 
    urgency: "AJUSTES SIMPLES NECESSÁRIOS",
    transformation: "Melhorias rápidas com pequenas mudanças",
    recommendations: [
      "⏰ Ajuste fino nos horários de dormir e acordar",
      "🍵 Evite cafeína 6 horas antes de dormir",
      "📖 Desenvolva um ritual relaxante antes de dormir",
      "🌡️ Mantenha o quarto fresco e escuro",
      "📱 Limite o uso de telas 1 hora antes de dormir"
    ]
  },
  balanced: {
    title: "🔵 Perfil de Sono Equilibrado",
    subtitle: "Padrão misto que requer abordagem personalizada",
    description: "Suas respostas mostram uma combinação de fatores que influenciam seu sono. Você tem alguns aspectos funcionando bem e outros que precisam de atenção específica.",
    color: "from-blue-400 to-cyan-500",
    urgency: "ABORDAGEM PERSONALIZADA RECOMENDADA",
    transformation: "Melhoria gradual com foco em pontos específicos",
    recommendations: [
      "🔍 Identifique os gatilhos específicos que afetam seu sono",
      "📊 Mantenha um diário do sono por 2 semanas",
      "🎯 Foque nas técnicas que mais se adequam ao seu estilo de vida",
      "🔄 Experimente diferentes abordagens até encontrar o que funciona",
      "💡 Combine múltiplas estratégias para resultados otimizados"
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

  // Função para criar um efeito sonoro suave e melódico
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Criar dois osciladores para um som mais rico
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const gainNode2 = audioContext.createGain();
      const masterGain = audioContext.createGain();
      
      // Som principal - nota C (523.25 Hz)
      osc1.frequency.setValueAtTime(523.25, audioContext.currentTime);
      osc1.type = 'sine';
      
      // Som harmonioso - quinta perfeita (783.99 Hz)
      osc2.frequency.setValueAtTime(783.99, audioContext.currentTime);
      osc2.type = 'sine';
      
      // Volume mais suave para cada oscilador
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      
      gainNode2.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      // Volume master
      masterGain.gain.setValueAtTime(0.8, audioContext.currentTime);
      
      // Conectar tudo
      osc1.connect(gainNode);
      osc2.connect(gainNode2);
      gainNode.connect(masterGain);
      gainNode2.connect(masterGain);
      masterGain.connect(audioContext.destination);
      
      // Tocar
      osc1.start(audioContext.currentTime);
      osc2.start(audioContext.currentTime + 0.05); // Pequeno delay para criar um efeito mais interessante
      
      osc1.stop(audioContext.currentTime + 0.4);
      osc2.stop(audioContext.currentTime + 0.35);
      
    } catch (error) {
      // Silenciosamente ignora se o áudio não estiver disponível
      console.log('Audio não disponível');
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    const question = quizQuestions.find(q => q.id === questionId);
    const answer = question?.answers.find(a => a.id === answerId);
    
    if (answer) {
      // Tocar som de clique suave
      playClickSound();
      
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
    
    // Analyze specific answer patterns for more differentiated profiles
    const answers = profileData.answers;
    
    // Count pain indicators
    const painLevel = answers.sleep_pain?.category === "pain" ? answers.sleep_pain.value : 0;
    const impactLevel = answers.sleep_impact?.category === "impact" ? answers.sleep_impact.value : 0;
    const durationLevel = answers.desperation_level?.category === "duration" ? answers.desperation_level.value : 0;
    const attemptsLevel = answers.failed_attempts?.category === "attempts" ? answers.failed_attempts.value : 0;
    const urgencyLevel = answers.urgency_level?.category === "urgency" ? answers.urgency_level.value : 0;
    const dreamLevel = answers.dream_scenario?.category === "dream" ? answers.dream_scenario.value : 0;
    
    // Calculate weighted score based on different factors
    const totalScore = painLevel + impactLevel + durationLevel + attemptsLevel + urgencyLevel + dreamLevel;
    const averageScore = totalScore / 6;
    
    // Determine profile based on specific answer combinations
    let profile = "";
    
    // High urgency + long duration + many failed attempts = critical (lowest scores = most severe)
    if (urgencyLevel <= 2 && durationLevel <= 2 && attemptsLevel <= 2) {
      profile = "critical";
    }
    // Moderate urgency + some duration + some attempts = moderate
    else if (urgencyLevel <= 3 && durationLevel <= 3 && attemptsLevel <= 3) {
      profile = "moderate";
    }
    // Low urgency + short duration + few attempts = mild (highest scores = least severe)
    else if (urgencyLevel >= 4 && durationLevel >= 4 && attemptsLevel >= 4) {
      profile = "mild";
    }
    // Mixed responses = balanced
    else {
      profile = "balanced";
    }
    
    // Simular análise da IA - tempo mais realista
    await new Promise(resolve => setTimeout(resolve, 6000));
    
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

  // Safety check to prevent undefined currentQuestion
  if (!currentQuestion) {
    return null;
  }

  // Render Results
  if (showResults && profileData.profile) {
    const profile = sleepProfiles[profileData.profile as keyof typeof sleepProfiles];
    
    return (
      <section id="planejamento-sono" className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
        <FloatingClouds />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold">Sono Zen AI - Análise Completa</span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-6">
              Sua Análise Personalizada Está Pronta!
            </h2>

            <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/70 bg-[var(--card-bg)]/30 px-4 py-2 rounded-full border border-[var(--border-subtle)]">
              <Brain className="h-4 w-4 text-[var(--accent-blue)]" />
              <span>Baseado em análise científica da Sono Zen AI</span>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-[var(--card-bg)]/90 to-[var(--card-bg)]/70 backdrop-blur-sm border border-[var(--border-subtle)] mb-8 transform transition-all duration-700 hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="text-center">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600/20 to-slate-500/20 border border-slate-500/40 px-6 py-3 rounded-full mb-6">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span className="text-slate-400 font-bold text-sm tracking-wide">{profile.urgency}</span>
                </div>

                {/* Main Title */}
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${profile.color} bg-clip-text text-transparent leading-tight`}>
                  {profile.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-6 opacity-90">
                  {profile.subtitle}
                </p>

                {/* Transformation Timeline */}
                <div className="bg-gradient-to-r from-[var(--accent-blue)]/15 to-[var(--warm-accent)]/15 border border-[var(--accent-blue)]/30 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[var(--warm-accent)] rounded-full animate-pulse"></div>
                    <span className="text-[var(--warm-accent)] font-bold text-lg">⏰ {profile.transformation}</span>
                    <div className="w-3 h-3 bg-[var(--warm-accent)] rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {profile.description}
                  </p>
                </div>
                
                {/* Personalized Protocol */}
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-[var(--border-subtle)] rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Brain className="h-6 w-6 text-[var(--accent-blue)]" />
                    <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      Recomendações Personalizadas
                    </h4>
                    <Target className="h-6 w-6 text-[var(--warm-accent)]" />
                  </div>
                  
                  <div className="grid gap-4">
                    {profile.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-[var(--card-bg)]/40 to-[var(--card-bg)]/20 rounded-xl border border-[var(--border-subtle)]/50 transform transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--card-hover)]/20">
                        <div className="w-8 h-8 bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <span className="text-[var(--text-secondary)] leading-relaxed text-left">{rec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/10 to-slate-600/10 rounded-xl border border-slate-600/20">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-slate-400" />
                      <span className="font-bold text-[var(--text-primary)]">Recomendação Importante</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center">
                      Estas são recomendações baseadas em sua análise. Para melhores resultados, implemente as sugestões gradualmente e monitore seu progresso.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  onClick={scrollToPreview}
                  className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-5 rounded-xl text-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  <ArrowRight className="mr-2 h-6 w-6" />
                  Ver Preview Completo
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)] px-6 py-4 rounded-xl transition-all duration-300"
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
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent"> Seu Perfil de Sono</span>
          </h2>
          


          <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]/80 bg-[var(--card-bg)]/30 px-4 py-2 rounded-full border border-[var(--border-subtle)]">
            <Sparkles className="h-4 w-4 text-[var(--warm-accent)]" />
            <span>Powered by Sono Zen AI</span>
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
                      w-full p-3 sm:p-4 h-auto text-left justify-start transition-all duration-300 transform hover:scale-[1.02] min-h-[60px] sm:min-h-[70px] quiz-button-mobile
                      ${profileData.answers[currentQuestion.id]?.id === answer.id 
                        ? 'bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-lg scale-[1.02]' 
                        : 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--card-bg)] hover:border-[var(--accent-blue)]/50'
                      }
                    `}
                  >
                    <div className="flex items-center w-full quiz-button-mobile">
                      <span className="text-sm sm:text-base leading-relaxed break-words text-wrap w-full overflow-hidden quiz-button-mobile">{answer.text}</span>
                    </div>
                  </Button>
                ))
              )}
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