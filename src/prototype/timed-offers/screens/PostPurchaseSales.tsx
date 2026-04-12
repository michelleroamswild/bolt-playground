import { useState } from 'react';
import { Button, Icon, Combobox } from '../../../components';
import heroImg from '../../../assets/timed-offers-hero.png';
import './PostPurchaseSales.css';

interface PostPurchaseSalesProps {
  onTryItNow: () => void;
}

export function PostPurchaseSales({ onTryItNow }: PostPurchaseSalesProps) {
  const [store, setStore] = useState('main');
  const storeOptions = [
    { value: 'main', label: 'Main store', leadingIcon: <Icon name="building" size="s" /> },
    { value: 'secondary', label: 'Secondary store', leadingIcon: <Icon name="building" size="s" /> },
  ];

  return (
    <div className="pps">
      <div className="pps__page-header">
        <h1 className="text-h1">Post-purchase Timed Offers</h1>
        <div className="pps__store-select">
          <Combobox value={store} onChange={setStore} options={storeOptions} size="s" />
        </div>
      </div>

      <div className="pps__main">
        <div className="pps__hero">
          <div className="pps__hero-text">
            <h2 className="pps__hero-title">Boost sales beyond checkout</h2>
            <p className="pps__hero-desc">
              Drive additional revenue and offer a tailored shopping experience with purchase-related offers presented after checkout.
            </p>
            <Button variant="primary" size="m" onClick={onTryItNow}>Try it now</Button>
          </div>
          <div className="pps__hero-image">
            <img src={heroImg} alt="Post-purchase offers" />
          </div>
        </div>

        <div className="pps__features">
          <FeatureCard
            icon={<Icon name="one_click" size={48} />}
            title="A single order"
            desc="One-click ordering makes adding these items a breeze. Shoppers and merchants only see a single order for easy tracking and reconciliation."
          />
          <FeatureCard
            icon={<Icon name="dollar_circle" size={48} />}
            title="Increase your AOV"
            desc="Grab attention after checkout with meaningful products shoppers might have forgotten."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="pps-feat">
      <div className="pps-feat__icon">{icon}</div>
      <h3 className="pps-feat__title">{title}</h3>
      <p className="pps-feat__desc">{desc}</p>
    </div>
  );
}
