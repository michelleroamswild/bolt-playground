import { useId } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const id = useId();
  return (
    <span className={clsx('tooltip', `tooltip--${placement}`, className)}>
      <span className="tooltip__trigger" aria-describedby={id}>
        {children}
      </span>
      <span role="tooltip" id={id} className="tooltip__bubble text-xs-regular">
        {content}
      </span>
    </span>
  );
}
