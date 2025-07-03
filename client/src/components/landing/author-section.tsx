import { Card, CardContent } from "@/components/ui/card";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Star, Users, Globe, Heart, User } from "lucide-react";
import doctorImage from "@assets/image_1751130848304.png";

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
          {/* Author Photo & Main Info */}
          <div className="lg:col-span-1">
            <div className="card-modern p-6 text-center">
              {/* Professional Photo */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--warm-accent)] to-[var(--accent-blue)] p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img 
                    src={doctorImage} 
                    alt="Dra. Deborah Genaro - Especialista em Medicina do Sono"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                Dra. Deborah Genaro
              </h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-[var(--text-secondary)] text-sm">
                  Especialista em Medicina do Sono<br/>
                  Mestre em Técnicas Orientais
                </p>
              </div>

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
            <div className="card-modern p-6">
              <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <User className="mr-3 h-6 w-6 text-[var(--warm-accent)]" />
                Credenciais e Especialização
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--card-hover)] border border-[var(--border-subtle)]">
                    <div className="text-[var(--warm-accent)] mt-1">
                      {credential.icon}
                    </div>
                    <div>
                      <h5 className="font-semibold text-[var(--text-primary)] text-sm mb-1">
                        {credential.title}
                      </h5>
                      <p className="text-xs text-[var(--text-muted)]">
                        {credential.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="card-modern p-6">
              <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
                <Heart className="mr-3 h-6 w-6 text-[var(--warm-accent)]" />
                Minha Jornada e Missão
              </h4>
              
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="leading-relaxed">
                  <strong className="text-[var(--text-primary)]">Obrigada por ter chegado até aqui.</strong> Meu nome é Deborah Genaro, e nos últimos 15 anos me dediquei completamente a transformar a vida de pessoas que sofrem com insônia e noites mal dormidas.
                </p>
                
                <p className="leading-relaxed">
                  Durante anos atendendo em minha clínica, percebi que a medicina tradicional sozinha não era suficiente. Foi então que embarquei em uma jornada pelos países orientais - China, Japão e Índia - onde descobri técnicas milenares que mudaram tudo.
                </p>
                
                <p className="leading-relaxed">
                  O <strong className="text-[var(--warm-accent)]">Método Sono Zen</strong> é o resultado dessa fusão entre conhecimento científico e sabedoria ancestral. Mais de 14.847 pessoas já transformaram suas noites com essas técnicas, e agora chegou a sua vez de ter o sono que sempre sonhou.
                </p>
              </div>
            </div>



            {/* Personal Message */}
            <div className="card-dreamy p-6 border border-[var(--warm-accent)]/30">
              <div className="text-center">
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4 italic">
                  "Criei este método pensando em cada pessoa que já passou noites em claro, olhando para o teto. Se você chegou até aqui, é porque merece dormir como nunca dormiu antes. Este é meu presente para você."
                </p>
                <div className="text-[var(--warm-accent)] font-semibold">
                  - Dra. Deborah Genaro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
