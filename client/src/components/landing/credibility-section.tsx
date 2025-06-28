import { Award, Users, Star, TrendingUp, Heart, Shield } from "lucide-react";

export function CredibilitySection() {
  const credibilityItems = [
    {
      icon: Users,
      number: "12.847+",
      label: "Vidas Transformadas",
      description: "Pessoas que já conquistaram o sono perfeito"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Avaliação Média",
      description: "Baseado em mais de 8.000 depoimentos reais"
    },
    {
      icon: Award,
      number: "97%",
      label: "Taxa de Sucesso",
      description: "Dos usuários relatam melhora em 7 dias"
    },
    {
      icon: TrendingUp,
      number: "89%",
      label: "Redução na Insônia",
      description: "Diminuição significativa do tempo para adormecer"
    }
  ];

  const badges = [
    {
      icon: Shield,
      title: "Método Aprovado",
      subtitle: "Por especialistas em sono"
    },
    {
      icon: Heart,
      title: "100% Natural",
      subtitle: "Zero medicamentos"
    },
    {
      icon: Award,
      title: "Garantia Total",
      subtitle: "30 dias ou dinheiro de volta"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 70% 70%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credibilityItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-slate-700/60 to-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--warm-accent)] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{item.number}</div>
                  <div className="text-[var(--warm-accent)] font-semibold mb-1">{item.label}</div>
                  <div className="text-slate-400 text-sm">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-slate-700/60 to-slate-800/80 backdrop-blur-md rounded-xl px-6 py-4 border border-slate-600/40">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">{badge.title}</div>
                  <div className="text-slate-400 text-sm">{badge.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Activity */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-semibold">
              <span className="animate-pulse font-bold">127 pessoas</span> estão lendo o método agora mesmo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}