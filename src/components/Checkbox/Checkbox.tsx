import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  size?: 's' | 'm';
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  size = 'm',
  indeterminate = false,
  disabled,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id ?? `cb-${Math.random().toString(36).slice(2)}`;

  return (
    <label className={clsx('checkbox-wrap', disabled && 'checkbox-wrap--disabled', className)} htmlFor={inputId}>
      <span className={clsx('checkbox__box', `checkbox__box--${size}`)}>
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          className="checkbox__input"
          {...props}
        />
        <span className="checkbox__check" aria-hidden>
          {indeterminate ? (
            <svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6l3 3 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
