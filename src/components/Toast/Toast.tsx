import { useEffect } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import './Toast.css';

export type ToastSentiment = 'default' | 'success' | 'error' | 'warning';

export interface ToastProps {
  message: string;
  description?: string;
  sentiment?: ToastSentiment;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  duration?: number; // ms, 0 = persistent
  inverse?: boolean;
  className?: string;
}

const ICONS: Record<ToastSentiment, ReactNode> = {
  default: null,
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 9 7.5 12.75l6.75-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 6v4M9 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 6v4M9 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export function Toast({
  message,
  description,
  sentiment = 'default',
  action,
  onDismiss,
  duration = 4000,
  inverse = false,
  className,
}: ToastProps) {
  useEffect(() => {
    if (duration === 0 || !onDismiss) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  const icon = ICONS[sentiment];

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'toast',
        `toast--${sentiment}`,
        inverse && 'toast--inverse',
        className,
      )}
    >
      {icon && <span className="toast__icon">{icon}</span>}
      <div className="toast__content">
        <p className="toast__message text-s-medium">{message}</p>
        {description && <p className="toast__description text-s-regular">{description}</p>}
      </div>
      {action && (
        <button className="toast__action text-s-medium" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button className="toast__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4 4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// ── Toast container ──────────────────────────────────────────
export interface ToastItem extends ToastProps {
  id: string;
}

export function ToastContainer({ toasts, onDismiss }: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map(t => (
        <Toast key={t.id} {...t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}
