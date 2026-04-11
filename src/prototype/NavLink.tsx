import type { ReactNode } from 'react';
import clsx from 'clsx';
import './NavLink.css';

interface NavLinkProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export function NavLink({ icon, label, active, badge, onClick }: NavLinkProps) {
  return (
    <button
      className={clsx('nav-link', active && 'nav-link--active')}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="nav-link__icon">{icon}</span>
      <span className="nav-link__label text-s-medium">{label}</span>
      {badge !== undefined && (
        <span className="nav-link__badge text-xs-medium">{badge}</span>
      )}
    </button>
  );
}
