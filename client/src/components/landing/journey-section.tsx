import { Card, CardContent } from "@/components/ui/card";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const nights = [
  {
    number: 1,
    title: "Noite 1: Corte o Ciclo",
    description: "Interrompa hábitos que sabotam o sono: telas, luz forte. Crie um ambiente escuro e silencioso.",
    isSpecial: false
  },
  {
    number: 2,
    title: "Noite 2: Respiração Kōan",
    description: "Aprenda 4-7-8: Inspire por 4s, segure por 7s, expire por 8s. Reduz o ritmo do coração.",
    isSpecial: false
  },
  {
    number: 3,
    title: "Noite 3: Banho de Energia",
    description: "Tome um banho morno e demorado. Use óleo essencial de lavanda para relaxar ainda mais.",
    isSpecial: false
  },
  {
    number: 4,
    title: "Noite 4: O Silêncio Interno",
    description: "Durma sem estímulo sonoro. Observe sua respiração e deixe os pensamentos passarem.",
    isSpecial: false
  },
  {
    number: 5,
    title: "Noite 5: Técnica Yin-Yang",
    description: "5 minutos de alongamento ou automassagem. Depois, respiração lenta com olhos fechados.",
    isSpecial: false
  },
  {
    number: 6,
    title: "Noite 6: Mantra do Desapego",
    description: "Repita mentalmente \"Está tudo bem\". Cria um ritual mental de descanso.",
    isSpecial: false
  },
  {
    number: 7,
    title: "Noite 7: Renascimento Matinal",
    description: "Prepare sua manhã com intenção. Acorde devagar, abra a janela, respire fundo e mantenha o novo ciclo.",
    isSpecial: true
  }
];

export function JourneySection() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              A Jornada das 7 Noites
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Não há certo ou errado aqui. Há um corpo que só precisa de tempo, calma e intenção.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {nights.slice(0, 6).map((night, index) => (
            <Card key={night.number} className="card-modern border-none">
              <CardContent className="p-6 flex items-center">
                <div className="blue-gradient w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-white font-bold">{night.number}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-[var(--text-primary)]">{night.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{night.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Special card for night 7 */}
          <Card className="card-dreamy lg:col-span-2 border-none">
            <CardContent className="p-6 flex items-center">
              <div className="warm-gradient w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                <span className="text-white font-bold">7</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-[var(--text-primary)]">{nights[6].title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{nights[6].description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
