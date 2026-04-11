import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Callout.css';

export type CalloutSentiment = 'success' | 'warning' | 'error' | 'informative';
export type CalloutLayout = 'inline' | 'flush';

export interface CalloutProps {
  sentiment: CalloutSentiment;
  layout?: CalloutLayout;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const DEFAULT_ICONS: Record<CalloutSentiment, ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm-1 11.4L5.6 10l1.4-1.4L9 10.6l4-4L14.4 8l-5.4 5.4Z" fill="currentColor"/>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2 1 17h18L10 2Zm0 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-1-4V9h2v2h-2Z" fill="currentColor"/>
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm1 11H9V9h2v4Zm0-6H9V5h2v2Z" fill="currentColor"/>
    </svg>
  ),
  informative: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm1 11H9V9h2v4Zm0-6H9V5h2v2Z" fill="currentColor"/>
    </svg>
  ),
};

export function Callout({
  sentiment,
  layout = 'inline',
  title,
  children,
  icon,
  action,
  className,
}: CalloutProps) {
  return (
    <div
      role="alert"
      className={clsx(
        'callout',
        `callout--${sentiment}`,
        `callout--${layout}`,
        className,
      )}
    >
      <span className="callout__icon">{icon ?? DEFAULT_ICONS[sentiment]}</span>
      <div className="callout__body">
        {title && <p className="callout__title text-s-medium">{title}</p>}
        <div className="callout__message text-s-regular">{children}</div>
        {action && <div className="callout__action">{action}</div>}
      </div>
    </div>
  );
}
