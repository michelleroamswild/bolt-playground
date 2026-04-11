import { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import './Tabs.css';

export type TabsVariant = 'default' | 'pill';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
  content?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  variant?: TabsVariant;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ items, defaultTab, variant = 'default', onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  const select = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const activeItem = items.find(i => i.id === active);

  return (
    <div className={clsx('tabs', `tabs--${variant}`, className)}>
      <div className="tabs__list" role="tablist">
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active}
            aria-controls={`tabpanel-${item.id}`}
            id={`tab-${item.id}`}
            disabled={item.disabled}
            onClick={() => !item.disabled && select(item.id)}
            className={clsx(
              'tabs__tab',
              item.id === active && 'tabs__tab--active',
              item.disabled && 'tabs__tab--disabled',
            )}
          >
            <span className="tabs__tab-label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="tabs__badge text-xs-medium">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      {activeItem?.content && (
        <div
          role="tabpanel"
          id={`tabpanel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="tabs__panel"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
