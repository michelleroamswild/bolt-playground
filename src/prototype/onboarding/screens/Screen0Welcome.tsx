import { Button, Input } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onBack?: () => void;
  onContinue: () => void;
}

const TITLES: Record<OnboardingData['packageType'], string> = {
  checkout:   'Welcome to Checkout!',
  ignite:     'Welcome to Ignite!',
  everywhere: 'Welcome to Bolt Checkout Everywhere!',
  '':         'Welcome to Bolt!',
};

export function Screen0Welcome({ data, update, onBack, onContinue }: Props) {
  const canContinue = data.websiteUrl.trim().length > 0;

  return (
    <OnboardingCard
      title={TITLES[data.packageType]}
      subtitle="We need some more information in order to create your account with Bolt."
      step="Step 1/4"
      onBack={onBack}
    >
      <div className="ob-section">
        <label className="ob-section__heading" htmlFor="ob-website-url">Main website URL</label>
        <Input
          id="ob-website-url"
          placeholder="Website URL"
          value={data.websiteUrl}
          onChange={e => update({ websiteUrl: e.target.value })}
        />
      </div>
      <Button variant="primary" fullWidth disabled={!canContinue} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}
