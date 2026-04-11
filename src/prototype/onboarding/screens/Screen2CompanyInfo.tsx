import { Button, Checkbox, Combobox, Input } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';

const STATE_OPTIONS = [
  { value: 'CA', label: 'CA' },
  { value: 'NY', label: 'NY' },
  { value: 'TX', label: 'TX' },
  { value: 'WA', label: 'WA' },
  { value: 'FL', label: 'FL' },
];

const INDUSTRY_OPTIONS = [
  { value: 'apparel', label: 'Apparel & Accessories' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'beauty', label: 'Beauty & Skincare' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'flowers', label: 'Flowers, Gifts, & Specialty Stores' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'furniture', label: 'Furniture, Appliances, & Equipment' },
  { value: 'general', label: 'General Retail' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'hobbies', label: 'Hobbies, Arts, & Crafts' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'industrial', label: 'Industrial Retail' },
  { value: 'jewelry', label: 'Jewelry & Watches' },
  { value: 'pet', label: 'Pet Supplies' },
  { value: 'sporting', label: 'Sporting Goods & Fitness' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'wineries', label: 'Wineries & Breweries' },
  { value: 'other', label: 'Other' },
];

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Screen2CompanyInfo({ data, update, onBack, onContinue }: Props) {
  const canContinue =
    data.dbaName.trim() &&
    data.industry &&
    data.streetAddress.trim() &&
    data.city.trim() &&
    data.state &&
    data.zip.trim() &&
    (data.billingSameAsLegal ||
      (data.billingStreet.trim() &&
        data.billingCity.trim() &&
        data.billingState &&
        data.billingZip.trim()));

  return (
    <OnboardingCard title="Company Information" step="Step 4/4" onBack={onBack}>
      <div className="ob-section">
        <h2 className="ob-section__heading">Company Details</h2>
        <Input
          placeholder="Primary Business Name (DBA Name)"
          value={data.dbaName}
          onChange={e => update({ dbaName: e.target.value })}
        />
        <Combobox
          placeholder="Industry"
          value={data.industry}
          onChange={v => update({ industry: v })}
          options={INDUSTRY_OPTIONS}
        />
      </div>

      <div className="ob-section">
        <h2 className="ob-section__heading">Company Address</h2>
        <Input
          placeholder="Street address"
          value={data.streetAddress}
          onChange={e => update({ streetAddress: e.target.value })}
        />
        <div className="ob-row">
          <Input
            placeholder="City"
            value={data.city}
            onChange={e => update({ city: e.target.value })}
          />
          <Combobox
            placeholder="State"
            value={data.state}
            onChange={v => update({ state: v })}
            options={STATE_OPTIONS}
            className="ob-field--state"
          />
          <Input
            placeholder="ZIP"
            value={data.zip}
            onChange={e => update({ zip: e.target.value })}
            className="ob-field--zip"
          />
        </div>
        <Checkbox
          label="Billing Address is the same as Company Address"
          checked={data.billingSameAsLegal}
          onChange={e => update({ billingSameAsLegal: e.target.checked })}
        />
      </div>

      {!data.billingSameAsLegal && (
        <div className="ob-section">
          <h2 className="ob-section__heading">Billing Address</h2>
          <Input
            placeholder="Street address"
            value={data.billingStreet}
            onChange={e => update({ billingStreet: e.target.value })}
          />
          <div className="ob-row">
            <Input
              placeholder="City"
              value={data.billingCity}
              onChange={e => update({ billingCity: e.target.value })}
            />
            <Combobox
              placeholder="State"
              value={data.billingState}
              onChange={v => update({ billingState: v })}
              options={STATE_OPTIONS}
              className="ob-field--state"
            />
            <Input
              placeholder="ZIP"
              value={data.billingZip}
              onChange={e => update({ billingZip: e.target.value })}
              className="ob-field--zip"
            />
          </div>
        </div>
      )}

      <Button variant="primary" fullWidth disabled={!canContinue} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}
