import { useState } from 'react';
import { Button, Checkbox } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  onBack: () => void;
  onSubmit: () => void;
}

const PACKAGE_LABELS: Record<OnboardingData['packageType'], string> = {
  checkout:   'Checkout',
  ignite:     'Ignite',
  everywhere: 'Checkout Everywhere',
  '':         '—',
};

const titleCase = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : '—';

const deriveWebsiteName = (url: string) => {
  if (!url) return '—';
  const cleaned = url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  const root = cleaned.split('.')[0] || cleaned;
  return root
    .split(/[-_]/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || cleaned;
};

const formatAddress = (street: string, city: string, state: string, zip: string) => {
  if (!street && !city && !state && !zip) return '—';
  const lineTwo = [city, state].filter(Boolean).join(', ') + (zip ? ` ${zip}` : '');
  return (
    <>
      {street && <div>{street}</div>}
      {lineTwo.trim() && <div>{lineTwo}</div>}
    </>
  );
};

function Attribute({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ob-attr-cell">
      <span className="ob-attr-cell__label">{label}</span>
      <div className="ob-attr-cell__value">{children}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ob-verify-group">
      <h2 className="ob-verify-group__title">{title}</h2>
      {children}
    </div>
  );
}

export function Screen4Verify({ data, onBack, onSubmit }: Props) {
  const [attestTrue, setAttestTrue] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = attestTrue && agreeTerms;

  // Fake network latency so the button spinner is visible before we advance.
  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(onSubmit, 1600);
  };

  const companyAddress = formatAddress(data.streetAddress, data.city, data.state, data.zip);
  const billingAddress = data.billingSameAsLegal
    ? companyAddress
    : formatAddress(data.billingStreet, data.billingCity, data.billingState, data.billingZip);

  return (
    <OnboardingCard
      title="Verify Information"
      subtitle="Please verify all the information entered is correct and submit below."
      onBack={onBack}
    >
      <Group title="Account Information">
        <div className="ob-attr-row">
          <Attribute label="Website URL">{data.websiteUrl || '—'}</Attribute>
          <Attribute label="Website Name">{deriveWebsiteName(data.websiteUrl)}</Attribute>
        </div>
        <div className="ob-attr-row">
          <Attribute label="Payment Processor">{titleCase(data.paymentProcessor)}</Attribute>
          <Attribute label="Platform">{titleCase(data.platform)}</Attribute>
        </div>
        <div className="ob-attr-row">
          <Attribute label="Sandbox URL">{data.websiteUrl || '—'}</Attribute>
          <Attribute label="Checkout type">{PACKAGE_LABELS[data.packageType]}</Attribute>
        </div>
      </Group>

      <Group title="Company Information">
        <div className="ob-attr-row">
          <Attribute label="Primary Business Name">{data.dbaName || '—'}</Attribute>
          <Attribute label="Industry">{titleCase(data.industry)}</Attribute>
        </div>
        <div className="ob-attr-row">
          <Attribute label="Address">{companyAddress}</Attribute>
          <Attribute label="Billing Address">{billingAddress}</Attribute>
        </div>
      </Group>

      <Group title="User Information">
        <div className="ob-attr-row">
          <Attribute label="Name">{data.userName || '—'}</Attribute>
          <Attribute label="Email">{data.userEmail || '—'}</Attribute>
        </div>
        {(data.additionalUserName || data.additionalUserEmail) && (
          <>
            <h3 className="ob-verify-subgroup__title">Additional User</h3>
            <div className="ob-attr-row">
              <Attribute label="Name">{data.additionalUserName || '—'}</Attribute>
              <Attribute label="Email">{data.additionalUserEmail || '—'}</Attribute>
            </div>
          </>
        )}
      </Group>

      <div className="ob-attest-block">
        <Checkbox
          checked={attestTrue}
          onChange={e => setAttestTrue(e.target.checked)}
          label="I attest that, to the best of my knowledge, all of the information and answers to questions that I have provided in this application are true and accurate."
        />
        <Checkbox
          checked={agreeTerms}
          onChange={e => setAgreeTerms(e.target.checked)}
          label={
            <>
              I have read and agree to Bolt's <a href="#" className="ob-attest-link">terms and conditions</a>.
            </>
          }
        />
      </div>

      <Button
        variant="primary"
        fullWidth
        disabled={!canSubmit}
        busy={submitting}
        onClick={handleSubmit}
      >
        Submit and Create Account
      </Button>
    </OnboardingCard>
  );
}
