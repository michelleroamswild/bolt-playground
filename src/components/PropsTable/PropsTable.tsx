import type { ReactNode } from 'react';
import clsx from 'clsx';
import './PropsTable.css';

export interface PropsTableRow {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: ReactNode;
}

export interface PropsTableProps {
  rows: PropsTableRow[];
  className?: string;
}

export function PropsTable({ rows, className }: PropsTableProps) {
  return (
    <div className={clsx('props-table', className)}>
      <div className="props-table__row props-table__row--header">
        <span className="text-xs-medium">Prop</span>
        <span className="text-xs-medium">Type</span>
        <span className="text-xs-medium">Default</span>
        <span className="text-xs-medium">Description</span>
      </div>
      {rows.map(row => (
        <div key={row.name} className="props-table__row">
          <div className="props-table__name">
            <code className="props-table__code">{row.name}</code>
            {row.required && <span className="props-table__required">required</span>}
          </div>
          <code className="props-table__code props-table__type">{row.type}</code>
          <code className="props-table__code props-table__default">
            {row.defaultValue ?? '—'}
          </code>
          <div className="props-table__description text-s-regular">{row.description}</div>
        </div>
      ))}
    </div>
  );
}
