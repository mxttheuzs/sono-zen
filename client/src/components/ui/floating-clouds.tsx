interface FloatingCloudsProps {
  className?: string;
}

export function FloatingClouds({ className = "" }: FloatingCloudsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Nuvens simplificadas - menos elementos para melhor performance */}
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
      
      {/* Pontos de luz reduzidos - apenas 3 elementos para melhor performance */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-200/40 rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-yellow-200/50 rounded-full animate-sparkle" style={{ animationDelay: '5s' }}></div>
      <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
