import React from 'react';
import { Moon, Star, Cloud } from 'lucide-react';

interface Floating3DElementsProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
}

export function Floating3DElements({ className = '', density = 'medium' }: Floating3DElementsProps) {
  const elementCount = density === 'low' ? 3 : density === 'medium' ? 6 : 9;
  
  const elements = Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    type: ['moon', 'star', 'cloud'][i % 3] as 'moon' | 'star' | 'cloud',
    size: Math.random() * 30 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  const renderElement = (element: typeof elements[0]) => {
    const IconComponent = element.type === 'moon' ? Moon : element.type === 'star' ? Star : Cloud;
    
    return (
      <div
        key={element.id}
        className="absolute floating-3d-element"
        style={{
          left: `${element.x}%`,
          top: `${element.y}%`,
          animationDelay: `${element.delay}s`,
          animationDuration: `${element.duration}s`,
        }}
      >
        <div className="floating-3d-container">
          <IconComponent 
            size={element.size}
            className={`
              floating-3d-icon
              ${element.type === 'moon' ? 'text-blue-300/30' : ''}
              ${element.type === 'star' ? 'text-yellow-300/20' : ''}
              ${element.type === 'cloud' ? 'text-white/10' : ''}
            `}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map(renderElement)}
    </div>
  );
}

export function Floating3DCubes({ className = '' }: { className?: string }) {
  const cubes = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    size: Math.random() * 40 + 30,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 25,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {cubes.map((cube) => (
        <div
          key={cube.id}
          className="absolute floating-3d-cube"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            animationDelay: `${cube.delay}s`,
            animationDuration: `${cube.duration}s`,
          }}
        >
          <div className="cube-3d">
            <div className="cube-face cube-front"></div>
            <div className="cube-face cube-back"></div>
            <div className="cube-face cube-right"></div>
            <div className="cube-face cube-left"></div>
            <div className="cube-face cube-top"></div>
            <div className="cube-face cube-bottom"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Floating3DSpheres({ className = '' }: { className?: string }) {
  const spheres = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    size: Math.random() * 60 + 40,
    delay: Math.random() * 8,
    duration: Math.random() * 15 + 20,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {spheres.map((sphere) => (
        <div
          key={sphere.id}
          className="absolute floating-3d-sphere"
          style={{
            left: `${sphere.x}%`,
            top: `${sphere.y}%`,
            width: `${sphere.size}px`,
            height: `${sphere.size}px`,
            animationDelay: `${sphere.delay}s`,
            animationDuration: `${sphere.duration}s`,
          }}
        >
          <div className="sphere-3d"></div>
        </div>
      ))}
    </div>
  );
}