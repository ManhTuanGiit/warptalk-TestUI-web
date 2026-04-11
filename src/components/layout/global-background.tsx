import React from 'react';

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" style={{ backgroundColor: '#07110E' }}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundImage: 'linear-gradient(to bottom right, #07110E, #0A1714, #0B1D19, #08110F)' }}
      />
      
      {/* Subtle haze */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(220,255,230,0.05), rgba(255,255,255,0.03))' }}
      />
      
      {/* Central glow */}
      <div 
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[80px]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(190, 255, 210, 0.22) 0%, rgba(120, 255, 170, 0.10) 40%, transparent 70%)' }}
      />
      
      {/* Left ambient glow */}
      <div 
        className="absolute top-1/4 -left-[20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(120, 255, 170, 0.08) 0%, transparent 60%)' }}
      />
      
      {/* Right ambient glow */}
      <div 
        className="absolute bottom-1/4 -right-[20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(120, 255, 170, 0.07) 0%, transparent 60%)' }}
      />
    </div>
  );
}
