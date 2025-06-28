interface FloatingParticlesProps {
  className?: string;
}

export function FloatingParticles({ className = "" }: FloatingParticlesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Partículas pequenas flutuando suavemente */}
      <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-soft-gold/60 rounded-full animate-gentle-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-accent-blue/40 rounded-full animate-gentle-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-lavender-mist/50 rounded-full animate-gentle-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/2 right-1/6 w-0.5 h-0.5 bg-moonlight-blue/60 rounded-full animate-gentle-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-soft-gold/40 rounded-full animate-gentle-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-3/4 left-1/5 w-0.5 h-0.5 bg-accent-blue/50 rounded-full animate-gentle-float" style={{ animationDelay: '5s' }}></div>
      <div className="absolute top-16 left-3/4 w-1 h-1 bg-lavender-mist/40 rounded-full animate-gentle-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-16 left-1/2 w-0.5 h-0.5 bg-moonlight-blue/50 rounded-full animate-gentle-float" style={{ animationDelay: '3.5s' }}></div>
      
      {/* Partículas que respiram suavemente */}
      <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-soft-gold/30 rounded-full animate-breathe" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/5 left-1/4 w-1.5 h-1.5 bg-accent-blue/25 rounded-full animate-breathe" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-2/3 w-1 h-1 bg-lavender-mist/35 rounded-full animate-breathe" style={{ animationDelay: '6s' }}></div>
      
      {/* Círculos maiores bem sutis */}
      <div className="absolute top-1/6 left-2/3 w-6 h-6 border border-moonlight-blue/20 rounded-full animate-gentle-float" style={{ animationDelay: '8s' }}></div>
      <div className="absolute bottom-1/6 right-1/2 w-8 h-8 border border-lavender-mist/15 rounded-full animate-gentle-float" style={{ animationDelay: '10s' }}></div>
    </div>
  );
}