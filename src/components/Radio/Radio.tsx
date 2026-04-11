import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import './Radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  size?: 's' | 'm';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  size = 'm',
  disabled,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id ?? `radio-${Math.random().toString(36).slice(2)}`;

  return (
    <label className={clsx('radio-wrap', disabled && 'radio-wrap--disabled', className)} htmlFor={inputId}>
      <span className={clsx('radio__circle', `radio__circle--${size}`)}>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          disabled={disabled}
          className="radio__input"
          {...props}
        />
        <span className="radio__dot" aria-hidden />
      </span>
      {label && <span className="radio__label text-s-regular">{label}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';
