import { useState } from 'react';
import './BrandingStyling.css';

// Asset URLs from Figma MCP
const imgProductPurse = 'https://www.figma.com/api/mcp/asset/64b66fcf-c7f6-428e-848d-8394c14a515a';
const imgBoltLogo = 'https://www.figma.com/api/mcp/asset/8158b7d3-7dc7-4cf3-9c9d-d6fea1c2d434';
const imgCountryFlag = 'https://www.figma.com/api/mcp/asset/4704887b-1b57-4417-bfe7-23d570afb068';
const imgBoltFooterLogo = 'https://www.figma.com/api/mcp/asset/5f1838f7-788a-4d37-b908-18098f68e9d3';

interface BrandingStylingProps {
  onEditBranding?: () => void;
}

export function BrandingStyling({ onEditBranding }: BrandingStylingProps) {
  const [step, setStep] = useState(1);
  const [showApt, setShowApt] = useState(false);

  const progressWidth = step === 1 ? '18%' : step === 2 ? '55%' : '100%';

  return (
    <div className="branding-screen">
      {/* ── Page header ── */}
      <div className="branding-page-header">
        <div className="branding-page-header__left">
          <h1 className="branding-page-header__title">Branding</h1>
          <div className="branding-store-dropdown">
            <BuildingIcon />
            <span>Main store</span>
            <SmChevronDown />
          </div>
        </div>
        <button className="branding-edit-btn" onClick={onEditBranding}>Edit Branding</button>
      </div>

      {/* ── Preview area ── */}
      <div className="branding-preview-area">
        <div className="branding-overlay">
          {/* Left: checkout */}
          <div className="checkout-panel">
            <div className="checkout-panel__inner">
              {/* Bolt logo */}
              <div className="checkout-logo">
                <img src={imgBoltLogo} alt="Bolt" style={{ height: 34, width: 120, objectFit: 'contain' }} />
              </div>

              {/* Progress */}
              <div className="checkout-progress">
                <div className="checkout-steps">
                  <button className="checkout-step" onClick={() => setStep(1)}>1. Shipping</button>
                  <button className="checkout-step" onClick={() => setStep(2)}>2. Delivery</button>
                  <button className="checkout-step" onClick={() => setStep(3)}>3. Payment</button>
                </div>
                <div className="checkout-progress-bar">
                  <div className="checkout-progress-bar__fill" style={{ width: progressWidth }} />
                </div>
              </div>

              {/* Form */}
              {step === 1 && <ShippingForm showApt={showApt} setShowApt={setShowApt} onContinue={() => setStep(2)} />}
              {step === 2 && <DeliveryForm onContinue={() => setStep(3)} />}
              {step === 3 && <PaymentForm onContinue={() => setStep(1)} />}
            </div>

            {/* Footer */}
            <div className="checkout-footer">
              <div className="checkout-footer__left">
                <span className="checkout-footer__powered">Powered by</span>
                <img src={imgBoltFooterLogo} alt="Bolt" style={{ height: 15 }} />
              </div>
              <div className="checkout-footer__right">Privacy Policy &nbsp;&nbsp;&nbsp; Terms of Use</div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="summary-panel">
            <p className="order-summary__title">Order Summary</p>

            <div className="order-summary__item">
              <div className="order-summary__item-img">
                <img src={imgProductPurse} alt="Quick Clique" />
              </div>
              <div className="order-summary__item-info">
                <div className="order-summary__item-top">
                  <span className="order-summary__item-name">Quick Clique</span>
                  <span className="order-summary__item-price">$00.00</span>
                </div>
                <span className="order-summary__item-qty">Quantity: 1</span>
              </div>
            </div>

            <div className="order-summary__promos">
              <button className="order-summary__promo">
                <ChevronRightIcon />
                <span className="order-summary__promo-label">Discount</span>
              </button>
              <button className="order-summary__promo">
                <ChevronRightIcon />
                <span className="order-summary__promo-label">Giftcard</span>
              </button>
            </div>

            <div className="order-summary__ledger-item">
              <span>Subtotal</span><span>$00.00</span>
            </div>
            <div className="order-summary__ledger-item">
              <span>Delivery</span><span>--</span>
            </div>
            <div className="order-summary__ledger-item">
              <span>Taxes</span><span>--</span>
            </div>
            <div className="order-summary__total">
              <span>Total</span><span>$00.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step forms ────────────────────────────────────────────────

function ShippingForm({ showApt, setShowApt, onContinue }: {
  showApt: boolean; setShowApt: (v: boolean) => void; onContinue: () => void;
}) {
  return (
    <div className="checkout-form">
      <div className="checkout-section">
        <p className="checkout-section__label">Contact information</p>
        <div className="checkout-fields">
          <input className="checkout-flat-input" placeholder="Email address" type="email" />
          <div className="checkout-phone-field">
            <div className="checkout-phone__selector">
              <img src={imgCountryFlag} alt="US" style={{ width: 20, height: 15, borderRadius: 1 }} />
              <SmChevronDown />
            </div>
            <div className="checkout-phone__divider" />
            <input className="checkout-phone__input" placeholder="Phone number" type="tel" />
          </div>
        </div>
      </div>

      <div className="checkout-section">
        <p className="checkout-section__label">Shipping address</p>
        <div className="checkout-fields">
          <div className="checkout-row-2">
            <input className="checkout-flat-input" placeholder="First name" />
            <input className="checkout-flat-input" placeholder="Last name" />
          </div>
          <div className="checkout-row-2">
            <input className="checkout-flat-input" placeholder="Street address" />
            <div className="checkout-flat-dropdown">
              <span className="checkout-flat-dropdown__sup">Country</span>
              <select>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <div className="checkout-flat-dropdown__chevron"><SmChevronDown /></div>
            </div>
          </div>
          {showApt ? (
            <input className="checkout-flat-input" placeholder="Apartment, building, floor" />
          ) : (
            <button className="checkout-add-apt" onClick={() => setShowApt(true)}>
              <PlusIcon /> Apartment, Building, Floor
            </button>
          )}
          <div className="checkout-row-3">
            <input className="checkout-flat-input" placeholder="Zip code" />
            <input className="checkout-flat-input" placeholder="City" />
            <div className="checkout-flat-select">
              <select>
                <option>State</option>
                <option>CA</option>
                <option>NY</option>
                <option>TX</option>
              </select>
              <div className="checkout-flat-select__chevron"><SmChevronDown /></div>
            </div>
          </div>
        </div>
      </div>

      <label className="checkout-checkbox-row">
        <div className="checkout-checkbox-box">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="checkout-checkbox-text">Custom checkmark box</span>
      </label>

      <div className="checkout-cta-area">
        <button className="checkout-cta" onClick={onContinue}>Continue</button>
        <button className="checkout-exit">Exit checkout</button>
      </div>
    </div>
  );
}

function DeliveryForm({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="checkout-form">
      <div className="checkout-section">
        <p className="checkout-section__label">Shipping method</p>
        <div className="checkout-fields">
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#f6f5f4', borderRadius: 4, cursor: 'pointer' }}>
            <input type="radio" name="delivery" defaultChecked />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: '#000' }}>Standard shipping</p>
              <p style={{ fontSize: 14, color: '#6f6f67' }}>5–7 business days</p>
            </div>
            <span style={{ fontSize: 16, fontWeight: 500 }}>Free</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: '#f6f5f4', borderRadius: 4, cursor: 'pointer' }}>
            <input type="radio" name="delivery" />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: '#000' }}>Express shipping</p>
              <p style={{ fontSize: 14, color: '#6f6f67' }}>2–3 business days</p>
            </div>
            <span style={{ fontSize: 16, fontWeight: 500 }}>$9.99</span>
          </label>
        </div>
      </div>
      <div className="checkout-cta-area">
        <button className="checkout-cta" onClick={onContinue}>Continue</button>
        <button className="checkout-exit">Exit checkout</button>
      </div>
    </div>
  );
}

