import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Tag.css';

export type TagSentiment = 'neutral' | 'success' | 'warning' | 'error' | 'informative' | 'highlight' | 'quiet';
export type TagSize = 's' | 'm';

export interface TagProps {
  sentiment?: TagSentiment;
  size?: TagSize;
  outline?: boolean;
  inverse?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tag({
  sentiment = 'neutral',
  size = 'm',
  outline = false,
  inverse = false,
  iconLeft,
  iconRight,
  children,
  className,
}: TagProps) {
  return (
    <span
      className={clsx(
        'tag',
        `tag--${sentiment}`,
        `tag--${size}`,
        outline && 'tag--outline',
        inverse && 'tag--inverse',
        className,
      )}
    >
      {iconLeft && <span className="tag__icon">{iconLeft}</span>}
      <span className="tag__label">{children}</span>
      {iconRight && <span className="tag__icon">{iconRight}</span>}
    </span>
  );
}
