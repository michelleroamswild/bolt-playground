import { useState } from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { useIframeMessage } from './useIframeMessage';
import { Screen0bPackage } from './screens/Screen0bPackage';
import { Screen0Welcome } from './screens/Screen0Welcome';
import { Screen1UserInfo } from './screens/Screen1UserInfo';
import { Screen2CompanyInfo } from './screens/Screen2CompanyInfo';
import { Screen3AccountInfo } from './screens/Screen3AccountInfo';
import { Screen4Verify } from './screens/Screen4Verify';
import { Screen5Processing } from './screens/Screen5Processing';
import { Screen6Confirmation } from './screens/Screen6Confirmation';
import { Screen7Created } from './screens/Screen7Created';

export interface OnboardingData {
  packageType: '' | 'checkout' | 'ignite' | 'everywhere';
  websiteUrl: string;
  platform: string;
  paymentProcessor: string;
  userName: string;
  userEmail: string;
  additionalUserName: string;
  additionalUserEmail: string;
  additionalUserRole: string;
  dbaName: string;
  industry: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  billingSameAsLegal: boolean;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
}

// Demo defaults — pre-filled so the flow can be clicked through in a presentation.
// Reset clears everything back to empty.
const emptyData: OnboardingData = {
  packageType: '',
  websiteUrl: 'https://www.lightningshop.com',
  platform: 'shopify',
  paymentProcessor: 'stripe',
  userName: 'Clark Clickerati',
  userEmail: 'clark@lightningshop.com',
  additionalUserName: '',
  additionalUserEmail: '',
  additionalUserRole: '',
  dbaName: 'The Lightning Shop',
  industry: 'apparel',
  streetAddress: '123 Thunder Lane',
  city: 'San Francisco',
  state: 'CA',
  zip: '94103',
  billingSameAsLegal: true,
  billingStreet: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
};

type Step = '0b' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('0b');
  const [data, setData] = useState<OnboardingData>(emptyData);

  const update = (patch: Partial<OnboardingData>) =>
    setData(d => ({ ...d, ...patch }));

  const goTo = (next: Step) => setStep(next);

  // postMessage bridge for portfolio iframe embedding
  useIframeMessage({
    step,
    onGoto: (s) => setStep(s as Step),
    onReset: () => { setData(emptyData); setStep('0b'); },
  });

  let screen;
  switch (step) {
    case '0b':
      screen = <Screen0bPackage data={data} update={update} onContinue={() => goTo(0)} />;
      break;
    case 0:
      screen = <Screen0Welcome data={data} update={update} onBack={() => goTo('0b')} onContinue={() => goTo(3)} />;
      break;
    case 3:
      screen = <Screen3AccountInfo data={data} update={update} onBack={() => goTo(0)} onContinue={() => goTo(1)} />;
      break;
    case 1:
      screen = <Screen1UserInfo data={data} update={update} onBack={() => goTo(3)} onContinue={() => goTo(2)} />;
      break;
    case 2:
      screen = <Screen2CompanyInfo data={data} update={update} onBack={() => goTo(1)} onContinue={() => goTo(4)} />;
      break;
    case 4:
      screen = <Screen4Verify data={data} onBack={() => goTo(2)} onSubmit={() => goTo(6)} />;
      break;
    case 6:
      screen = <Screen6Confirmation onVisitHelp={() => goTo(5)} />;
      break;
    case 5:
      screen = <Screen5Processing onDone={() => { goTo(7); window.scrollTo({ top: 0, behavior: 'auto' }); }} />;
      break;
    case 7:
      screen = <Screen7Created onRestart={() => { setData(emptyData); goTo('0b'); window.scrollTo({ top: 0, behavior: 'auto' }); }} />;
      break;
  }

  return <OnboardingLayout>{screen}</OnboardingLayout>;
}
