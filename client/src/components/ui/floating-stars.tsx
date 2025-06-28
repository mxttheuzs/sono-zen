interface FloatingStarsProps {
  className?: string;
  density?: 'light' | 'medium' | 'heavy';
}

export function FloatingStars({ className = "", density = 'medium' }: FloatingStarsProps) {
  const starCount = density === 'light' ? 15 : density === 'medium' ? 25 : 35;
  
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 3 + 1; // 1-4px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 4 + 3; // 3-7s
      const opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
      
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: opacity,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {generateStars()}
      
      {/* Estrelas especiais com formas */}
      <svg className="absolute top-1/4 left-1/6 w-4 h-4 opacity-60 animate-pulse" style={{ animationDelay: '1s' }}>
        <path d="M2 1 L2.5 2.5 L4 2 L2.5 3.5 L2 5 L1.5 3.5 L0 2 L1.5 2.5 Z" fill="white" />
      </svg>
      
      <svg className="absolute top-3/4 right-1/5 w-3 h-3 opacity-50 animate-pulse" style={{ animationDelay: '3s' }}>
        <path d="M1.5 0.5 L2 1.5 L3 1 L2 2.5 L1.5 3.5 L1 2.5 L0 1 L1 1.5 Z" fill="white" />
      </svg>
      
      <svg className="absolute top-1/2 left-3/4 w-5 h-5 opacity-40 animate-pulse" style={{ animationDelay: '5s' }}>
        <path d="M2.5 0.5 L3 2 L4.5 1.5 L3 3 L2.5 4.5 L2 3 L0.5 1.5 L2 2 Z" fill="white" />
      </svg>
      
      {/* Partículas brilhantes */}
      <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-blue-300/60 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-200/50 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-purple-200/40 rounded-full animate-ping" style={{ animationDelay: '6s' }}></div>
    </div>
  );
}