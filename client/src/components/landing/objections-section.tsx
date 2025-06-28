import { AlertCircle, Check, Heart, Clock, Brain, Shield, DollarSign } from "lucide-react";

export function ObjectionsSection() {
  const objections = [
    {
      icon: AlertCircle,
      question: "E se eu não conseguir seguir as técnicas?",
      answer: "O método foi desenvolvido para ser SIMPLES. São apenas 3 passos por noite, cada um leva menos de 5 minutos. Milhares de pessoas com rotinas corridas já conseguiram.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      question: "Funciona para insônia crônica?",
      answer: "SIM! O método foi testado especificamente em casos de insônia severa. As técnicas orientais trabalham diretamente no sistema nervoso, acalmando a mente hiperativa.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      question: "Quanto tempo leva para ver resultados?",
      answer: "Muitas pessoas dormem melhor já na primeira noite! Outras sentem a diferença na terceira noite. O que todos relatam: em 7 dias, você não vai reconhecer seu sono.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      question: "É realmente natural? Sem medicamentos?",
      answer: "100% NATURAL! Zero medicamentos, zero química. Apenas técnicas milenares orientais que trabalham com a sabedoria natural do seu corpo.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      question: "E se não funcionar para mim?",
      answer: "Garantia TOTAL de 30 dias. Se por qualquer motivo não funcionar, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: DollarSign,
      question: "Vale a pena o investimento?",
      answer: "Compare: uma consulta com especialista custa R$ 300+. Remédios para dormir custam R$ 150/mês. O Sono Zen custa menos que 2 noites mal dormidas e resolve PARA SEMPRE.",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black to-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Mas Dr. Deborah...
            <span className="bg-gradient-to-r from-[var(--warm-accent)] to-orange-400 bg-clip-text text-transparent"> E Se...</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Deixe-me esclarecer as dúvidas mais comuns dos meus pacientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objections.map((objection, index) => {
            const IconComponent = objection.icon;
            return (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${objection.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md rounded-3xl p-8 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${objection.color} rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                    {objection.question}
                  </h3>

                  <p className="text-slate-300 leading-relaxed mb-6">
                    {objection.answer}
                  </p>

                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="h-5 w-5" />
                    <span className="font-semibold">Garantido</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700/40">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--warm-accent)] to-orange-500 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Ainda tem dúvidas?</h3>
            <p className="text-slate-300 max-w-md">
              Fale comigo diretamente! Estou aqui para ajudar você a ter as melhores noites da sua vida.
            </p>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const whatsappNumber = "5513996116102";
                const message = "Dra. Deborah, tenho algumas dúvidas sobre o método Sono Zen. Pode me ajudar?";
                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
            >
              <Heart className="h-5 w-5" />
              Conversar com a Dra. Deborah
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}