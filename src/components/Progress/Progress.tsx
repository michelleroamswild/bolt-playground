import clsx from 'clsx';
import './Progress.css';

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: 's' | 'm';
  sentiment?: 'default' | 'success' | 'warning' | 'error';
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  size = 'm',
  sentiment = 'default',
  indeterminate = false,
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const pct = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  const showHeader = Boolean(label) || showValue;

  return (
    <div
      className={clsx('progress', `progress--${size}`, `progress--${sentiment}`, className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={label}
    >
      {showHeader && (
        <div className="progress__header">
          {label && <span className="progress__label text-s-medium">{label}</span>}
          {showValue && !indeterminate && (
            <span className="progress__value text-s-regular">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className="progress__track">
        <div
          className={clsx('progress__fill', indeterminate && 'progress__fill--indeterminate')}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
