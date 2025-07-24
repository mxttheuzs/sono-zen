import sonoZenLogo from "@assets/SONO ZEN - Logo com Melhor Equilíbrio_1753353088615.png";

interface SonoZenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function SonoZenLogo({ 
  className = "", 
  size = 'md',
  showText = true 
}: SonoZenLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={sonoZenLogo} 
        alt="Sono Zen - Método Oriental"
        className={`${sizeClasses[size]} object-contain filter drop-shadow-lg`}
      />
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-[var(--sono-golden)] tracking-wide`}>
            SONO ZEN
          </h1>
          <p className="text-sm text-[var(--sono-golden)]/80 font-medium tracking-wider">
            MÉTODO ORIENTAL
          </p>
        </div>
      )}
    </div>
  );
}