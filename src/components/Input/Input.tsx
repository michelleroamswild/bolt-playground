import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import './Input.css';

export type InputSize = 's' | 'm';
export type InputVariant = 'outline' | 'flat';
export type InputStatus = 'default' | 'error' | 'warning';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: InputSize;
  variant?: InputVariant;
  status?: InputStatus;
  hint?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  size = 'm',
  variant = 'outline',
  status = 'default',
  hint,
  iconLeft,
  iconRight,
  disabled,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={clsx('input-wrap', className)}>
      {label && (
        <label className="input-label text-s-medium" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={clsx(
        'input-field',
        `input-field--${variant}`,
        `input-field--${size}`,
        `input-field--${status}`,
        disabled && 'input-field--disabled',
      )}>
        {iconLeft && <span className="input-field__icon input-field__icon--left">{iconLeft}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className="input-field__control"
          {...props}
        />
        {iconRight && <span className="input-field__icon input-field__icon--right">{iconRight}</span>}
      </div>
      {hint && (
        <span className={clsx('input-hint text-xs-regular', status !== 'default' && `input-hint--${status}`)}>
          {hint}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
