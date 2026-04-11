import { Button, Combobox } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';
import magentoIcon from '../../../assets/platforms/magento.png';
import shopifyIcon from '../../../assets/platforms/shopify.png';
import bigcommerceIcon from '../../../assets/platforms/bigcommerce.png';
import woocommerceIcon from '../../../assets/platforms/woocommerce.png';
import salesforceIcon from '../../../assets/platforms/salesforce.png';
import customIcon from '../../../assets/platforms/custom.png';

const platformIcon = (src: string) => <img src={src} alt="" />;

const PLATFORM_OPTIONS = [
  { value: 'magento',     label: 'Magento',                    leadingIcon: platformIcon(magentoIcon) },
  { value: 'shopify',     label: 'Shopify',                    leadingIcon: platformIcon(shopifyIcon) },
  { value: 'bigcommerce', label: 'BigCommerce',                leadingIcon: platformIcon(bigcommerceIcon) },
  { value: 'woocommerce', label: 'WooCommerce',                leadingIcon: platformIcon(woocommerceIcon) },
  { value: 'salesforce',  label: 'Salesforce Commerce Cloud',  leadingIcon: platformIcon(salesforceIcon) },
  { value: 'custom',      label: 'Custom / Other',             leadingIcon: platformIcon(customIcon) },
];

const PROCESSOR_OPTIONS = [
  { value: 'braintree',  label: 'Braintree' },
  { value: 'stripe',     label: 'Stripe' },
  { value: 'adyen',      label: 'Adyen' },
  { value: 'worldpay',   label: 'Worldpay' },
  { value: 'cybersource', label: 'Cybersource' },
  { value: 'other',      label: 'Other' },
];

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Screen3AccountInfo({ data, update, onBack, onContinue }: Props) {
  const canContinue = !!(data.platform && data.paymentProcessor);

  return (
    <OnboardingCard title="Account Information" step="Step 2/4" onBack={onBack}>
      <div className="ob-section">
        <h2 className="ob-section__heading">Account Details</h2>

        <div className="ob-readonly-field">
          <span className="ob-readonly-field__label">Website URL</span>
          <span className="ob-readonly-field__value">
            {data.websiteUrl || '—'}
          </span>
        </div>

        <div className="ob-selector-setting">
          <div className="ob-selector-setting__text">
            <p className="ob-selector-setting__title">Platform</p>
            <p className="ob-selector-setting__desc">
              Choose the platform that your storefront runs on
            </p>
          </div>
          <Combobox
            placeholder="Select a platform"
            value={data.platform}
            onChange={v => update({ platform: v })}
            options={PLATFORM_OPTIONS}
          />
        </div>

        <div className="ob-selector-setting">
          <div className="ob-selector-setting__text">
            <p className="ob-selector-setting__title">Payment Processor</p>
            <p className="ob-selector-setting__desc">
              Choose the payment processing provider that you will use
            </p>
          </div>
          <Combobox
            placeholder="Select a processor"
            value={data.paymentProcessor}
            onChange={v => update({ paymentProcessor: v })}
            options={PROCESSOR_OPTIONS}
          />
        </div>
      </div>

      <Button variant="primary" fullWidth disabled={!canContinue} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}
