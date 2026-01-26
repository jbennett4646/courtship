import React from 'react';
import Image from 'next/image';


const Logo: React.FC = () => {
  return (
    <div className="relative h-12 w-40">
      <Image
        src="/logo.png"
        alt="Courtingly Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;