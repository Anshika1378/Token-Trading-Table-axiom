/**
 * Avatar Atom Component
 * Displays token avatars with colorful gradient fallbacks
 */

'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const fallbackSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

// Vibrant gradient combinations for token avatars
const gradientColors = [
  'from-orange-500 to-red-600',      // Orange-Red
  'from-pink-500 to-rose-600',       // Pink-Rose
  'from-violet-500 to-purple-600',   // Violet-Purple
  'from-blue-500 to-indigo-600',     // Blue-Indigo
  'from-cyan-500 to-blue-600',       // Cyan-Blue
  'from-teal-500 to-emerald-600',    // Teal-Emerald
  'from-green-500 to-lime-600',      // Green-Lime
  'from-yellow-500 to-orange-600',   // Yellow-Orange
  'from-fuchsia-500 to-pink-600',    // Fuchsia-Pink
  'from-rose-500 to-red-600',        // Rose-Red
  'from-indigo-500 to-violet-600',   // Indigo-Violet
  'from-emerald-500 to-teal-600',    // Emerald-Teal
  'from-amber-500 to-yellow-600',    // Amber-Yellow
  'from-red-500 to-orange-600',      // Red-Orange
  'from-purple-500 to-indigo-600',   // Purple-Indigo
  'from-sky-500 to-cyan-600',        // Sky-Cyan
];

/**
 * Generate a deterministic gradient based on the input string
 */
export function getAvatarGradient(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradientColors.length;
  return gradientColors[index];
}

export const Avatar = memo(function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
  rounded = 'lg',
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Generate fallback text from alt
  const fallbackText = fallback || alt.substring(0, 2).toUpperCase();

  // Generate deterministic gradient from alt
  const gradient = getAvatarGradient(alt);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center font-bold text-white bg-gradient-to-br',
          gradient,
          sizeClasses[size],
          roundedClasses[rounded],
          className
        )}
        aria-label={alt}
      >
        <span className={cn(fallbackSizeClasses[size], 'drop-shadow-sm')}>
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-zinc-800 flex-shrink-0',
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="object-cover w-full h-full"
        onError={() => setHasError(true)}
        unoptimized // Using external URLs
      />
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;


