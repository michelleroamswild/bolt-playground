import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Toggle.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  label,
  disabled,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id ?? `toggle-${Math.random().toString(36).slice(2)}`;

  return (
    <label className={clsx('toggle-wrap', disabled && 'toggle-wrap--disabled', className)} htmlFor={inputId}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={inputId}
        disabled={disabled}
        className="toggle__input"
        {...props}
      />
      <span className="toggle__track" aria-hidden>
        <span className="toggle__thumb" />
      </span>
      {label && <span className="toggle__label text-s-medium">{label}</span>}
    </label>
  );
});

Toggle.displayName = 'Toggle';
