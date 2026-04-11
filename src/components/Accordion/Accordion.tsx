import { useState } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Accordion.css';

export type AccordionSize = 's' | 'm';

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  size?: AccordionSize;
}

export function AccordionItem({ title, children, defaultOpen = false, disabled = false, size = 'm' }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `accordion-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={clsx('accordion-item', `accordion-item--${size}`, open && 'accordion-item--open', disabled && 'accordion-item--disabled')}>
      <button
        className="accordion-item__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => !disabled && setOpen(v => !v)}
        disabled={disabled}
      >
        <span className="accordion-item__title text-s-medium">{title}</span>
        <span className="accordion-item__chevron" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div
        id={id}
        className="accordion-item__panel"
        hidden={!open}
      >
        <div className="accordion-item__content text-s-regular">
          {children}
        </div>
      </div>
    </div>
  );
}

export interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={clsx('accordion', className)}>
      {children}
    </div>
  );
}
