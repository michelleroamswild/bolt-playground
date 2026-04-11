import { Tag } from '../../components';
import { PageHeader } from '../PageHeader';
import './Overview.css';

const STATS = [
  { label: 'Gross Revenue', value: '$48,291', change: '+12.4%', trend: 'up' },
  { label: 'Transactions',  value: '1,847',   change: '+8.1%',  trend: 'up' },
  { label: 'Auth Rate',     value: '97.3%',   change: '-0.4%',  trend: 'down' },
  { label: 'Avg. Order',    value: '$26.14',  change: '+3.8%',  trend: 'up' },
];

const RECENT_TXN = [
  { id: 'bolt_abc123', customer: 'Sarah M.',   amount: '$89.00',  status: 'Completed',   time: '2m ago' },
  { id: 'bolt_def456', customer: 'James T.',   amount: '$124.50', status: 'Authorized',  time: '11m ago' },
  { id: 'bolt_ghi789', customer: 'Priya K.',   amount: '$42.00',  status: 'Completed',   time: '34m ago' },
  { id: 'bolt_jkl012', customer: 'Marcus W.',  amount: '$310.00', status: 'In Review',   time: '1h ago' },
  { id: 'bolt_mno345', customer: 'Elena R.',   amount: '$67.25',  status: 'Refunded',    time: '2h ago' },
  { id: 'bolt_pqr678', customer: 'David C.',   amount: '$199.99', status: 'Failed',      time: '3h ago' },
];

const STATUS_SENTIMENT: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'informative'> = {
  'Completed':  'success',
  'Authorized': 'highlight' as any,
  'In Review':  'warning',
  'Refunded':   'neutral',
  'Failed':     'error',
};

export function Overview() {
  return (
    <div className="screen-overview">
      <PageHeader title="Overview" subtitle="Acme Store — Last 30 days" />

      {/* KPI cards */}
      <div className="overview-kpis">
        {STATS.map(s => (
          <div key={s.label} className="kpi-card">
            <p className="kpi-card__label text-xs-medium">{s.label}</p>
            <p className="kpi-card__value text-h1">{s.value}</p>
            <p className={`kpi-card__change text-xs-medium kpi-card__change--${s.trend}`}>
              {s.trend === 'up' ? '↑' : '↓'} {s.change} vs last period
            </p>
          </div>
        ))}
      </div>

      {/* Recent transactions */}
      <div className="overview-section">
        <div className="overview-section__header">
          <h2 className="text-h3">Recent Transactions</h2>
          <button className="text-s-medium overview-section__link">View all</button>
        </div>
        <div className="txn-table">
          <div className="txn-table__head">
            <span className="text-xs-medium">Transaction ID</span>
            <span className="text-xs-medium">Customer</span>
            <span className="text-xs-medium">Amount</span>
            <span className="text-xs-medium">Status</span>
            <span className="text-xs-medium">Time</span>
          </div>
          {RECENT_TXN.map(txn => (
            <div key={txn.id} className="txn-table__row">
              <span className="text-s-regular txn-id">{txn.id}</span>
              <span className="text-s-regular">{txn.customer}</span>
              <span className="text-s-medium">{txn.amount}</span>
              <Tag sentiment={STATUS_SENTIMENT[txn.status] ?? 'neutral'} size="s">{txn.status}</Tag>
              <span className="text-xs-regular txn-time">{txn.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
