import { Button, Icon } from '../../../components';
import type { IconName } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';

interface Props {
  onRestart: () => void;
}

interface NextStep {
  title: string;
  description: string;
  done: boolean;
}

const STEPS: NextStep[] = [
  {
    title: 'Create a Bolt Account',
    description: 'Your account has been created!',
    done: true,
  },
  {
    title: 'Sign in to the Bolt Merchant Dashboard',
    description: 'Check your e-mail for a verification step and sign in to the dashboard.',
    done: false,
  },
  {
    title: 'Complete Integrations',
    description: 'Integrate with your cart platform, product catalog, and order management.',
    done: false,
  },
  {
    title: 'Setup Payments',
    description: 'Sign-up and enable Bolt Payments, or connect a third party PSP.',
    done: false,
  },
  {
    title: 'Configure Checkout Experience',
    description: 'Upload your logo and configure options such as shipping.',
    done: false,
  },
];

export function Screen7Created({ onRestart }: Props) {
  return (
    <OnboardingCard title="We've Created Your Bolt Account! 🎉">
      <div className="ob-whats-next">
        <h2 className="ob-whats-next__heading">What's Next?</h2>
        <p className="ob-whats-next__intro">
          You will need to complete a few more steps before you can start
          leveraging the Bolt Shopper Network in your marketing campaigns. All of
          this can be done in the Bolt dashboard.
        </p>
      </div>

      <ul className="ob-step-list">
        {STEPS.map(step => {
          const iconName: IconName = step.done ? 'check_circle' : 'empty_circle_outline';
          return (
            <li key={step.title} className="ob-step" data-done={step.done}>
              <span className="ob-step__icon" aria-hidden>
                <Icon name={iconName} size="s" />
              </span>
              <div className="ob-step__content">
                <p className="ob-step__title">{step.title}</p>
                <p className="ob-step__desc">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        variant="secondary"
        fullWidth
        iconRight={<Icon name="launch_arrow" size="m" />}
        onClick={onRestart}
      >
        Visit Bolt Help
      </Button>
    </OnboardingCard>
  );
}
