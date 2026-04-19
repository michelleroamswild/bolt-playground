import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './Guidelines.css';

export interface GuidelineItem {
  label: ReactNode;
  body?: ReactNode;
}

export interface GuidelinesProps {
  do?: GuidelineItem[];
  dont?: GuidelineItem[];
  className?: string;
}

export function Guidelines({ do: dos = [], dont: donts = [], className }: GuidelinesProps) {
  return (
    <div className={clsx('guidelines', className)}>
      {dos.length > 0 && (
        <div className="guidelines__col guidelines__col--do">
          <div className="guidelines__heading">
            <Icon name="check_circle" size="s" />
            <span className="text-s-medium">Do</span>
          </div>
          <ul className="guidelines__list">
            {dos.map((item, i) => (
              <li key={i} className="guidelines__item">
                <p className="text-s-medium">{item.label}</p>
                {item.body && <p className="text-xs-regular guidelines__body">{item.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {donts.length > 0 && (
        <div className="guidelines__col guidelines__col--dont">
          <div className="guidelines__heading">
            <Icon name="x_circle" size="s" />
            <span className="text-s-medium">Don't</span>
          </div>
          <ul className="guidelines__list">
            {donts.map((item, i) => (
              <li key={i} className="guidelines__item">
                <p className="text-s-medium">{item.label}</p>
                {item.body && <p className="text-xs-regular guidelines__body">{item.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
