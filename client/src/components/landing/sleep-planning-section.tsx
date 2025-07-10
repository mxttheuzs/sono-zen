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