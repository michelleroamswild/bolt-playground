import { Button, Icon } from '../../../components';
import './OfferDetail.css';

export interface OfferDetailData {
  name: string;
  referenceId: string;
  price: string;
  variant: string;
  description: string;
  timer: string;
  discount: string;
  dateCreated: string;
  expirationDate: string;
  offerViews: number;
  conversion: string;
  total: string;
  cartItems: { name: string; referenceId: string; price: string }[];
  emoji: string;
  color: string;
}

interface OfferDetailProps {
  data: OfferDetailData;
  onBack: () => void;
}

export function OfferDetail({ data, onBack }: OfferDetailProps) {
  return (
    <div className="ofd">
      <div className="ofd__page-header">
        <div className="ofd__page-left">
          <button className="ofd__back" onClick={onBack} aria-label="Back">
            <Icon name="arrow_left" size="l" />
          </button>
          <h1 className="text-h1">{data.name}</h1>
        </div>
        <div className="ofd__page-actions">
          <Button variant="secondary" size="s" destructive>Deactivate</Button>
          <Button variant="primary" size="s">Edit</Button>
        </div>
      </div>

      <div className="ofd__main">
        <section className="ofd__card">
          <div className="ofd__card-header ofd__card-header--divider">
            <h2 className="ofd__card-title">Insights</h2>
          </div>
          <div className="ofd__insights">
            <InsightStat label="Offer Views" value={data.offerViews.toLocaleString()} change="+23%" range="6/5 - 7/5" />
            <InsightStat label="Conversion" value={data.conversion}            change="+23%" range="6/5 - 7/5" />
            <InsightStat label="Total $"     value={data.total}                 change="+23%" range="6/5 - 7/5" />
          </div>
        </section>

        <div className="ofd__row-2">
          <section className="ofd__card">
            <div className="ofd__card-header">
              <h2 className="ofd__card-title">Product Details</h2>
            </div>
            <div className="ofd__product">
              <div className="ofd__product-image" style={{ background: data.color }}>
                <span>{data.emoji}</span>
              </div>
              <div className="ofd__product-info">
                <p className="ofd__product-name">{data.name.replace(/\s*\(.*\)$/, '')}</p>
                <p className="ofd__product-meta">Reference ID: {data.referenceId}</p>
                <p className="ofd__product-meta">Price: {data.price}</p>
                <p className="ofd__product-meta">Variant: {data.variant}</p>
                <p className="ofd__product-meta">Description: {data.description}</p>
              </div>
            </div>
          </section>

          <section className="ofd__card">
            <div className="ofd__card-header">
              <h2 className="ofd__card-title">Details</h2>
            </div>
            <dl className="ofd__details">
              <DetailRow label="Timer" value={data.timer} />
              <DetailRow label="Discount" value={data.discount} />
              <DetailRow label="Date created" value={data.dateCreated} />
              <DetailRow label="Expiration date" value={data.expirationDate} />
            </dl>
          </section>
        </div>

        <section className="ofd__card">
          <div className="ofd__card-header">
            <h2 className="ofd__card-title">Appears if the cart contains the following items</h2>
          </div>
          <div className="ofd__cart-table">
            <div className="ofd__cart-thead">
              <div className="ofd__cart-th ofd__cart-col-name">Name</div>
              <div className="ofd__cart-th ofd__cart-col-ref">Reference ID</div>
              <div className="ofd__cart-th ofd__cart-col-price">Price</div>
            </div>
            {data.cartItems.map((item, i) => (
              <div key={i} className="ofd__cart-tr">
                <div className="ofd__cart-td ofd__cart-col-name">{item.name}</div>
                <div className="ofd__cart-td ofd__cart-col-ref">{item.referenceId}</div>
                <div className="ofd__cart-td ofd__cart-col-price">{item.price}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InsightStat({ label, value, change, range }: {
  label: string; value: string; change: string; range: string;
}) {
  return (
    <div className="ofd-stat">
      <div className="ofd-stat__header">
        <span className="ofd-stat__label">
          {label}
          <Icon name="i_circle" size="xs" />
        </span>
      </div>
      <div className="ofd-stat__row">
        <div className="ofd-stat__value-block">
          <p className="ofd-stat__value">{value}</p>
          <p className="ofd-stat__change">
            <span className="ofd-stat__change-pct">{change}</span>
            <span className="ofd-stat__change-range">From {range}</span>
          </p>
        </div>
        <div className="ofd-stat__sparkline">
          <svg viewBox="0 0 120 40" fill="none" preserveAspectRatio="none">
            <path
              d="M0 32 C20 30, 40 27, 55 24 S85 10, 100 6 S115 2, 120 0"
              stroke="#00ae49"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ofd-detail-row">
      <dt className="ofd-detail-row__label">{label}</dt>
      <dd className="ofd-detail-row__value">{value}</dd>
    </div>
  );
}
