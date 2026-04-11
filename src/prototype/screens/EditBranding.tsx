import { useState } from 'react';
import './EditBranding.css';

// Reuse assets from BrandingStyling
const imgBoltLogo = 'https://www.figma.com/api/mcp/asset/8158b7d3-7dc7-4cf3-9c9d-d6fea1c2d434';
const imgProductPurse = 'https://www.figma.com/api/mcp/asset/64b66fcf-c7f6-428e-848d-8394c14a515a';
const imgCountryFlag = 'https://www.figma.com/api/mcp/asset/4704887b-1b57-4417-bfe7-23d570afb068';
const imgBoltFooterLogo = 'https://www.figma.com/api/mcp/asset/5f1838f7-788a-4d37-b908-18098f68e9d3';

interface EditBrandingProps {
  onExit: () => void;
}

export function EditBranding({ onExit }: EditBrandingProps) {
  const [step, setStep] = useState(1);
  const [showApt, setShowApt] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const progressWidth = step === 1 ? '18%' : step === 2 ? '55%' : '100%';

  return (
    <div className="edit-branding">
      {/* ── Editor header ── */}
      <header className="editor-header">
        <div className="editor-header__left">
          <h1 className="editor-header__title">Branding</h1>
        </div>

        <div className="editor-header__center">
          <div className="editor-dropdown">
            <span>Checkout</span>
            <ChevronDownIcon />
          </div>
          <div className="editor-view-toggle">
            <button
              className={`editor-view-btn${viewMode === 'desktop' ? ' editor-view-btn--active' : ''}`}
              onClick={() => setViewMode('desktop')}
              aria-label="Desktop view"
            >
              <DesktopIcon />
            </button>
            <button
              className={`editor-view-btn${viewMode === 'mobile' ? ' editor-view-btn--active' : ''}`}
              onClick={() => setViewMode('mobile')}
              aria-label="Mobile view"
            >
              <MobileIcon />
            </button>
          </div>
        </div>

        <div className="editor-header__right">
          <button className="editor-changes-badge">
            <WarningIcon />
            <span>3 Unpublished Changes</span>
          </button>
          <button className="editor-btn editor-btn--tertiary" onClick={onExit}>Cancel</button>
          <button className="editor-btn editor-btn--secondary">Discard</button>
          <button className="editor-btn editor-btn--primary">Publish Changes</button>
        </div>
      </header>

      <div className="editor-body">
        {/* ── Left: checkout preview ── */}
        <div className="editor-preview">
          <div className="editor-overlay">
            {/* Checkout panel */}
            <div className="editor-checkout-panel">
              <div className="editor-checkout-inner">
                <div className="checkout-logo">
                  <img src={imgBoltLogo} alt="Bolt" style={{ height: 34, width: 120, objectFit: 'contain' }} />
                </div>

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

                {step === 1 && <ShippingForm showApt={showApt} setShowApt={setShowApt} onContinue={() => setStep(2)} />}
                {step === 2 && <DeliveryForm onContinue={() => setStep(3)} />}
                {step === 3 && <PaymentForm onContinue={() => setStep(1)} />}
              </div>

              <div className="editor-checkout-footer">
                <div className="editor-checkout-footer__left">
                  <span className="editor-checkout-footer__powered">Powered by</span>
                  <img src={imgBoltFooterLogo} alt="Bolt" style={{ height: 15 }} />
                </div>
                <div className="editor-checkout-footer__right">Privacy Policy &nbsp;&nbsp;&nbsp; Terms of Use</div>
              </div>
            </div>

            {/* Order summary */}
            <div className="editor-summary-panel">
              <p className="editor-summary__title">Order Summary</p>
              <div className="editor-summary__item">
                <div className="editor-summary__item-img">
                  <img src={imgProductPurse} alt="Quick Clique" />
                </div>
                <div className="editor-summary__item-info">
                  <div className="editor-summary__item-top">
                    <span className="editor-summary__item-name">Quick Clique</span>
                    <span className="editor-summary__item-price">$00.00</span>
                  </div>
                  <span className="editor-summary__item-qty">Quantity: 1</span>
                </div>
              </div>

              <div className="editor-summary__promos">
                <button className="editor-summary__promo">
                  <ChevronRightIcon /><span>Discount</span>
                </button>
                <button className="editor-summary__promo">
                  <ChevronRightIcon /><span>Giftcard</span>
                </button>
              </div>

              <div className="editor-summary__row">Subtotal<span>$00.00</span></div>
              <div className="editor-summary__row">Delivery<span>--</span></div>
              <div className="editor-summary__row">Taxes<span>--</span></div>
              <div className="editor-summary__total">Total<span>$00.00</span></div>
            </div>
          </div>
        </div>

        {/* ── Right: editor nav panel ── */}
        <aside className="editor-nav-panel">
          <EditorMenuItem
            title="Brand & Colors"
            description="Select options for the general layout of your checkout UI and checkout button"
          />
          <EditorMenuItem
            title="Buttons"
            description="Choose brand color and customize the look and feel of your checkout"
          />
          <EditorMenuItem
            title="Fields & Inputs"
            description="Change shipping restrictions, configure new shipping features"
          />
        </aside>
      </div>
    </div>
  );
}

