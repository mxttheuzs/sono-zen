export function MethodSection() {
  return (
    <section id="metodo" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            O Método
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Um método simples e natural baseado em técnicas orientais milenares 
            que prepara seu corpo e mente para um sono profundo e reparador.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Relaxamento</h3>
              <p className="text-gray-400">Técnicas de respiração e relaxamento muscular</p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">Sons Terapêuticos</h3>
              <p className="text-gray-400">Frequências especiais para induzir o sono</p>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold text-white mb-2">Rituais Noturnos</h3>
              <p className="text-gray-400">Rotinas que preparam o corpo para dormir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
