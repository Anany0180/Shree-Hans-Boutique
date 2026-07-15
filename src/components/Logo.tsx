import React from 'react';
import logoImg from '../assets/images/shree_hans_logo_1784093902165.jpg';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative flex items-center justify-center bg-[#fdfbf7] ${className}`}>
      <img
        src={logoImg}
        alt="Shree Hans Boutique Logo"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Typographic elegant fallback if the image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = 'w-full h-full bg-maroon-600 text-gold-100 flex items-center justify-center font-serif font-bold text-lg';
            fallback.innerText = 'SH';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};
