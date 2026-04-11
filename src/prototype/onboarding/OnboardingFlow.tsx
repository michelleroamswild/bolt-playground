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

const emptyData: OnboardingData = {
  packageType: '',
  websiteUrl: '',
  platform: '',
  paymentProcessor: '',
  userName: '',
  userEmail: '',
  additionalUserName: '',
  additionalUserEmail: '',
  additionalUserRole: '',
  dbaName: '',
  industry: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  billingSameAsLegal: true,
  billingStreet: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
};

type Step = '0b' | 0 | 1 | 2 | 3 | 4 | 5 | 7;

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
      screen = <Screen4Verify data={data} onBack={() => goTo(2)} onSubmit={() => goTo(5)} />;
      break;
    case 5:
      screen = <Screen5Processing onDone={() => goTo(7)} />;
      break;
    case 7:
      screen = <Screen7Created onRestart={() => { setData(emptyData); goTo('0b'); }} />;
      break;
  }

  return <OnboardingLayout>{screen}</OnboardingLayout>;
}
