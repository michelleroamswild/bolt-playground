import type { ReactElement, ReactNode } from 'react';
import { NavLink } from './NavLink';
import './Layout.css';

// ── Nav structure (matches Figma exactly) ─────────────────────
const NAV_GROUPS = [
  {
    label: null,
    items: [
      { id: 'home',      label: 'Home',      icon: 'home' },
      { id: 'analytics', label: 'Analytics', icon: 'chart_bar' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { id: 'checkout',         label: 'Checkout',               icon: 'shopping_bag' },
      { id: 'post-purchase',    label: 'Post-purchase Offers',   icon: 'one_click' },
      { id: 'product-recs',     label: 'Product Recommendat...', icon: 'pencil' },
      { id: 'subscriptions',    label: 'Subscriptions',          icon: 'dollar_circle' },
      { id: 'branding-styling', label: 'Branding & Styling',     icon: 'pencil' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'transactions',     label: 'Transactions',     icon: 'dollar_circle' },
      { id: 'fraud-protection', label: 'Fraud Protection', icon: 'bolt_fraud' },
      { id: 'payments',         label: 'Payments',         icon: 'credit_card' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'administration', label: 'Administration', icon: 'setting' },
      { id: 'developers',     label: 'Developers',     icon: 'console' },
    ],
  },
];

// Simple icon map using SVG
const ICONS: Record<string, ReactElement> = {
  home:          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 8.5 10 2l7 6.5V17a1.5 1.5 0 0 1-1.5 1.5h-3V12.5h-5v6H4.5A1.5 1.5 0 0 1 3 17V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  chart_bar:     <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="10" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="6" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="3" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>,
  shopping_bag:  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.5 7V5a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="7" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  one_click:     <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 6h5M7.5 9h5M7.5 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  pencil:        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 3l4 4-10 10H3v-4L13 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  dollar_circle: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 5v10M7.5 8a2.5 2.5 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3M7.5 12a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  bolt_fraud:    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2 3 6v5c0 4.5 3 7.5 7 8 4-.5 7-3.5 7-8V6l-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  credit_card:   <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5"/></svg>,
  setting:       <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M3.87 3.87l1.41 1.41M14.72 14.72l1.41 1.41M3.87 16.13l1.41-1.41M14.72 5.28l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  console:       <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l4 4-4 4M11 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

interface LayoutProps {
  screen: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export function Layout({ screen, onNavigate, children }: LayoutProps) {
  return (
    <div className="proto-shell">
      {/* ── App bar ── */}
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
          <button className="proto-appbar__icon-btn" aria-label="Help">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3 2.45c-.6.35-.5 1.05-.5 1.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16.5" r=".75" fill="currentColor"/></svg>
          </button>
          <div className="proto-appbar__user">
            <div className="proto-appbar__avatar">CC</div>
            <span className="proto-appbar__username">Clark Clickerati</span>
            <ChevronDownIcon />
          </div>
        </div>
      </header>

      <div className="proto-body">
        {/* ── White sidebar ── */}
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
                    icon={ICONS[item.icon] || ICONS.pencil}
                    label={item.label}
                    active={screen === item.id}
                    onClick={() => onNavigate(item.id)}
                  />
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main content ── */}
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
