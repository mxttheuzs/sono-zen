import React, { ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  depth?: 'shallow' | 'medium' | 'deep';
}

export function Card3D({ children, className = '', hover = true, depth = 'medium' }: Card3DProps) {
  const depthClasses = {
    shallow: 'hover:transform hover:rotateY(2deg) hover:rotateX(2deg) hover:translateZ(5px)',
    medium: 'hover:transform hover:rotateY(5deg) hover:rotateX(5deg) hover:translateZ(10px)',
    deep: 'hover:transform hover:rotateY(8deg) hover:rotateX(8deg) hover:translateZ(15px)',
  };

  return (
    <div className={`card-3d ${className}`}>
      <div className={`card-3d-inner ${hover ? depthClasses[depth] : ''}`}>
        <div className="card-3d-face">
          {children}
        </div>
      </div>
    </div>
  );
}

interface Button3DProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'zen';
}

export function Button3D({ children, onClick, className = '', variant = 'primary' }: Button3DProps) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] text-white',
    secondary: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white',
    zen: 'bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`
        button-3d px-6 py-3 rounded-xl font-semibold
        transition-all duration-300 ease-out
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface Section3DProps {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
}

export function Section3D({ children, className = '', parallax = false }: Section3DProps) {
  return (
    <div 
      className={`
        relative transform-gpu
        ${parallax ? 'parallax-3d' : ''}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
}