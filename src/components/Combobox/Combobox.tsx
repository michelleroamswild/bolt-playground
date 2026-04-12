import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  label: string;
  leadingIcon?: ReactNode;
}

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  hint?: string;
  status?: 'default' | 'error' | 'warning';
  size?: 'm' | 's';
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Combobox({
  label,
  placeholder = 'Select...',
  value,
  onChange,
  options,
  hint,
  status = 'default',
  size = 'm',
  disabled,
  className,
  id,
}: ComboboxProps) {
  const generatedId = useId();
  const triggerId = id ?? `combobox-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(0, options.findIndex(o => o.value === value))
  );
  const [popoverRect, setPopoverRect] = useState<{ top: number; left: number; width: number; placement: 'below' | 'above' } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  // Position the popover relative to the trigger using viewport coordinates
  // so it can escape any ancestor with overflow:hidden. Flips to open above
  // the trigger when the available space below is too small.
  const updatePosition = () => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const gap = 4;
    const measured = listRef.current?.getBoundingClientRect().height;
    // Fallback: estimate from option count until the popover mounts. Items are
    // ~40px with ~8px of padding, capped at 320px (max-height in CSS).
    const estimated = Math.min(320, options.length * 40 + 16);
    const popoverHeight = measured ?? estimated;
    const spaceBelow = window.innerHeight - r.bottom - gap;
    const spaceAbove = r.top - gap;
    const flipUp = spaceBelow < popoverHeight && spaceAbove > spaceBelow;
    const top = flipUp ? r.top - gap - popoverHeight : r.bottom + gap;
    setPopoverRect({ top, left: r.left, width: r.width, placement: flipUp ? 'above' : 'below' });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    // Refine position once the popover has mounted so we can measure its real height.
    const raf = requestAnimationFrame(updatePosition);
    const onScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open]);

  // Close on outside click — need to check both the root and the portal'd popover
  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  // Reset active index when opening, scroll active into view
  useEffect(() => {
    if (!open) return;
    const i = options.findIndex(o => o.value === value);
    setActiveIndex(i >= 0 ? i : 0);
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const commit = (i: number) => {
    const opt = options[i];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commit(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={clsx('combobox', `combobox--${size}`, className)}
      data-open={open ? 'true' : 'false'}
    >
      {label && (
        <label className="combobox__label text-s-medium" htmlFor={triggerId}>
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className="combobox__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        onKeyDown={onKeyDown}
      >
        {selected?.leadingIcon && (
          <span className="combobox__trigger-icon" aria-hidden>
            {selected.leadingIcon}
          </span>
        )}
        <span
          className={clsx(
            'combobox__trigger-label',
            !selected && 'combobox__trigger-label--placeholder'
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <Icon name="chevron_down" size="s" className="combobox__trigger-chevron" />
      </button>
      {open && popoverRect && createPortal(
        <div
          ref={listRef}
          id={listboxId}
          className="combobox__popover"
          role="listbox"
          tabIndex={-1}
          style={{
            position: 'fixed',
            top: popoverRect.top,
            left: popoverRect.left,
            width: popoverRect.width,
          }}
        >
          {options.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              data-index={i}
              data-selected={opt.value === value ? 'true' : 'false'}
              data-active={i === activeIndex ? 'true' : 'false'}
              aria-selected={opt.value === value}
              className="combobox__item"
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => commit(i)}
            >
              {opt.leadingIcon && <span className="combobox__item-icon">{opt.leadingIcon}</span>}
              <span className="combobox__item-label">{opt.label}</span>
              <span className="combobox__item-check" aria-hidden>
                <Icon name="check_outline" size="s" />
              </span>
            </button>
          ))}
        </div>,
        document.body
      )}
      {hint && (
        <span
          className={clsx(
            'combobox__hint text-xs-regular',
            status !== 'default' && `combobox__hint--${status}`
          )}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
