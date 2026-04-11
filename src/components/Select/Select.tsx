import { forwardRef } from 'react';
import type { SelectHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './Select.css';

export type SelectSize = 'xs' | 's' | 'm';
export type SelectVariant = 'outline' | 'flat';
export type SelectStatus = 'default' | 'error' | 'warning';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  status?: SelectStatus;
  hint?: string;
  placeholder?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  size = 'm',
  variant = 'outline',
  status = 'default',
  hint,
  placeholder,
  disabled,
  className,
  id,
  children,
  ...props
}, ref) => {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={clsx('select-wrap', className)}>
      {label && (
        <label className="select-label text-s-medium" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className={clsx(
        'select-field',
        `select-field--${variant}`,
        `select-field--${size}`,
        `select-field--${status}`,
        disabled && 'select-field--disabled',
      )}>
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className="select-field__control"
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {children}
        </select>
        <span className="select-field__chevron" aria-hidden>
          <Icon name="chevron_down" size="s" />
        </span>
      </div>
      {hint && (
        <span className={clsx('select-hint text-xs-regular', status !== 'default' && `select-hint--${status}`)}>
          {hint}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
