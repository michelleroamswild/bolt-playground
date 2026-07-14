import { Button } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';

interface Props {
  onVisitHelp: () => void;
}

export function Screen6Confirmation({ onVisitHelp }: Props) {
  return (
    <OnboardingCard title="We got your information! 🎉">
      <p className="ob-confirm__text">
        We will create your account and be in touch with next steps when your
        account is ready. If you have any questions, please reach out to your
        Bolt representative
      </p>

      <Button variant="secondary" fullWidth onClick={onVisitHelp}>
        Visit Bolt Help
      </Button>
    </OnboardingCard>
  );
}
