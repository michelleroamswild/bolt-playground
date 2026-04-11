import { useState } from 'react';
import { Button, Toggle, Select, Radio, Input, Callout } from '../../components';
import { PageHeader } from '../PageHeader';
import { Tabs } from '../../components';
import './Checkout.css';

export function Checkout() {
  const [guestCheckout, setGuestCheckout] = useState(true);
  const [addressAutofill, setAddressAutofill] = useState(true);
  const [orderReview, setOrderReview] = useState(true);
  const [savePayment, setSavePayment] = useState(true);
  const [captureMode, setCaptureMode] = useState('authorize');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="screen-checkout">
      <PageHeader
        title="Checkout"
        subtitle="Configure your checkout experience"
        actions={
          <Button variant="primary" size="s" onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save changes'}
          </Button>
        }
      />

      <Tabs
        items={[
          {
            id: 'general', label: 'General',
            content: <CheckoutGeneral
              guestCheckout={guestCheckout} setGuestCheckout={setGuestCheckout}
              addressAutofill={addressAutofill} setAddressAutofill={setAddressAutofill}
              orderReview={orderReview} setOrderReview={setOrderReview}
              savePayment={savePayment} setSavePayment={setSavePayment}
            />,
          },
          { id: 'payments', label: 'Payments', content: <CheckoutPayments captureMode={captureMode} setCaptureMode={setCaptureMode} /> },
          { id: 'shipping', label: 'Shipping', content: <CheckoutShipping /> },
        ]}
      />
    </div>
  );
}

// ── Tab content components ────────────────────────────────────

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="setting-row">
      <div className="setting-row__info">
        <p className="text-s-medium setting-row__label">{label}</p>
        {desc && <p className="text-xs-regular setting-row__desc">{desc}</p>}
      </div>
      <div className="setting-row__control">{children}</div>
    </div>
  );
}

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="setting-card">
      <div className="setting-card__header">
        <p className="text-h4 setting-card__title">{title}</p>
      </div>
      <div className="setting-card__body">{children}</div>
    </div>
  );
}

function CheckoutGeneral({ guestCheckout, setGuestCheckout, addressAutofill, setAddressAutofill, orderReview, setOrderReview, savePayment, setSavePayment }: any) {
  return (
    <div className="checkout-tab-content">
      <SettingCard title="Shopper Experience">
        <SettingRow label="Guest checkout" desc="Allow shoppers to check out without creating an account">
          <Toggle checked={guestCheckout} onChange={e => setGuestCheckout(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Address autofill" desc="Pre-fill shipping address for returning Bolt shoppers">
          <Toggle checked={addressAutofill} onChange={e => setAddressAutofill(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Order review step" desc="Show shoppers a summary before placing the order">
          <Toggle checked={orderReview} onChange={e => setOrderReview(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Save payment method" desc="Offer to securely save payment info for future purchases">
          <Toggle checked={savePayment} onChange={e => setSavePayment(e.target.checked)} />
        </SettingRow>
      </SettingCard>

      <SettingCard title="Branding">
        <SettingRow label="Checkout language">
          <Select size="s" style={{ width: 180 }}>
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Español</option>
            <option>Français</option>
          </Select>
        </SettingRow>
        <SettingRow label="Currency display">
          <Select size="s" style={{ width: 180 }}>
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </Select>
        </SettingRow>
      </SettingCard>
    </div>
  );
}

function CheckoutPayments({ captureMode, setCaptureMode }: any) {
  return (
    <div className="checkout-tab-content">
      <Callout sentiment="warning" title="Changes apply to new transactions only">
        Existing authorized transactions are not affected by capture mode changes.
      </Callout>

      <SettingCard title="Payment Capture">
        <div className="capture-mode-options">
          <label className={`capture-option ${captureMode === 'authorize' ? 'capture-option--active' : ''}`}>
            <Radio name="capture" value="authorize" checked={captureMode === 'authorize'} onChange={() => setCaptureMode('authorize')} />
            <div>
              <p className="text-s-medium">Authorize only</p>
              <p className="text-xs-regular" style={{ color: 'var(--content-tertiary)' }}>Capture funds manually or automatically when order ships</p>
            </div>
          </label>
          <label className={`capture-option ${captureMode === 'immediate' ? 'capture-option--active' : ''}`}>
            <Radio name="capture" value="immediate" checked={captureMode === 'immediate'} onChange={() => setCaptureMode('immediate')} />
            <div>
              <p className="text-s-medium">Immediate capture</p>
              <p className="text-xs-regular" style={{ color: 'var(--content-tertiary)' }}>Capture funds at the time of authorization</p>
            </div>
          </label>
        </div>
      </SettingCard>

      <SettingCard title="Order Limits">
        <div style={{ display: 'flex', gap: 12 }}>
          <Input label="Minimum order amount" placeholder="$0.00" size="s" style={{ width: 180 }} />
          <Input label="Maximum order amount" placeholder="No limit" size="s" style={{ width: 180 }} />
        </div>
      </SettingCard>
    </div>
  );
}

function CheckoutShipping() {
  return (
    <div className="checkout-tab-content">
      <SettingCard title="Shipping Options">
        <SettingRow label="Real-time shipping rates" desc="Fetch live rates from your shipping carriers">
          <Toggle defaultChecked />
        </SettingRow>
        <SettingRow label="Free shipping threshold">
          <Input placeholder="e.g. $50" size="s" style={{ width: 180 }} />
        </SettingRow>
        <SettingRow label="Default carrier">
          <Select size="s" style={{ width: 180 }}>
            <option>UPS</option>
            <option>FedEx</option>
            <option>USPS</option>
            <option>DHL</option>
          </Select>
        </SettingRow>
      </SettingCard>
    </div>
  );
}
