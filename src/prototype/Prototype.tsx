import { useState } from 'react';
import { Layout } from './Layout';
import { BrandingStyling } from './screens/BrandingStyling';
import { EditBranding } from './screens/EditBranding';
import { Overview } from './screens/Overview';
import { PaymentMethods } from './screens/PaymentMethods';
import { Checkout } from './screens/Checkout';

type Screen =
  | 'home' | 'analytics'
  | 'checkout' | 'post-purchase' | 'product-recs' | 'subscriptions' | 'branding-styling'
  | 'transactions' | 'fraud-protection' | 'payments'
  | 'administration' | 'developers';

function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ padding: 'var(--space-6)', color: 'var(--content-tertiary)' }}>
      <p className="text-h3">{title}</p>
      <p className="text-s-regular" style={{ marginTop: 'var(--space-2)' }}>Coming soon.</p>
    </div>
  );
}

export function Prototype() {
  const [screen, setScreen] = useState<Screen>('branding-styling');
  const [editing, setEditing] = useState(window.location.hash === '#edit-branding');

  // Edit Branding is a full-screen editor — no sidebar
  if (editing) {
    return <EditBranding onExit={() => setEditing(false)} />;
  }

  const content: Record<Screen, JSX.Element> = {
    'home':              <Overview />,
    'analytics':         <ComingSoon title="Analytics" />,
    'checkout':          <Checkout />,
    'post-purchase':     <ComingSoon title="Post-purchase Offers" />,
    'product-recs':      <ComingSoon title="Product Recommendations" />,
    'subscriptions':     <ComingSoon title="Subscriptions" />,
    'branding-styling':  <BrandingStyling onEditBranding={() => setEditing(true)} />,
    'transactions':      <ComingSoon title="Transactions" />,
    'fraud-protection':  <ComingSoon title="Fraud Protection" />,
    'payments':          <PaymentMethods />,
    'administration':    <ComingSoon title="Administration" />,
    'developers':        <ComingSoon title="Developers" />,
  };

  return (
    <Layout screen={screen} onNavigate={s => setScreen(s as Screen)}>
      {content[screen]}
    </Layout>
  );
}
