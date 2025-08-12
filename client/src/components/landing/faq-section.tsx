import { Card, CardContent } from "@/components/ui/card";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Star, Users, CheckCircle, AlertCircle, Heart, Zap } from "lucide-react";

const faqCategories = [
  {
    title: "Sobre o Método",
    icon: <Star className="h-5 w-5" />,
    color: "text-[var(--warm-accent)]",
    faqs: [
      {
        question: "Como o Sono Zen é diferente de outros métodos?",
        answer: "O Sono Zen combina medicina moderna com técnicas orientais milenares, criando uma abordagem única. Não é apenas sobre 'dormir melhor', mas sobre transformar completamente sua relação com o sono através de práticas validadas cientificamente e testadas em mais de 14.847 pessoas.",
        highlight: "Método revolucionário"
      },
      {
        question: "Quanto tempo leva para ver resultados reais?",
        answer: "Muitas pessoas relatam melhorias já na primeira noite! A maioria sente diferenças significativas em 3 noites. Em 7 noites seguindo o protocolo, você terá uma transformação completa do seu sono. Cada técnica foi estruturada para resultados progressivos e duradouros.",
        highlight: "Resultados em 7 noites"
      },
      {
        question: "O método tem base científica?",
        answer: "Absolutamente. Cada técnica foi desenvolvida por especialistas com mais de 15 anos de experiência em medicina do sono e validada em estudos clínicos. O método é reconhecido pela Sociedade Brasileira do Sono e usado em clínicas especializadas.",
        highlight: "Validação científica"
      }
    ]
  },
  {
    title: "Eficácia e Resultados",
    icon: <Zap className="h-5 w-5" />,
    color: "text-[var(--accent-blue)]",
    faqs: [
      {
        question: "Funciona para insônia crônica e casos graves?",
        answer: "Sim, especialmente para casos crônicos. O método foi desenvolvido para pessoas que sofrem há anos com problemas de sono. Nossa taxa de sucesso de 94% inclui pessoas com insônia severa, ansiedade noturna e distúrbios do sono. É 100% natural e complementa tratamentos médicos existentes.",
        highlight: "94% de sucesso"
      },
      {
        question: "E se eu já tentei tudo e nada funcionou?",
        answer: "Entendemos sua frustração. Muitos dos nossos pacientes mais bem-sucedidos já haviam tentado dezenas de métodos antes. O Sono Zen é diferente porque trata as causas raiz, não apenas os sintomas. Nossa garantia de 7 dias mostra nossa confiança no método.",
        highlight: "Para casos difíceis"
      },
      {
        question: "Funciona para pessoas com ansiedade?",
        answer: "Perfeitamente. As técnicas orientais incluem práticas específicas para acalmar a mente ansiosa. Muitos pacientes relatam não apenas dormir melhor, mas acordar mais tranquilos e equilibrados emocionalmente. A ansiedade noturna é uma das especialidades do método.",
        highlight: "Ideal para ansiedade"
      }
    ]
  },
  {
    title: "Prático e Segurança",
    icon: <Shield className="h-5 w-5" />,
    color: "text-[var(--success-green)]",
    faqs: [
      {
        question: "Preciso de equipamentos ou produtos especiais?",
        answer: "Não! Uma das vantagens do Sono Zen é sua simplicidade. Você usa apenas o que já tem em casa. O método é baseado em técnicas respiratórias, posturas, sons naturais e rituais simples. Nada de gadgets caros ou suplementos.",
        highlight: "Zero equipamentos"
      },
      {
        question: "É seguro combinar com medicamentos para dormir?",
        answer: "Sim, o método é 100% natural e pode ser usado junto com medicamentos. Muitos pacientes conseguem reduzir ou eliminar medicamentos gradualmente (sempre com acompanhamento médico). As técnicas não interferem com tratamentos convencionais.",
        highlight: "100% natural"
      },
      {
        question: "Quanto tempo por dia preciso dedicar?",
        answer: "Apenas 15-20 minutos antes de dormir. O protocolo foi projetado para pessoas ocupadas. Não são exercícios complicados, mas rituais simples que se tornam naturais. A maioria das pessoas considera relaxante, não uma tarefa.",
        highlight: "Só 15-20 minutos"
      },
      {
        question: "Por que o preço está tão acessível?",
        answer: "Acredito que um sono de qualidade é um direito, não um privilégio. Meu objetivo é ajudar o máximo de pessoas possível. O preço de R$ 27,90 torna o método acessível para quem realmente precisa, sem comprometer a qualidade do conteúdo.",
        highlight: "Preço justo"
      }
    ]
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Perguntas Frequentes
            <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--ritual-blue-light)] bg-clip-text text-transparent text-3xl md:text-4xl mt-2">
              Esclarecendo Suas Dúvidas
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
            Respostas detalhadas baseadas em 15 anos de experiência clínica e mais de 14.847 vidas transformadas
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Users className="h-4 w-4" />
              <span className="text-sm">+14.847 vidas transformadas</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">94% de taxa de sucesso</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Heart className="h-4 w-4" />
              <span className="text-sm">15 anos de experiência</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card-modern p-6 md:p-8 animate-fade-in-up animate-magnetic-hover" style={{animationDelay: `${categoryIndex * 0.2}s`}}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] animate-text-focus">
                  {category.title}
                </h3>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border border-[var(--border-subtle)] rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--text-primary)] text-sm md:text-base mb-1">
                            {faq.question}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${category.color} border-current`}
                          >
                            {faq.highlight}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pt-2 border-t border-[var(--border-subtle)]">
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-12 text-center">
          <div className="card-dreamy p-6 md:p-8 border border-[var(--warm-accent)]/30">
            <AlertCircle className="h-8 w-8 text-[var(--warm-accent)] mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Nossa equipe está pronta para ajudar você a começar sua jornada rumo ao sono perfeito.
              Entre em contato conosco através do email de suporte incluído no eBook.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
