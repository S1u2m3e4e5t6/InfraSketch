import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface StarfallBackgroundProps {
  className?: string;
}

const StarfallBackground: React.FC<StarfallBackgroundProps> = ({ className = '' }) => {
  const stars = useMemo(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 100; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
      });
    }
    return starArray;
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: -10 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
      
      {stars.map((star, index) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['-20px', '100vh'],
            opacity: [0, star.opacity, 0],
            x: [0, `${(Math.random() - 0.5) * 100}px`],
          }}
          transition={{
            duration: star.speed * 8,
            repeat: Infinity,
            delay: star.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Parallax layers */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`layer-${i}`}
            className="absolute rounded-full bg-blue-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarfallBackground;