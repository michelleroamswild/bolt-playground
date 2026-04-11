import { Button, Radio } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';
import packageCheckout from '../../../assets/package-checkout.png';
import packageIgnite from '../../../assets/package-ignite.png';
import packageEverywhere from '../../../assets/package-everywhere.png';

interface PackageOption {
  value: OnboardingData['packageType'];
  title: string;
  description: string;
  graphic: string;
}

const PACKAGES: PackageOption[] = [
  {
    value: 'checkout',
    title: 'Checkout Package',
    description: "Bolt's fully managed checkout solution.",
    graphic: packageCheckout,
  },
  {
    value: 'ignite',
    title: 'Ignite',
    description: "Bolt's account network embedded in your checkout.",
    graphic: packageIgnite,
  },
  {
    value: 'everywhere',
    title: 'Checkout Everywhere',
    description: "Use Bolt's checkout solution for marketing campaigns.",
    graphic: packageEverywhere,
  },
];

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onContinue: () => void;
}

export function Screen0bPackage({ data, update, onContinue }: Props) {
  const canContinue = !!data.packageType;

  return (
    <OnboardingCard
      title="Welcome to Bolt!"
      subtitle="Select a package that best describes your needs."
    >
      <div className="ob-package-list">
        {PACKAGES.map(pkg => {
          const selected = data.packageType === pkg.value;
          return (
            <label
              key={pkg.value}
              className="ob-package"
              data-selected={selected}
            >
              <Radio
                name="package-type"
                checked={selected}
                onChange={() => update({ packageType: pkg.value })}
              />
              <div className="ob-package__text">
                <span className="ob-package__title">{pkg.title}</span>
                <span className="ob-package__desc">{pkg.description}</span>
              </div>
              <img
                src={pkg.graphic}
                alt=""
                className="ob-package__graphic"
                aria-hidden
              />
            </label>
          );
        })}
      </div>

      <Button variant="primary" fullWidth disabled={!canContinue} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}
