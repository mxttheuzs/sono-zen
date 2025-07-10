import { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export function LazySection({ children, className = "", threshold = 0.1 }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (
        <div className="py-20 flex items-center justify-center">
          <div className="text-[var(--text-secondary)] text-sm">Carregando...</div>
        </div>
      )}
    </div>
  );
}