interface FloatingCloudsProps {
  className?: string;
}

export function FloatingClouds({ className = "" }: FloatingCloudsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Nuvens suaves com SVG - mais dinâmicas */}
      <svg className="absolute top-10 left-5 w-32 h-20 opacity-20 animate-slow-drift" style={{ animationDelay: '0s' }}>
        <path d="M20 15 Q10 5 25 5 Q35 0 45 5 Q55 0 65 5 Q75 5 65 15 Q70 20 60 20 L25 20 Q15 20 20 15" 
              fill="white" />
      </svg>
      
      <svg className="absolute top-32 right-20 w-40 h-24 opacity-25 animate-slow-drift" style={{ animationDelay: '3s' }}>
        <path d="M25 18 Q12 8 30 8 Q42 0 55 8 Q68 0 80 8 Q92 8 80 18 Q85 25 75 25 L30 25 Q18 25 25 18" 
              fill="white" />
      </svg>
      
      <svg className="absolute bottom-20 left-1/4 w-36 h-22 opacity-30 animate-slow-drift" style={{ animationDelay: '6s' }}>
        <path d="M22 16 Q11 6 27 6 Q38 0 50 6 Q62 0 74 6 Q85 6 74 16 Q79 22 69 22 L27 22 Q16 22 22 16" 
              fill="white" />
      </svg>
      
      <svg className="absolute top-1/2 right-1/3 w-28 h-18 opacity-22 animate-slow-drift" style={{ animationDelay: '1.5s' }}>
        <path d="M18 14 Q9 4 23 4 Q32 0 42 4 Q52 0 62 4 Q71 4 62 14 Q66 19 58 19 L23 19 Q13 19 18 14" 
              fill="white" />
      </svg>
      
      <svg className="absolute bottom-32 right-10 w-44 h-26 opacity-28 animate-slow-drift" style={{ animationDelay: '4.5s' }}>
        <path d="M28 20 Q15 10 35 10 Q48 2 62 10 Q76 2 90 10 Q104 10 90 20 Q96 28 84 28 L35 28 Q20 28 28 20" 
              fill="white" />
      </svg>
      
      {/* Nuvens menores em movimento contínuo */}
      <svg className="absolute top-1/3 left-1/6 w-24 h-16 opacity-15 animate-float-cloud" style={{ animationDelay: '2s' }}>
        <path d="M16 12 Q8 4 20 4 Q28 0 36 4 Q44 0 52 4 Q60 4 52 12 Q56 16 48 16 L20 16 Q12 16 16 12" 
              fill="white" />
      </svg>
      
      <svg className="absolute top-2/3 right-1/5 w-32 h-20 opacity-18 animate-float-cloud" style={{ animationDelay: '8s' }}>
        <path d="M20 15 Q10 5 25 5 Q35 0 45 5 Q55 0 65 5 Q75 5 65 15 Q70 20 60 20 L25 20 Q15 20 20 15" 
              fill="white" />
      </svg>
      
      {/* Partículas brilhantes mais numerosas */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-200/40 rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-yellow-200/50 rounded-full animate-sparkle" style={{ animationDelay: '5s' }}></div>
      <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-purple-200/60 rounded-full animate-sparkle" style={{ animationDelay: '7s' }}></div>
      <div className="absolute top-1/6 right-2/5 w-1.5 h-1.5 bg-pink-200/45 rounded-full animate-sparkle" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-3/5 w-2 h-2 bg-cyan-200/35 rounded-full animate-sparkle" style={{ animationDelay: '9s' }}></div>
      
      {/* Pontos de luz que pulsam */}
      <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/6 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-3/5 left-1/6 w-1 h-1 bg-white/40 rounded-full animate-twinkle" style={{ animationDelay: '6s' }}></div>
      
      {/* Nuvens deslizantes no fundo - mais rápidas */}
      <svg className="absolute top-5 w-20 h-12 opacity-12 animate-float-cloud" style={{ animationDelay: '0s' }}>
        <path d="M15 10 Q8 3 18 3 Q25 0 32 3 Q39 0 46 3 Q53 3 46 10 Q49 14 43 14 L18 14 Q11 14 15 10" 
              fill="white" />
      </svg>
      
      <svg className="absolute bottom-5 w-24 h-14 opacity-10 animate-float-cloud" style={{ animationDelay: '10s' }}>
        <path d="M18 12 Q10 4 22 4 Q30 0 38 4 Q46 0 54 4 Q62 4 54 12 Q58 17 51 17 L22 17 Q13 17 18 12" 
              fill="white" />
      </svg>
      
      <svg className="absolute top-1/2 w-16 h-10 opacity-8 animate-float-cloud" style={{ animationDelay: '15s' }}>
        <path d="M12 8 Q6 2 15 2 Q21 0 27 2 Q33 0 39 2 Q45 2 39 8 Q42 12 36 12 L15 12 Q9 12 12 8" 
              fill="white" />
      </svg>
    </div>
  );
}