function EditorMenuItem({ title, description }: { title: string; description: string }) {
  return (
    <button className="editor-menu-item">
      <div className="editor-menu-item__text">
        <p className="editor-menu-item__title">{title}</p>
        <p className="editor-menu-item__desc">{description}</p>
      </div>
      <ArrowRightIcon />
    </button>
  );
}

// ── Checkout form steps (reused from BrandingStyling) ─────────

function ShippingForm({ showApt, setShowApt, onContinue }: {
  showApt: boolean; setShowApt: (v: boolean) => void; onContinue: () => void;
}) {
  return (
    <div className="ec-form">
      <div className="ec-section">
        <p className="ec-section__label">Contact information</p>
        <div className="ec-fields">
          <input className="ec-input" placeholder="Email address" type="email" />
          <div className="ec-phone">
            <div className="ec-phone__selector">
              <img src={imgCountryFlag} alt="US" style={{ width: 20, height: 15, borderRadius: 1 }} />
              <SmChevronDown />
            </div>
            <div className="ec-phone__divider" />
            <input className="ec-phone__input" placeholder="Phone number" type="tel" />
          </div>
        </div>
      </div>

      <div className="ec-section">
        <p className="ec-section__label">Shipping address</p>
        <div className="ec-fields">
          <div className="ec-row-2">
            <input className="ec-input" placeholder="First name" />
            <input className="ec-input" placeholder="Last name" />
          </div>
          <div className="ec-row-2">
            <input className="ec-input" placeholder="Street address" />
            <div className="ec-dropdown">
              <span className="ec-dropdown__sup">Country</span>
              <select><option>United States</option><option>Canada</option></select>
              <div className="ec-dropdown__chevron"><SmChevronDown /></div>
            </div>
          </div>
          {showApt ? (
            <input className="ec-input" placeholder="Apartment, building, floor" />
          ) : (
            <button className="ec-add-apt" onClick={() => setShowApt(true)}>
              <PlusIcon /> Apartment, Building, Floor
            </button>
          )}
          <div className="ec-row-3">
            <input className="ec-input" placeholder="Zip code" />
            <input className="ec-input" placeholder="City" />
            <div className="ec-select">
              <select><option>State</option><option>CA</option><option>NY</option></select>
              <div className="ec-select__chevron"><SmChevronDown /></div>
            </div>
          </div>
        </div>
      </div>

      <label className="ec-checkbox-row">
        <div className="ec-checkbox-box">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="ec-checkbox-text">Custom checkmark box</span>
      </label>

      <div className="ec-cta-area">
        <button className="ec-cta" onClick={onContinue}>Continue</button>
        <button className="ec-exit">Exit checkout</button>
      </div>
    </div>
  );
}

function DeliveryForm({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="ec-form">
      <div className="ec-section">
        <p className="ec-section__label">Shipping method</p>
        <div className="ec-fields">
          <label className="ec-delivery-opt"><input type="radio" name="d" defaultChecked /><div><p className="ec-delivery-opt__name">Standard</p><p className="ec-delivery-opt__sub">5–7 business days</p></div><span>Free</span></label>
          <label className="ec-delivery-opt"><input type="radio" name="d" /><div><p className="ec-delivery-opt__name">Express</p><p className="ec-delivery-opt__sub">2–3 business days</p></div><span>$9.99</span></label>
        </div>
      </div>
      <div className="ec-cta-area"><button className="ec-cta" onClick={onContinue}>Continue</button><button className="ec-exit">Exit checkout</button></div>
    </div>
  );
}

function PaymentForm({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="ec-form">
      <div className="ec-section">
        <p className="ec-section__label">Payment</p>
        <div className="ec-fields">
          <input className="ec-input" placeholder="Card number" />
          <div className="ec-row-2"><input className="ec-input" placeholder="MM / YY" /><input className="ec-input" placeholder="CVC" /></div>
          <input className="ec-input" placeholder="Name on card" />
        </div>
      </div>
      <div className="ec-cta-area"><button className="ec-cta" onClick={onContinue}>Place order</button><button className="ec-exit">Exit checkout</button></div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────
function ChevronDownIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function SmChevronDown() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ChevronRightIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ArrowRightIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function DesktopIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>; }
function MobileIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M8.5 15.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>; }
function WarningIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1.5 13h13L8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M8 6v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function PlusIcon() { return <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0v8M0 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