function PaymentForm({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="checkout-form">
      <div className="checkout-section">
        <p className="checkout-section__label">Payment</p>
        <div className="checkout-fields">
          <input className="checkout-flat-input" placeholder="Card number" />
          <div className="checkout-row-2">
            <input className="checkout-flat-input" placeholder="MM / YY" />
            <input className="checkout-flat-input" placeholder="CVC" />
          </div>
          <input className="checkout-flat-input" placeholder="Name on card" />
        </div>
      </div>
      <div className="checkout-cta-area">
        <button className="checkout-cta" onClick={onContinue}>Place order</button>
        <button className="checkout-exit">Exit checkout</button>
      </div>
    </div>
  );
}

// ── Inline icons ──────────────────────────────────────────────
function BuildingIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="5.5" y="3.5" width="2" height="2" rx="0.5" fill="currentColor"/><rect x="8.5" y="3.5" width="2" height="2" rx="0.5" fill="currentColor"/><rect x="5.5" y="7" width="2" height="2" rx="0.5" fill="currentColor"/><rect x="8.5" y="7" width="2" height="2" rx="0.5" fill="currentColor"/><rect x="6.5" y="11" width="3" height="4" rx="0.5" fill="currentColor"/></svg>;
}

function SmChevronDown() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ChevronRightIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function PlusIcon() {
  return <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0v8M0 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
