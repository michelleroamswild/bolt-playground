import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'xs' | 's' | 'm';
export type ButtonShape = 'default' | 'pill';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  destructive?: boolean;
  busy?: boolean;
  inverse?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'm',
  shape = 'default',
  destructive = false,
  busy = false,
  inverse = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}, ref) => {
  const isDisabled = disabled || busy;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        shape === 'pill' && 'btn--pill',
        inverse && 'btn--inverse',
        destructive && 'btn--destructive',
        busy && 'btn--busy',
        fullWidth && 'btn--full',
        className,
      )}
      {...props}
    >
      {busy ? (
        <span className="btn__spinner" aria-hidden />
      ) : null}
      {iconLeft && <span className="btn__icon btn__icon--left">{iconLeft}</span>}
      {children && <span className="btn__label">{children}</span>}
      {iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
    </button>
  );
});

Button.displayName = 'Button';
