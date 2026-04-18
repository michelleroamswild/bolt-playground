import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './A11yNote.css';

export interface A11yNoteProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function A11yNote({ title = 'Accessibility', children, className }: A11yNoteProps) {
  return (
    <aside className={clsx('a11y-note', className)}>
      <div className="a11y-note__heading">
        <Icon name="person_accessibile" size="s" />
        <span className="text-s-medium">{title}</span>
      </div>
      <div className="a11y-note__body text-s-regular">{children}</div>
    </aside>
  );
}
