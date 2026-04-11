import { useState } from 'react';
import { Toggle, Button, Tag, Callout } from '../../components';
import { PageHeader } from '../PageHeader';
import './PaymentMethods.css';

const PAYMENT_METHODS = [
  { id: 'bolt',       name: 'Bolt One-Click',    desc: 'Fastest checkout for returning shoppers', enabled: true,  recommended: true },
  { id: 'visa',       name: 'Visa',              desc: 'Visa credit and debit cards',              enabled: true,  recommended: false },
  { id: 'mastercard', name: 'Mastercard',         desc: 'Mastercard credit and debit cards',        enabled: true,  recommended: false },
  { id: 'amex',       name: 'American Express',  desc: 'Amex credit cards',                        enabled: true,  recommended: false },
  { id: 'applepay',   name: 'Apple Pay',         desc: 'Touch ID & Face ID payments',              enabled: false, recommended: false },
  { id: 'googlepay',  name: 'Google Pay',        desc: 'Faster checkout with Google',              enabled: false, recommended: false },
  { id: 'paypal',     name: 'PayPal',            desc: 'PayPal checkout and PayLater',             enabled: false, recommended: false },
  { id: 'affirm',     name: 'Affirm',            desc: 'Buy now, pay later financing',             enabled: false, recommended: false },
];

export function PaymentMethods() {
  const [methods, setMethods] = useState(PAYMENT_METHODS);

  const toggle = (id: string) =>
    setMethods(m => m.map(pm => pm.id === id ? { ...pm, enabled: !pm.enabled } : pm));

  const enabledCount = methods.filter(m => m.enabled).length;

  return (
    <div className="screen-payment-methods">
      <PageHeader
        title="Payment Methods"
        subtitle={`${enabledCount} of ${methods.length} methods enabled`}
        actions={<Button variant="primary" size="s">Save changes</Button>}
      />

      <Callout sentiment="informative" title="Bolt One-Click is recommended">
        Merchants using Bolt One-Click see an average 28% increase in checkout conversion.
      </Callout>

      <div className="pm-list">
        {methods.map(pm => (
          <div key={pm.id} className="pm-item">
            <div className="pm-item__logo">
              <span className="pm-logo-placeholder text-xs-bold">{pm.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="pm-item__info">
              <div className="pm-item__name-row">
                <p className="text-s-medium pm-item__name">{pm.name}</p>
                {pm.recommended && <Tag sentiment="highlight" size="s">Recommended</Tag>}
              </div>
              <p className="text-xs-regular pm-item__desc">{pm.desc}</p>
            </div>
            <div className="pm-item__toggle">
              <Toggle
                checked={pm.enabled}
                onChange={() => toggle(pm.id)}
                aria-label={`${pm.name} ${pm.enabled ? 'enabled' : 'disabled'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
