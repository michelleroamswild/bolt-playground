import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Avatar.css';

export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  icon?: ReactNode;
  className?: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, src, size = 'm', icon, className }: AvatarProps) {
  return (
    <span className={clsx('avatar', `avatar--${size}`, className)} aria-label={name}>
      {src ? (
        <img src={src} alt={name ?? ''} className="avatar__img" />
      ) : icon ? (
        <span className="avatar__icon">{icon}</span>
      ) : name ? (
        <span className="avatar__initials text-xs-medium">{initials(name)}</span>
      ) : (
        <svg className="avatar__placeholder" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4Z"/>
        </svg>
      )}
    </span>
  );
}
