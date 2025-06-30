import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const testimonials = [
  {
    name: "Maria Silva Costa",
    role: "Dona de casa e mãe de 2 filhos",
    initial: "M",
    text: "Há 3 anos não conseguia dormir direito por causa da ansiedade e preocupações. Tomava remédio toda noite. Com o Método Sono Zen, em apenas 12 dias já estava dormindo naturalmente das 22h às 6h. Mudou minha vida completamente.",
    gradient: "from-purple-500 to-indigo-600",
    rating: 5,
    location: "Ribeirão Preto, SP"
  },
  {
    name: "João Carlos Oliveira",
    role: "Vendedor autônomo, 42 anos",
    initial: "J",
    text: "Trabalho com vendas e o estresse me deixava acordado até tarde. Testei várias coisas, mas nada funcionava. As técnicas do Sono Zen são simples de fazer e realmente funcionam. Durmo profundamente e acordo com energia para trabalhar.",
    gradient: "from-blue-500 to-cyan-600",
    rating: 5,
    location: "Belo Horizonte, MG"
  },
  {
    name: "Ana Paula Ferreira",
    role: "Secretária em escritório",
    initial: "A",
    text: "Insônia desde os 35 anos por causa da menopausa. Passava horas rolando na cama sem conseguir relaxar. O método me ensinou como preparar corpo e mente para o sono. Agora durmo tranquila todas as noites.",
    gradient: "from-emerald-500 to-teal-600",
    rating: 4.5,
    location: "Campinas, SP"
  },
  {
    name: "Carlos Roberto Mendes",
    role: "Aposentado, 58 anos",
    initial: "C",
    text: "Depois que me aposentei, o sono ficou bagunçado. Dormia de dia e ficava acordado de madrugada. Minha esposa já não aguentava mais. Com as 7 noites do Sono Zen, voltei a ter rotina normal de sono.",
    gradient: "from-orange-500 to-amber-600",
    rating: 4.5,
    location: "Santos, SP"
  },
  {
    name: "Patrícia dos Santos",
    role: "Professora de escola pública",
    initial: "P",
    text: "Stress do trabalho me deixava com a mente acelerada na hora de dormir. Ficava pensando nas aulas, nos alunos, nos problemas. O Sono Zen me ensinou a desligar os pensamentos e relaxar completamente. Durmo muito melhor agora.",
    gradient: "from-pink-500 to-rose-600",
    rating: 5,
    location: "Rio de Janeiro, RJ"
  },
  {
    name: "Ricardo Lima Santos",
    role: "Motorista de aplicativo",
    initial: "R",
    text: "Trabalho até tarde da noite e tinha dificuldade para dormir quando chegava em casa. Ficava agitado, assistindo TV até de manhã. Com o método, aprendi a fazer a transição para o sono mesmo depois do trabalho noturno.",
    gradient: "from-cyan-500 to-blue-600",
    rating: 4.5,
    location: "São Paulo, SP"
  },
  {
    name: "Fernanda Rocha Silva",
    role: "Cabeleireira, 34 anos",
    initial: "F",
    text: "Ansiedade me mantinha acordada pensando nos problemas financeiros e familiares. Remédio não resolvia, só me deixava sonolenta no dia seguinte. O Sono Zen me deu ferramentas naturais para acalmar a mente e dormir em paz.",
    gradient: "from-green-500 to-emerald-600",
    rating: 5,
    location: "Fortaleza, CE"
  },
  {
    name: "Eduardo Almeida Costa",
    role: "Porteiro de condomínio",
    initial: "E",
    text: "Trabalho em turnos alternados e nunca conseguia regular o sono. Quando trabalhava de noite, não dormia direito de dia. As técnicas me ajudaram a adaptar o sono para qualquer horário. Essencial para quem trabalha em turnos.",
    gradient: "from-violet-500 to-purple-600",
    rating: 4.5,
    location: "Brasília, DF"
  }
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Depoimentos Reais
            <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              de Quem Transformou o Sono
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-4">
            Histórias verdadeiras de pessoas que venceram a insônia
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-[var(--text-muted)]">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-[var(--warm-accent)] fill-current mr-1" />
              <span>4.8/5.0 avaliação média</span>
            </div>
            <div>
              <span>94% taxa de sucesso</span>
            </div>
            <div>
              <span>Resultados comprovados</span>
            </div>
          </div>
        </div>
        
        <Carousel 
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: false
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
          <CarouselPrevious className="left-1 w-8 h-8 md:w-10 md:h-10 md:-left-12 bg-[var(--accent-blue)]/40 border-[var(--accent-blue)]/40 hover:bg-[var(--accent-blue)]/80 text-white backdrop-blur-sm" />
          <CarouselNext className="right-1 w-8 h-8 md:w-10 md:h-10 md:-right-12 bg-[var(--accent-blue)]/40 border-[var(--accent-blue)]/40 hover:bg-[var(--accent-blue)]/80 text-white backdrop-blur-sm" />
        </Carousel>
      </div>
    </section>
  );
}