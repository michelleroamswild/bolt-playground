import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { TimedOffersLayout } from './TimedOffersLayout';
import { Dashboard } from './screens/Dashboard';
import { PostPurchaseSales } from './screens/PostPurchaseSales';
import { OffersDashboard, OFFERS } from './screens/OffersDashboard';
import type { Offer } from './screens/OffersDashboard';
import { OfferDetail } from './screens/OfferDetail';
import type { OfferDetailData } from './screens/OfferDetail';
import { CreateOffer } from './screens/CreateOffer';

type Screen = 'home' | 'analytics' | 'checkout' | 'post-purchase' | 'transactions' | 'subscriptions' | 'fraud-protection' | 'payments' | 'administration';

// ── Route model ─────────────────────────────────────────────
// Hash format: #timed-offers/<screen>[/offers[/<id>]]
// Examples:
//   #timed-offers                           → home
//   #timed-offers/analytics                 → analytics
//   #timed-offers/post-purchase             → sales (Boost sales beyond checkout)
//   #timed-offers/post-purchase/offers      → offers dashboard
//   #timed-offers/post-purchase/offers/2    → offer detail (id=2)

interface Route {
  screen: Screen;
  offersView: boolean;
  offerId: string | null;
  creating: boolean;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  const screenPart = (parts[1] as Screen) || 'home';
  const validScreens: Screen[] = ['home','analytics','checkout','post-purchase','transactions','subscriptions','fraud-protection','payments','administration'];
  const screen: Screen = validScreens.includes(screenPart) ? screenPart : 'home';

  if (screen === 'post-purchase' && parts[2] === 'offers') {
    if (parts[3] === 'create') {
      return { screen, offersView: true, offerId: null, creating: true };
    }
    return { screen, offersView: true, offerId: parts[3] ?? null, creating: false };
  }
  return { screen, offersView: false, offerId: null, creating: false };
}

function buildHash(r: Route): string {
  let out = 'timed-offers';
  if (r.screen !== 'home') out += '/' + r.screen;
  if (r.screen === 'post-purchase' && r.offersView) {
    out += '/offers';
    if (r.creating) out += '/create';
    else if (r.offerId) out += '/' + r.offerId;
  }
  return '#' + out;
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ padding: 'var(--space-6)', color: 'var(--content-tertiary)' }}>
      <p className="text-h3">{title}</p>
      <p className="text-s-regular" style={{ marginTop: 'var(--space-2)' }}>Coming soon.</p>
    </div>
  );
}

function offerToDetail(o: Offer): OfferDetailData {
  return {
    name: o.name,
    referenceId: '1234567890',
    price: '$15.00',
    variant: '200g',
    description: 'This is the description',
    timer: '5 Minutes',
    discount: '20%',
    dateCreated: o.dateCreated,
    expirationDate: o.expirationDate,
    offerViews: 4567,
    conversion: '1.3%',
    total: '$6,471',
    cartItems: [
      { name: 'Early Bird Coffee (16oz)', referenceId: '2456456456', price: '$137.68' },
      { name: 'Thai tea',                 referenceId: '2456456456', price: '$137.68' },
      { name: 'Coffee Filters',           referenceId: '2456456456', price: '$137.68' },
    ],
    emoji: o.emoji,
    color: o.color,
  };
}

export function TimedOffersFlow() {
  const [route, setRoute] = useState<Route>(() => parseHash());

  // Sync hash → state on browser back/forward
  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sync state → hash (replace current hash, no history push for nav within flow)
  const updateRoute = (next: Route) => {
    const newHash = buildHash(next);
    if (newHash !== window.location.hash) {
      window.history.pushState(null, '', newHash);
    }
    setRoute(next);
  };

  const navigate = (s: Screen) => {
    updateRoute({ screen: s, offersView: false, offerId: null, creating: false });
  };

  const selectedOffer = route.offerId ? OFFERS.find(o => o.id === route.offerId) ?? null : null;

  const postPurchaseScreen = selectedOffer
    ? <OfferDetail data={offerToDetail(selectedOffer)} onBack={() => updateRoute({ ...route, offerId: null })} />
    : route.offersView
      ? <OffersDashboard
          onSelectOffer={o => updateRoute({ ...route, offerId: o.id })}
          onCreate={() => updateRoute({ ...route, creating: true })}
        />
      : <PostPurchaseSales onTryItNow={() => updateRoute({ ...route, offersView: true })} />;

  const content: Record<Screen, ReactElement> = {
    'home':             <Dashboard onNavigate={s => navigate(s as Screen)} />,
    'analytics':        <ComingSoon title="Analytics" />,
    'checkout':         <ComingSoon title="Checkout" />,
    'post-purchase':    postPurchaseScreen,
    'transactions':     <ComingSoon title="Transactions" />,
    'subscriptions':    <ComingSoon title="Subscriptions" />,
    'fraud-protection': <ComingSoon title="Fraud Protection" />,
    'payments':         <ComingSoon title="Payments" />,
    'administration':   <ComingSoon title="Administration" />,
  };

  const exitCreate = () => updateRoute({ ...route, creating: false });

  return (
    <>
      <TimedOffersLayout screen={route.screen} onNavigate={s => navigate(s as Screen)}>
        {content[route.screen]}
      </TimedOffersLayout>
      {route.creating && (
        <CreateOffer onCancel={exitCreate} onDiscard={exitCreate} onCreate={exitCreate} />
      )}
    </>
  );
}
