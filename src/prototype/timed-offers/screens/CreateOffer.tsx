import { useState } from 'react';
import { Button, Checkbox, Icon, Input, Select } from '../../../components';
import './CreateOffer.css';

interface CreateOfferProps {
  onCancel: () => void;
  onDiscard: () => void;
  onCreate: () => void;
}

export function CreateOffer({ onCancel, onDiscard, onCreate }: CreateOfferProps) {
  const [productSearch, setProductSearch] = useState('');
  const [allowQuantity, setAllowQuantity] = useState(false);
  const [bannerText, setBannerText] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [timer, setTimer] = useState('5');
  const [discount, setDiscount] = useState('');
  const [ruleSearch, setRuleSearch] = useState('');

  const canCreate = productSearch.trim().length > 0;

  return (
    <div className="co">
      {/* Top bar */}
      <header className="co__topbar">
        <h1 className="co__title">Create Post-purchase Timed Offer</h1>
        <div className="co__topbar-actions">
          <button className="co__link-btn" onClick={onCancel}>Cancel</button>
          <Button variant="secondary" size="s" onClick={onDiscard}>Discard</Button>
          <Button variant="primary" size="s" disabled={!canCreate} onClick={onCreate}>Create Offer</Button>
        </div>
      </header>

      {/* Info banner */}
      <div className="co__banner">
        <Icon name="i_circle" size="s" />
        <span>Search for a product to offer to the right to start building your offer</span>
      </div>

      <div className="co__body">
        {/* Preview */}
        <div className="co__preview">
          <div className="co__preview-card">
            <div className="co__preview-header">
              <p className="co__preview-shop">LIGHTNING SHOP</p>
            </div>
            <div className="co__preview-status">
              <div className="co__check-circle">
                <Icon name="check_outline" size="s" />
              </div>
              <span className="co__preview-status-text">We've received your order</span>
              <a className="co__preview-link" href="#">
                View Order Confirmation
                <Icon name="chevron_right" size="s" />
              </a>
            </div>
            <div className="co__preview-timer">
              Offer expires in <strong>3:00</strong>
            </div>
            <div className="co__preview-product">
              <div className="co__preview-image">
                <Icon name="image" size="l" />
              </div>
              <div className="co__preview-text">
                <div className="co__sk co__sk--l" />
                <div className="co__sk co__sk--xl" />
                <div className="co__sk co__sk--m" />
                <div className="co__sk-spacer" />
                <div className="co__sk co__sk--m" />
                <div className="co__sk-spacer" />
                <div className="co__sk co__sk--l" />
                <div className="co__sk co__sk--s" />
                <div className="co__preview-buttons">
                  <button className="co__preview-btn co__preview-btn--primary" disabled>Add to order</button>
                  <button className="co__preview-btn co__preview-btn--secondary" disabled>Decline offer</button>
                </div>
              </div>
            </div>
            <div className="co__preview-footer">BOLT</div>
          </div>
        </div>

        {/* Form panel */}
        <aside className="co__panel">
          <section className="co__section">
            <h2 className="co__section-title">Product Information</h2>
            <Input
              label="Search for a product to offer"
              placeholder="Search by name or reference ID"
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
              iconLeft={<Icon name="search" size="s" />}
            />
            <Checkbox
              label="Allow shoppers to select quantity"
              checked={allowQuantity}
              onChange={e => setAllowQuantity(e.target.checked)}
            />
          </section>

          <section className="co__section">
            <h2 className="co__section-title">Details</h2>
            <Input
              label="Banner text (optional)"
              placeholder="Enter a call to action"
              value={bannerText}
              onChange={e => setBannerText(e.target.value)}
              hint="This will appear before the timer."
            />
            <Input
              label="Expiration Date (optional)"
              placeholder="Date the offer expires"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              hint="Date the offer will no longer be available to shoppers."
              iconLeft={<Icon name="calendar" size="s" />}
            />
            <Select label="Timer" value={timer} onChange={e => setTimer(e.target.value)}>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </Select>
          </section>

          <section className="co__section">
            <h2 className="co__section-title">
              Discount
              <Icon name="i_circle" size="xs" />
            </h2>
            <Input
              label="Discount amount (optional)"
              placeholder="Enter Amount"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              iconRight={<span className="co__suffix">%</span>}
            />
          </section>

          <section className="co__section">
            <h2 className="co__section-title">
              Rules
              <Icon name="i_circle" size="xs" />
            </h2>
            <p className="co__section-subtitle">Display product if the cart contains the following items:</p>
            <Input
              label="Search for products"
              placeholder=""
              value={ruleSearch}
              onChange={e => setRuleSearch(e.target.value)}
              iconLeft={<Icon name="search" size="s" />}
            />
            <a className="co__text-link" href="#">Batch enter reference IDs</a>
          </section>
        </aside>
      </div>
    </div>
  );
}
