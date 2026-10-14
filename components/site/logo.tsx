import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showEmblem?: boolean;
  showBadge?: boolean;
  asLink?: boolean;
  priority?: boolean;
}

const sizeConfig = {
  sm: {
    textHeight: 22,
    textWidth: 130,
    badgeText: 'text-[9px]',
  },
  md: {
    textHeight: 28,
    textWidth: 165,
    badgeText: 'text-[10px]',
  },
  lg: {
    textHeight: 34,
    textWidth: 200,
    badgeText: 'text-[11px]',
  },
};

export function Logo({
  className,
  size = 'md',
  showText = true,
  showEmblem = false,
  showBadge = true,
  asLink = false,
  priority = false,
}: LogoProps) {
  const cfg = sizeConfig[size];

  const content = (
    <div className={cn('group inline-flex items-center gap-3', className)}>
      {showEmblem && (
        <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/emblem-transparent.webp"
            alt="Ethixweb Emblem"
            width={28}
            height={28}
            className="h-auto w-auto object-contain drop-shadow-sm"
            priority={priority}
          />
        </div>
      )}

      {showText && (
        <div className="relative flex items-center">
          <Image
            src="/ethixweb-logo-text.webp"
            alt="Ethixweb"
            width={cfg.textWidth}
            height={cfg.textHeight}
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105 invert dark:invert-0"
            style={{ height: `${cfg.textHeight}px`, width: 'auto' }}
            priority={priority}
          />
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Ethixweb Home" className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
