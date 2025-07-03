import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="depoimentos" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--cloud-white)] mb-6">
            Olha Só o Que Eles Falam! 💙
            <span className="block bg-gradient-to-r from-[var(--celestial-blue)] to-[var(--sky-blue)] bg-clip-text text-transparent">
              Pessoas Reais, Transformações Reais
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-4">
            Histórias de quem estava exatamente como você... e conseguiu! 🌙
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-[var(--text-muted)]">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-[var(--celestial-blue)] fill-current mr-1" />
              <span>Nota 4.9/5.0</span>
            </div>
            <div>
              <span>+12.000 vidas transformadas</span>
            </div>
            <div>
              <span>Resultados em 7 noites</span>
            </div>
          </div>
        </div>
        
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: "trimSnaps"
          }}
        >
          <CarouselContent className="-ml-1 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-1 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <div className="card-modern p-4 md:p-8 relative group animate-slide-up h-full animate-magnetic-hover" 
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Quote className="h-6 w-6 md:h-8 md:w-8 text-[var(--accent-blue)] animate-breathe-slow" />
                  </div>
                  
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-lg animate-gentle-float`} style={{animationDelay: `${index * 0.3 + 0.5}s`}}>
                      <span className="text-white font-bold text-sm md:text-lg">{testimonial.initial}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-sm md:text-lg">{testimonial.name}</h4>
                      <p className="text-xs text-[var(--text-muted)] leading-tight">{testimonial.role}</p>
                      <p className="text-xs text-[var(--warm-accent)] mt-1">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4 md:mb-6 italic text-sm">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex text-[var(--warm-accent)]">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (testimonial.rating >= star) {
                        return <Star key={star} className="h-3 w-3 md:h-4 md:w-4 fill-current" />;
                      } else if (testimonial.rating >= star - 0.5) {
                        return (
                          <div key={star} className="relative h-3 w-3 md:h-4 md:w-4">
                            <Star className="h-3 w-3 md:h-4 md:w-4 fill-current opacity-30" />
                            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                              <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                            </div>
                          </div>
                        );
                      } else {
                        return <Star key={star} className="h-3 w-3 md:h-4 md:w-4 fill-current opacity-30" />;
                      }
                    })}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>
      </div>
    </section>
  );
}