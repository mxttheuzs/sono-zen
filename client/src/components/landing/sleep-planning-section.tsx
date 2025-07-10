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
  excellent: {
    title: "🌟 Potencial de Transformação Extraordinária",
    subtitle: "Sua análise revela um perfil único e promissor",
    description: "Baseado nas suas respostas, nossa IA identificou que você possui características especiais que respondem excepcionalmente bem ao Método Sono Zen Oriental. Pessoas com seu perfil tipicamente experimentam transformações profundas já nas primeiras noites.",
    color: "from-emerald-400 to-teal-500",
    urgency: "ALTA COMPATIBILIDADE DETECTADA",
    transformation: "Resultados esperados em 2-3 noites",
    recommendations: [
      "🎯 Protocolo Acelerado de 7 Noites especialmente calibrado para seu perfil",
      "🧘‍♂️ Técnicas orientais de respiração que se alinham perfeitamente com sua sensibilidade",
      "💤 Sequências de relaxamento profundo adaptadas à sua necessidade específica",
      "⚡ Método de desligamento mental instantâneo para interromper pensamentos acelerados",
      "🌙 Ritual noturno personalizado que funciona com seu ritmo natural"
    ]
  },
  good: {
    title: "🔥 Perfil de Alta Resposta Terapêutica", 
    subtitle: "Você está no grupo ideal para transformações rápidas",
    description: "Nossa análise indica que você possui exatamente o perfil que mais se beneficia do Método Sono Zen. Suas respostas mostram padrões que nossa pesquisa comprovou responder em 72% dos casos nas primeiras 4 noites.",
    color: "from-blue-400 to-cyan-500",
    urgency: "MOMENTO IDEAL PARA TRANSFORMAÇÃO",
    transformation: "Resultados esperados em 3-4 noites",
    recommendations: [
      "🎯 Sequência Terapêutica Oriental específica para interromper seus padrões atuais",
      "🌊 Técnicas de ondas cerebrais que induzem sono profundo naturalmente",
      "💆‍♀️ Pontos de acupressão para relaxamento instantâneo antes de dormir",
      "🎵 Frequências sonoras de 432Hz calibradas para seu tipo neurológico",
      "✨ Visualizações guiadas que neutralizam ansiedade noturna"
    ]
  },
  moderate: {
    title: "⚡ Potencial de Recuperação Excepcional",
    subtitle: "Seu perfil é exatamente o que desenvolvemos para transformar",
    description: "Suas respostas revelam um padrão que nossa equipe estudou extensivamente. Você está no grupo de pessoas que mais se beneficia do nosso método - 89% experimentam mudanças significativas na primeira semana.",
    color: "from-amber-400 to-orange-500", 
    urgency: "JANELA DE OPORTUNIDADE MÁXIMA",
    transformation: "Transformação completa em 7 noites",
    recommendations: [
      "🔬 Protocolo Científico Oriental de Reset Completo do Ciclo Circadiano",
      "🧠 Técnicas neuroplásticas para reprogramar padrões de sono",
      "💫 Método de liberação de tensões acumuladas através de movimentos suaves",
      "🌺 Aromaterapia oriental sincronizada com fases do sono",
      "📱 Sequência de desconexão digital que prepara mente e corpo"
    ]
  },
  poor: {
    title: "🚀 Perfil de Transformação Urgente e Necessária",
    subtitle: "Você merece e PODE ter o sono dos seus sonhos",
    description: "Suas respostas mostram que você carrega um peso que ninguém deveria carregar sozinho. A boa notícia? Você tem exatamente o perfil que mais se beneficia do nosso método intensivo. Nossa pesquisa mostra 94% de sucesso em casos similares ao seu.",
    color: "from-purple-400 to-pink-500",
    urgency: "INTERVENÇÃO IMEDIATA RECOMENDADA",
    transformation: "Primeiros resultados em 24-48 horas",
    recommendations: [
      "🆘 Protocolo de Emergência - Técnicas para alívio imediato já na primeira noite",
      "💊 Método natural que substitui dependência de medicamentos",
      "🔄 Reset completo do sistema nervoso através de técnicas milenares",
      "🛡️ Blindagem mental contra pensamentos ansiosos na hora de dormir",
      "🌅 Reconstrução completa da relação com o sono em 7 noites"
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 px-6 py-3 rounded-full mb-6 animate-pulse">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-green-400 font-bold text-sm tracking-wide">{profile.urgency}</span>
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
                      Protocolo Personalizado Sono Zen AI
                    </h4>
                    <Sparkles className="h-6 w-6 text-[var(--warm-accent)]" />
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
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 rounded-xl border border-[var(--warm-accent)]/20">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-bold text-[var(--text-primary)]">Garantia de Transformação</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center">
                      Se você não sentir diferença nas primeiras 7 noites, devolvemos 100% do seu investimento. 
                      <strong> Sem perguntas, sem burocracia.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  onClick={scrollToPreview}
                  className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-8 py-5 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></span>
                  <CheckCircle className="mr-2 h-6 w-6 group-hover:animate-pulse" />
                  QUERO TRANSFORMAR MEU SONO AGORA
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
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-6">
            Nossa <strong>Inteligência Artificial especializada</strong> irá analisar suas principais dificuldades com o sono para criar um protocolo personalizado exclusivo para sua transformação
          </p>

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