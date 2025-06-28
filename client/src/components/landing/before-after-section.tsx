import { X, Check, Moon, Sun } from "lucide-react";

export function BeforeAfterSection() {
  const beforeItems = [
    "Demora mais de 30 minutos para adormecer",
    "Acorda várias vezes durante a noite",
    "Sente-se cansado mesmo após 8 horas de sono",
    "Precisa de café logo ao acordar",
    "Sonolência durante o dia",
    "Irritabilidade e ansiedade",
    "Dificuldade de concentração no trabalho",
    "Dependência de medicamentos para dormir"
  ];

  const afterItems = [
    "Adormece em menos de 10 minutos",
    "Dorme profundamente a noite toda",
    "Acorda naturalmente revigorado",
    "Energia natural logo ao acordar",
    "Alerta e produtivo durante o dia",
    "Humor equilibrado e tranquilo",
    "Concentração e memória aprimoradas",
    "Sono natural sem medicamentos"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Sua Vida Antes vs Depois do
            <span className="bg-gradient-to-r from-[var(--warm-accent)] to-orange-400 bg-clip-text text-transparent"> Sono Zen</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Veja a transformação completa que milhares de pessoas já experimentaram
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* ANTES */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-3xl p-8 border border-red-500/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <Moon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">ANTES</h3>
                  <p className="text-red-300">Noites de sofrimento</p>
                </div>
              </div>

              <div className="space-y-4">
                {beforeItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-900/20 rounded-xl border border-red-500/20">
                <p className="text-red-300 text-center font-medium">
                  😩 Resultado: Dias cansativos e noites frustrantes
                </p>
              </div>
            </div>
          </div>

          {/* DEPOIS */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-800/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-3xl p-8 border border-green-500/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">DEPOIS</h3>
                  <p className="text-green-300">Noites transformadas</p>
                </div>
              </div>

              <div className="space-y-4">
                {afterItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-900/20 rounded-xl border border-green-500/20">
                <p className="text-green-300 text-center font-medium">
                  ✨ Resultado: Dias produtivos e noites reparadoras
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--warm-accent)]/20 to-orange-500/20 border border-[var(--warm-accent)]/30 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-[var(--warm-accent)] rounded-full animate-pulse"></div>
            <p className="text-[var(--warm-accent)] font-semibold">
              Transformação em apenas 7 noites
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}