import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="relative h-12 w-40">
      <Image
        src="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/capture2-removebg-preview-38d1ee3.png"
        alt="Courtingly Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;