'use client';

import { useMemo } from 'react';

export function MeshBackground() {
  const stars = useMemo(() => {
    const arr: { top: string; left: string; size: number; delay: string; dur: string; maxOpacity: number }[] = [];
    for (let i = 0; i < 120; i++) {
      arr.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: `${Math.random() * 6}s`,
        dur: `${Math.random() * 4 + 3}s`,
        maxOpacity: Math.random() * 0.6 + 0.2,
      });
    }
    return arr;
  }, []);

  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <div
          className="mesh-orb"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, #7A3CFF, transparent 70%)',
            top: '30%',
            left: '40%',
            animation: 'float-orb-1 22s ease-in-out infinite',
          }}
        />
        <div
          className="mesh-orb"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, #9356FF, transparent 70%)',
            top: '60%',
            left: '15%',
            animation: 'float-orb-2 28s ease-in-out infinite',
          }}
        />
      </div>
      <div className="starfield" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              ['--delay' as string]: s.delay,
              ['--dur' as string]: s.dur,
              ['--max-opacity' as string]: s.maxOpacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
