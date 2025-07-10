import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Clock, Moon, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

interface PlanningData {
  name: string;
  email: string;
  sleepTime: string;
  mainProblem: string;
}

export function SleepPlanningSection() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [planningData, setPlanningData] = useState<PlanningData>({
    name: "",
    email: "",
    sleepTime: "",
    mainProblem: ""
  });

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    // Simular processamento da "IA"
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    // Scroll para o preview após gerar o plano
    setTimeout(() => {
      const previewElement = document.getElementById("preview-video");
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
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

  return (
    <section id="planejamento-sono" className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-4 py-2 rounded-full mb-6">
            <Brain className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] font-semibold">Sistema Inteligente</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6">
            Crie Seu{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Plano Personalizado
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
            Nossa <strong>IA especializada em sono</strong> vai analisar seu perfil e criar um plano exclusivo para sua transformação em 7 noites
          </p>
        </div>

        {/* Planning Form */}
        <div className="bg-gradient-to-br from-[var(--card-bg)]/80 to-[var(--card-bg)]/60 backdrop-blur-sm border border-[var(--border-subtle)] rounded-2xl p-8 mb-12">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Clock className="h-12 w-12 text-[var(--accent-blue)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Vamos Conhecer Você
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Preciso de algumas informações para criar seu plano exclusivo
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Seu primeiro nome
                  </label>
                  <Input
                    value={planningData.name}
                    onChange={(e) => setPlanningData({...planningData, name: e.target.value})}
                    placeholder="Como posso te chamar?"
                    className="bg-black/20 border-[var(--border-subtle)] text-[var(--text-primary)]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Seu melhor email
                  </label>
                  <Input
                    type="email"
                    value={planningData.email}
                    onChange={(e) => setPlanningData({...planningData, email: e.target.value})}
                    placeholder="Para enviar seu plano personalizado"
                    className="bg-black/20 border-[var(--border-subtle)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!planningData.name || !planningData.email}
                className="w-full bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300"
              >
                Continuar <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Sleep Analysis */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Moon className="h-12 w-12 text-[var(--celestial-blue)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Olá, {planningData.name}! 👋
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Agora vou analisar seu padrão de sono atual
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Que horas você costuma tentar dormir?
                  </label>
                  <select
                    value={planningData.sleepTime}
                    onChange={(e) => setPlanningData({...planningData, sleepTime: e.target.value})}
                    className="w-full bg-black/20 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg px-4 py-3"
                  >
                    <option value="">Selecione um horário</option>
                    <option value="21:00">21:00 - 22:00</option>
                    <option value="22:00">22:00 - 23:00</option>
                    <option value="23:00">23:00 - 00:00</option>
                    <option value="00:00">00:00 - 01:00</option>
                    <option value="01:00">Depois da 01:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Qual é seu maior problema com o sono?
                  </label>
                  <select
                    value={planningData.mainProblem}
                    onChange={(e) => setPlanningData({...planningData, mainProblem: e.target.value})}
                    className="w-full bg-black/20 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg px-4 py-3"
                  >
                    <option value="">Selecione o principal problema</option>
                    <option value="demoro-dormir">Demoro muito para conseguir dormir</option>
                    <option value="acordo-noite">Acordo várias vezes durante a noite</option>
                    <option value="sono-leve">Tenho sono muito leve</option>
                    <option value="cansaco-dia">Acordo cansado mesmo dormindo</option>
                    <option value="ansiedade">Ansiedade não me deixa relaxar</option>
                    <option value="mente-acelerada">Mente acelerada na hora de dormir</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--card-bg)]"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!planningData.sleepTime || !planningData.mainProblem}
                  className="flex-1 bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300"
                >
                  Analisar Perfil <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: AI Processing */}
          {step === 3 && !isGenerating && (
            <div className="text-center space-y-6">
              <Sparkles className="h-16 w-16 text-[var(--warm-accent)] mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Perfeito, {planningData.name}!
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Coletei todas as informações necessárias. Agora vou processar seu perfil e criar um plano personalizado baseado nas técnicas orientais mais eficazes para seu caso específico.
              </p>
              
              <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/30 rounded-xl p-6 my-8">
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  Seu Perfil Detectado:
                </h4>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-[var(--text-secondary)]">Nome: {planningData.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-[var(--text-secondary)]">Horário de sono: {planningData.sleepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-[var(--text-secondary)]">Problema principal: {planningData.mainProblem}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGeneratePlan}
                className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105"
              >
                <Brain className="mr-2 h-5 w-5" />
                Gerar Meu Plano Personalizado
              </Button>
            </div>
          )}

          {/* Step 4: Processing Animation */}
          {isGenerating && (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="h-20 w-20 mx-auto">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-[var(--accent-blue)]/30 border-t-[var(--accent-blue)]"></div>
                  <Brain className="h-8 w-8 text-[var(--accent-blue)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                Processando Seu Perfil...
              </h3>
              
              <div className="space-y-3 text-[var(--text-secondary)]">
                <p>🧠 Analisando padrões de sono...</p>
                <p>🔍 Identificando técnicas orientais ideais...</p>
                <p>📋 Criando rotina personalizada...</p>
                <p>✨ Finalizando seu plano exclusivo...</p>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {step === 3 && !isGenerating && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold">Sistema Pronto Para Mostrar Seu Plano</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}