import type { ReactNode } from 'react';
import { NavLink } from '../NavLink';
import { Icon } from '../../components';
import type { IconName } from '../../components/Icon/icon-names';
import '../Layout.css';

const NAV_GROUPS = [
  {
    label: null,
    items: [
      { id: 'home',      label: 'Home',      icon: 'home' },
      { id: 'analytics', label: 'Analytics',  icon: 'chart_bar' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { id: 'checkout',         label: 'Checkout',             icon: 'shopping_bag' },
      { id: 'post-purchase',    label: 'Post-purchase Offers', icon: 'tag' },
      { id: 'transactions',     label: 'Transactions',         icon: 'dollar_circle' },
      { id: 'subscriptions',    label: 'Subscriptions',        icon: 'subscription' },
      { id: 'fraud-protection', label: 'Fraud Protection',     icon: 'fraud' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'payments',       label: 'Payments',       icon: 'credit_card' },
      { id: 'administration', label: 'Administration', icon: 'setting' },
    ],
  },
];

interface TimedOffersLayoutProps {
  screen: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export function TimedOffersLayout({ screen, onNavigate, children }: TimedOffersLayoutProps) {
  return (
    <div className="proto-shell">
      <header className="proto-appbar">
        <div className="proto-appbar__left">
          <div className="proto-appbar__bolt-mark">
            <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
              <path d="M9 0 0 11h6.5L4 19l12-12H9.5L12 0Z" fill="#e1ff00"/>
            </svg>
          </div>
          <div className="proto-appbar__account">
            <span className="proto-appbar__account-name">The Lightning Shop</span>
            <ChevronDownIcon />
          </div>
        </div>
        <div className="proto-appbar__right">
          <button className="proto-appbar__icon-btn" aria-label="Search">
            <Icon name="search" size="l" />
          </button>
          <button className="proto-appbar__icon-btn" aria-label="Help">
            <Icon name="question_circle" size="l" />
          </button>
          <button className="proto-appbar__icon-btn" aria-label="Notifications">
            <Icon name="notification" size="l" />
          </button>
          <div className="proto-appbar__user">
            <div className="proto-appbar__avatar">SS</div>
            <span className="proto-appbar__username">Skyler Shocking</span>
            <ChevronDownIcon />
          </div>
        </div>
      </header>

      <div className="proto-body">
        <aside className="proto-sidebar">
          <nav className="proto-sidebar__nav">
            {NAV_GROUPS.map((group, gi) => (
              <div key={gi} className="proto-nav-group">
                {group.label && (
                  <p className="proto-nav-group__label">{group.label}</p>
                )}
                {group.items.map(item => (
                  <NavLink
                    key={item.id}
                    icon={<Icon name={item.icon as IconName} size="m" />}
                    label={item.label}
                    active={screen === item.id}
                    onClick={() => onNavigate(item.id)}
                  />
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="proto-main">
          {children}
        </main>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
