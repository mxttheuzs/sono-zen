import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Mãe de 2 filhos, 38 anos",
    initial: "M",
    text: "Gente, eu chorei quando consegui dormir pela primeira vez sem remédio! 💙 Eram 3 anos tomando medicação toda noite por causa da ansiedade. Com o Sono Zen, em 10 dias já estava dormindo naturalmente. Meus filhos até comentaram que a mamãe estava mais feliz!",
    gradient: "from-[var(--celestial-blue)] to-[var(--sky-blue)]",
    rating: 5,
    location: "São Paulo, SP"
  },
  {
    name: "João Carlos",
    role: "Vendedor, 42 anos",
    initial: "J",
    text: "Cara, trabalho com vendas e vivia com a cabeça a mil na hora de dormir. Testei de tudo... nada funcionava. As técnicas do Sono Zen são simples demais! Agora durmo profundo e acordo cheio de energia pra trabalhar. Minha produtividade melhorou muito!",
    gradient: "from-[var(--sky-blue)] to-[var(--mint-green)]",
    rating: 5,
    location: "Belo Horizonte, MG"
  },
  {
    name: "Ana Paula",
    role: "Secretária, 45 anos",
    initial: "A",
    text: "Insônia desde os 35 por causa da menopausa... Nossa, que sofrimento! Ficava HORAS rolando na cama. Quando descobri o método, pensei 'mais uma coisa que não vai funcionar'. Mas funcionou sim! Agora durmo que nem um bebê toda noite 😊",
    gradient: "from-[var(--mint-green)] to-[var(--celestial-blue)]",
    rating: 5,
    location: "Campinas, SP"
  },
  {
    name: "Carlos Roberto",
    role: "Aposentado, 58 anos",
    initial: "C",
    text: "Depois que me aposentei, virou uma bagunça total! Dormia de dia, ficava acordado de madrugada... Minha esposa não aguentava mais. Com o Sono Zen, em 1 semana voltei ao normal. Agora temos nossa rotina de casal de volta ❤️",
    gradient: "from-[var(--celestial-blue)] to-[var(--mint-green)]",
    rating: 5,
    location: "Santos, SP"
  },
  {
    name: "Patrícia",
    role: "Professora, 35 anos",
    initial: "P",
    text: "O estresse da escola me deixava com a mente acelerada... Deitava pensando nos alunos, nas aulas, nos problemas. O Sono Zen me ensinou a 'desligar o botão' da preocupação. Agora consigo relaxar de verdade! Virou meu momento sagrado do dia 🌙",
    gradient: "from-[var(--sky-blue)] to-[var(--celestial-blue)]",
    rating: 5,
    location: "Rio de Janeiro, RJ"
  },
  {
    name: "Ricardo",
    role: "Motorista de app, 29 anos",
    initial: "R",
    text: "Trabalho até tarde dirigindo e chegava em casa super agitado... Ficava no sofá assistindo TV até de manhãzinha! 😅 Com o Sono Zen, aprendi a fazer uma transição gostosa pro sono. Agora durmo bem mesmo depois do trampo noturno.",
    gradient: "from-[var(--mint-green)] to-[var(--sky-blue)]",
    rating: 5,
    location: "São Paulo, SP"
  },
  {
    name: "Fernanda",
    role: "Cabeleireira, 34 anos",
    initial: "F",
    text: "A ansiedade me mantinha acordada pensando nos problemas financeiros, família... Remédio não resolvia, só me deixava zuada no dia seguinte. O Sono Zen me deu ferramentas naturais pra acalmar essa mente agitada. Agora durmo em paz! ✨",
    gradient: "from-[var(--celestial-blue)] to-[var(--sky-blue)]",
    rating: 5,
    location: "Fortaleza, CE"
  }
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-black relative overflow-hidden mt-[0px] mb-[0px] pt-[27px] pb-[27px]">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--cloud-white)] mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              14.847 Pessoas
            </span>
            <span className="block text-3xl md:text-4xl text-[var(--text-secondary)] mt-2">
              Já Transformaram Suas Noites
            </span>
          </h2>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Pessoas que estavam na mesma situação que você e conseguiram transformar completamente seu sono
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <Carousel 
            className="w-full max-w-3xl mx-auto"
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps"
            }}
          >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-full px-4">
                <div className="bg-gradient-to-br from-[var(--card-bg)]/95 to-[var(--card-bg)]/80 backdrop-blur-xl border-2 border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 relative group hover:border-[var(--accent-blue)]/50 transition-all duration-500 hover:scale-[1.02] shadow-2xl mx-auto max-w-2xl" 
                     style={{animationDelay: `${index * 0.1}s`}}>
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 rounded-full flex items-center justify-center border border-[var(--accent-blue)]/30">
                    <Quote className="h-6 w-6 text-[var(--accent-blue)]" />
                  </div>
                  
                  <div className="pt-8 text-center">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-[var(--warm-accent)] fill-current mx-1" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-[var(--text-secondary)] leading-relaxed mb-8 text-lg font-medium italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="flex items-center justify-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center mr-4 shadow-xl border-2 border-white/10`}>
                        <span className="text-white font-bold text-xl">{testimonial.initial}</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[var(--text-primary)] text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
                        <p className="text-sm text-[var(--warm-accent)] font-semibold">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - More Visible */}
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-[var(--accent-blue)]/90 hover:bg-[var(--warm-accent)] border-3 border-white/30 text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center rounded-full z-20" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-[var(--accent-blue)]/90 hover:bg-[var(--warm-accent)] border-3 border-white/30 text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center rounded-full z-20" />

        </Carousel>
        </div>
      </div>
    </section>
  );
}