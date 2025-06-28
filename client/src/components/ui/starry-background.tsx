interface StarryBackgroundProps {
  className?: string;
}

export function StarryBackground({ className = "" }: StarryBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Estrelas pequenas cintilantes */}
      <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-breathe" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-32 right-1/3 w-0.5 h-0.5 bg-yellow-200 rounded-full opacity-80 animate-breathe" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-1/5 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-50 animate-breathe" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-70 animate-breathe" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-1/5 w-1 h-1 bg-purple-200 rounded-full opacity-60 animate-breathe" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-20 right-10 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-breathe" style={{ animationDelay: '5s' }}></div>
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-blue-100 rounded-full opacity-40 animate-breathe" style={{ animationDelay: '6s' }}></div>
      <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-60 animate-breathe" style={{ animationDelay: '7s' }}></div>
      <div className="absolute top-16 left-3/4 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-breathe" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute bottom-10 left-2/3 w-0.5 h-0.5 bg-purple-100 rounded-full opacity-50 animate-breathe" style={{ animationDelay: '4.5s' }}></div>
      
      {/* Constelações sutis */}
      <svg className="absolute top-1/4 left-1/2 w-20 h-20 opacity-20" style={{ transform: 'translateX(-50%)' }}>
        <circle cx="5" cy="5" r="0.5" fill="white" className="animate-breathe" style={{ animationDelay: '1s' }} />
        <circle cx="15" cy="8" r="0.5" fill="white" className="animate-breathe" style={{ animationDelay: '1.5s' }} />
        <circle cx="8" cy="15" r="0.5" fill="white" className="animate-breathe" style={{ animationDelay: '2s' }} />
        <line x1="5" y1="5" x2="15" y2="8" stroke="white" strokeWidth="0.2" opacity="0.3" />
        <line x1="15" y1="8" x2="8" y2="15" stroke="white" strokeWidth="0.2" opacity="0.3" />
      </svg>
      
      <svg className="absolute bottom-1/4 right-1/4 w-16 h-16 opacity-15">
        <circle cx="4" cy="4" r="0.5" fill="rgba(135, 206, 250, 0.8)" className="animate-breathe" style={{ animationDelay: '3s' }} />
        <circle cx="12" cy="6" r="0.5" fill="rgba(135, 206, 250, 0.8)" className="animate-breathe" style={{ animationDelay: '3.5s' }} />
        <circle cx="7" cy="12" r="0.5" fill="rgba(135, 206, 250, 0.8)" className="animate-breathe" style={{ animationDelay: '4s' }} />
        <line x1="4" y1="4" x2="12" y2="6" stroke="rgba(135, 206, 250, 0.4)" strokeWidth="0.2" />
        <line x1="12" y1="6" x2="7" y2="12" stroke="rgba(135, 206, 250, 0.4)" strokeWidth="0.2" />
      </svg>
    </div>
  );
}