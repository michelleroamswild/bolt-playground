import { Button, Combobox, Input } from '../../../components';
import { OnboardingCard } from '../OnboardingLayout';
import type { OnboardingData } from '../OnboardingFlow';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'developer', label: 'Developer' },
  { value: 'viewer', label: 'Viewer' },
];

interface Props {
  data: OnboardingData;
  update: (patch: Partial<OnboardingData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function Screen1UserInfo({ data, update, onBack, onContinue }: Props) {
  const canContinue = data.userName.trim() && data.userEmail.trim();

  return (
    <OnboardingCard title="User Information" step="Step 3/4" onBack={onBack}>
      <div className="ob-section">
        <h2 className="ob-section__heading">Your Information</h2>
        <p className="ob-section__description">
          This will be used to create your account on the Bolt dashboard for your production and sandbox environments.
        </p>
        <Input
          placeholder="Name"
          value={data.userName}
          onChange={e => update({ userName: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={data.userEmail}
          onChange={e => update({ userEmail: e.target.value })}
        />
      </div>

      <div className="ob-section">
        <h2 className="ob-section__heading">Additional User (optional)</h2>
        <p className="ob-section__description">
          You can give Sandbox access to one additional user. More users can be added through your Bolt dashboard after we create your account.
        </p>
        <Input
          placeholder="Name"
          value={data.additionalUserName}
          onChange={e => update({ additionalUserName: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={data.additionalUserEmail}
          onChange={e => update({ additionalUserEmail: e.target.value })}
        />
        <Combobox
          placeholder="Role"
          value={data.additionalUserRole}
          onChange={v => update({ additionalUserRole: v })}
          options={ROLE_OPTIONS}
        />
      </div>

      <Button variant="primary" fullWidth disabled={!canContinue} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}
