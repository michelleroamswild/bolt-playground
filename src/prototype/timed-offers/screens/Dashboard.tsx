import { Icon } from '../../../components';
import './Dashboard.css';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="to-dash">
      {/* ── Top row: Welcome + Feature promo ── */}
      <div className="to-dash__top">
        <div className="to-dash__welcome">
          <h1 className="text-h1-l to-dash__greeting">Welcome back, Clark!</h1>
          <p className="text-s-regular to-dash__subtitle">
            Here are some helpful resources to get started.
          </p>

          <div className="to-dash__guides">
            <p className="text-h3">Help guides</p>
            <div className="to-dash__guide-list">
              <GuideItem
                icon={<Icon name="bolt_icon_filled" size="l" />}
                iconBg="var(--brand-lightning)"
                title="Get Started"
                desc="Learn more about Bolt's core features"
              />
              <GuideItem
                icon={<Icon name="console" size="l" />}
                iconBg="var(--surface-inverse-primary)"
                iconColor="var(--content-inverse-primary)"
                title="APIs, SDKs, & Webhooks"
                desc="Tools to help developers build with Bolt"
              />
            </div>
          </div>

          <div className="to-dash__guide-actions">
            <button className="to-dash__guide-btn">
              See all help articles
              <Icon name="launch_arrow" size="s" />
            </button>
            <button className="to-dash__guide-btn">
              Share your feedback
              <Icon name="thumbs_up" size="s" />
            </button>
          </div>
        </div>

        <div className="to-dash__promo">
          <div className="to-dash__promo-inner">
            <div className="to-dash__promo-header">
              <span className="text-s-medium to-dash__promo-label">New Feature</span>
              <div className="to-dash__promo-arrows">
                <button className="to-dash__promo-arrow" aria-label="Previous">
                  <Icon name="chevron_left" size="m" />
                </button>
                <button className="to-dash__promo-arrow" aria-label="Next">
                  <Icon name="chevron_right" size="m" />
                </button>
              </div>
            </div>

            <h2 className="text-h1-l to-dash__promo-title">
              Post-purchase Offers
              <span className="to-dash__promo-tag text-xs-medium">New</span>
            </h2>
            <p className="text-s-regular to-dash__promo-desc">
              Increase your Average Order Value with cart-related post-checkout offers! These remove friction and allow shoppers to add the little things they may have forgotten to their cart.
            </p>

            <button
              className="to-dash__promo-cta text-s-medium"
              onClick={() => onNavigate('post-purchase')}
            >
              Try it now
              <Icon name="arrow_right" size="s" />
            </button>
          </div>
          <div className="to-dash__promo-accent" />
        </div>
      </div>

      {/* ── Executive Summary ── */}
      <div className="to-dash__summary">
        <div className="to-dash__summary-header">
          <h2 className="text-h2">Executive Summary</h2>
          <button className="to-dash__summary-link text-s-medium">
            See more analytics
            <Icon name="arrow_right" size="s" />
          </button>
        </div>

        <div className="to-dash__summary-filter">
          <button className="to-dash__date-btn text-s-regular">
            <Icon name="calendar" size="s" />
            Last 7 days
            <Icon name="chevron_down" size="s" />
          </button>
        </div>

        <div className="to-dash__kpi-grid">
          <KpiCard
            label="Total GMV from Bolt Shoppers"
            value="$13.9M"
            change="+23%"
          />
          <KpiCard
            label="% GMV from Bolt Shoppers"
            value="52.6%"
            change="+23%"
          />
          <KpiCard
            label="Checkout Rate"
            value="80.9%"
            change="+23%"
          />
          <KpiCard
            label="Fraud: Order Approval Rate"
            value="100%"
            change="+23%"
          />
        </div>

        <div className="to-dash__kpi-grid">
          <KpiCard
            label="% GMV from Bolt One-Click"
            value="34.2%"
            change="+23%"
          />
          <KpiCard
            label="Checkout Conversion Rate"
            value="72.1%"
            change="+23%"
          />
        </div>
      </div>
    </div>
  );
}

function GuideItem({ icon, iconBg, iconColor, title, desc }: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor?: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="to-guide">
      <div className="to-guide__icon" style={{ background: iconBg, color: iconColor || 'var(--content-primary)' }}>
        {icon}
      </div>
      <div className="to-guide__text">
        <p className="text-s-medium">{title}</p>
        <p className="text-s-regular" style={{ color: 'var(--content-tertiary)' }}>{desc}</p>
      </div>
    </div>
  );
}

function KpiCard({ label, value, change }: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="to-kpi">
      <div className="to-kpi__header">
        <span className="text-xs-medium to-kpi__label">
          {label}
          <Icon name="i_circle" size="xs" />
        </span>
        <span className="text-xs-medium to-kpi__change">{change}</span>
      </div>
      <p className="text-h1-l to-kpi__value">{value}</p>
      <div className="to-kpi__sparkline">
        <svg viewBox="0 0 160 40" fill="none" preserveAspectRatio="none">
          <path
            d="M0 35 C20 30, 40 28, 60 25 S100 15, 120 12 S150 8, 160 5"
            stroke="var(--content-info, #8c40f2)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
