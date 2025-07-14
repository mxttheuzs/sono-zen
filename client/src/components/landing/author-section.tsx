import { Card, CardContent } from "@/components/ui/card";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Star, Users, Globe, Heart, User, Award, Stethoscope, Moon } from "lucide-react";

export function AuthorSection() {
  const credentials = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Especialista em Medicina do Sono",
      description: "15 anos de experiência clínica"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Técnicas Orientais Certificadas",
      description: "Estudos na China, Japão e Índia"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "+14.847 Vidas Transformadas",
      description: "Taxa de sucesso de 94%"
    },

  ];



  return (
    <section id="deborah-genaro" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Conheça a Especialista
            <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              Por Trás do Método
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            A autoridade brasileira em medicina do sono que revoluciona vidas através de técnicas orientais milenares
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Professional Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-modern p-8 text-center">
              <h3 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-8">
                Dra. Deborah Genaro
              </h3>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--warm-accent)]">15+</div>
                  <div className="text-xs text-[var(--text-muted)]">Anos de experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--warm-accent)]">14.847</div>
                  <div className="text-xs text-[var(--text-muted)]">Vidas transformadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--warm-accent)]">94%</div>
                  <div className="text-xs text-[var(--text-muted)]">Taxa de sucesso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--warm-accent)]">4.9</div>
                  <div className="text-xs text-[var(--text-muted)]">Avaliação média</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-[var(--warm-accent)] fill-current" />
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Avaliação de pacientes e colegas médicos
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credentials */}
            <div className="card-modern p-8 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 border border-[var(--border-subtle)]/50">
              <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="p-2 rounded-full bg-[var(--warm-accent)]/20 mr-3">
                  <User className="h-6 w-6 text-[var(--warm-accent)]" />
                </div>
                Credenciais e Especialização
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--card-hover)] border border-[var(--border-subtle)] hover:border-[var(--warm-accent)]/30 transition-colors">
                    <div className="p-2 rounded-full bg-[var(--warm-accent)]/20 text-[var(--warm-accent)] mt-1">
                      {credential.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-[var(--text-primary)] text-sm mb-1">
                        {credential.title}
                      </h5>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {credential.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="card-modern p-8 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 border border-[var(--border-subtle)]/50">
              <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <div className="p-2 rounded-full bg-[var(--warm-accent)]/20 mr-3">
                  <Heart className="h-6 w-6 text-[var(--warm-accent)]" />
                </div>
                Minha Jornada e Missão
              </h4>
              
              <div className="space-y-6 text-[var(--text-secondary)]">
                <p className="leading-relaxed text-base">
                  <strong className="text-[var(--text-primary)]">Obrigada por ter chegado até aqui.</strong> Meu nome é Deborah Genaro, e nos últimos 15 anos me dediquei completamente a transformar a vida de pessoas que sofrem com insônia e noites mal dormidas.
                </p>
                
                <p className="leading-relaxed text-base">
                  Durante anos atendendo em minha clínica, percebi que a medicina tradicional sozinha não era suficiente. Foi então que embarquei em uma jornada pelos países orientais - China, Japão e Índia - onde descobri técnicas milenares que mudaram tudo.
                </p>
                
                <p className="leading-relaxed text-base">
                  O <strong className="text-[var(--warm-accent)]">Método Sono Zen</strong> é o resultado dessa fusão entre conhecimento científico e sabedoria ancestral. Mais de 14.847 pessoas já transformaram suas noites com essas técnicas, e agora chegou a sua vez de ter o sono que sempre sonhou.
                </p>
              </div>
            </div>



            {/* Personal Message */}
            <div className="card-dreamy p-8 bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/30">
              <div className="text-center relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="p-3 rounded-full bg-[var(--warm-accent)]/20 backdrop-blur-sm">
                    <Heart className="h-6 w-6 text-[var(--warm-accent)]" />
                  </div>
                </div>
                <div className="pt-8">
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6 italic text-lg">
                    "Criei este método pensando em cada pessoa que já passou noites em claro, olhando para o teto. Se você chegou até aqui, é porque merece dormir como nunca dormiu antes. Este é meu presente para você."
                  </p>
                  <div className="text-[var(--warm-accent)] font-semibold text-lg">
                    - Dra. Deborah Genaro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
