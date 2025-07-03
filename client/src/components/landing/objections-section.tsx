import { AlertCircle, Check, Heart, Clock, Brain, Shield, DollarSign } from "lucide-react";

export function ObjectionsSection() {
  const objections = [
    {
      icon: AlertCircle,
      question: "Ai, Dra... será que consigo seguir? Sou muito desorganizada...",
      answer: "Relaxa! 😊 Eu criei pensando exatamente em pessoas como você. São só 3 minutinhos antes de dormir, bem simples. Até quem trabalha em 3 turnos conseguiu. Você também vai conseguir, confia em mim.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      question: "Dra, faz anos que não durmo... funciona mesmo pra casos graves?",
      answer: "Eu entendo essa angústia. 💙 Já atendi pessoas que não dormiam há 10, 15 anos! O método trabalha exatamente com essa mente agitada. É como se acalmasse seus pensamentos de dentro pra fora. Você merece essa paz.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      question: "Quanto tempo até eu conseguir dormir direito?",
      answer: "Olha, cada pessoa é única, né? 🌙 Algumas dormem melhor na primeira noite mesmo (é incrível!). Outras levam 3-4 dias. Mas posso te garantir: em uma semana você vai se olhar no espelho e pensar 'nossa, como mudei!'",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      question: "Não quero mais tomar remédio... é natural mesmo?",
      answer: "Completamente natural! ✨ Zero química, zero dependência. São técnicas que nossos avós já usavam, que os orientais passam de geração em geração. Seu corpo sabe dormir, só precisa lembrar como.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      question: "E se não der certo pra mim? Já tentei tanta coisa...",
      answer: "Eu sei que você já deve ter se frustrado antes... 💔 Por isso te dou 7 dias de garantia total. Se não funcionar, você pega seu dinheiro de volta. Mas sabia que em 15 anos, menos de 3% pediram reembolso?",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: DollarSign,
      question: "Tô meio apertada... vale mesmo a pena?",
      answer: "Te entendo perfeitamente. 💝 Pensa assim: uma consulta comigo custa R$ 450. Remédio pra dormir sai R$ 180 por mês. O Sono Zen custa menos que duas noites de delivery que você pede quando tá cansada demais pra cozinhar.",
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
            "Dra. Deborah, eu queria tanto..."
            <span className="bg-gradient-to-r from-[var(--ritual-blue-light)] to-[var(--ritual-blue)] bg-clip-text text-transparent"> Mas e se...</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Olha, eu entendo completamente suas preocupações. 💙 Nos meus 15 anos atendendo pessoas que sofrem com insônia, 
            escuto essas mesmas dúvidas todos os dias. Deixa eu te tranquilizar...
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

                  <p className="text-slate-300 leading-relaxed">
                    {objection.answer}
                  </p>
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
            <h3 className="text-2xl font-bold text-white">Quer bater um papo comigo? 💙</h3>
            <p className="text-slate-300 max-w-md leading-relaxed">
              Se ainda ficou alguma dúvida no seu coração, me chama no WhatsApp! 
              Adoro conversar com quem realmente quer transformar suas noites. 
              Estou aqui para te acompanhar nessa jornada para o sono perfeito.
            </p>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const whatsappNumber = "5513996116102";
                const message = "Oi Dra. Deborah! Vi seu método Sono Zen e fiquei interessada. Pode me ajudar com algumas dúvidas? 😊";
                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 hover:scale-105 transform"
            >
              <Heart className="h-5 w-5" />
              Chamar a Dra. Deborah 💬
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}