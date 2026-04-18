import { useEffect, useState } from 'react';
import './App.css';
import { Button, Input, Toggle, Checkbox, Radio, Tag, Callout, Modal, ToastContainer, Accordion, AccordionItem, Select, Tabs, Avatar, Icon, ICON_NAMES, Combobox, CodeBlock, Progress, Tooltip } from './components';
import type { ToastItem } from './components';
import type { IconName } from './components/Icon';
import { Prototype } from './prototype/Prototype';
import { OnboardingFlow } from './prototype/onboarding/OnboardingFlow';
import { TimedOffersFlow } from './prototype/timed-offers/TimedOffersFlow';
import { LoadingScreen } from './prototype/onboarding/LoadingScreen';

// ── Section wrapper ─────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ds-section">
      <h2 className="ds-section__title text-h3">{title}</h2>
      <div className="ds-section__body">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="ds-row">
      {label && <p className="ds-row__label text-xs-medium">{label}</p>}
      <div className="ds-row__items">{children}</div>
    </div>
  );
}

// ── Color swatch ────────────────────────────────────────────
function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="swatch">
      <div className="swatch__color" style={{ background: value }} />
      <p className="swatch__name text-xs-regular">{name}</p>
      <p className="swatch__value text-xs-regular">{value}</p>
    </div>
  );
}

// ── Prototype chrome ────────────────────────────────────────
// Floats the dark mode bar OFF the design — only reveals it when the user
// hovers a thin trigger zone at the top of the viewport.
// When embedded in an iframe, the chrome is hidden entirely so the
// portfolio embed shows nothing but the prototype itself.
const isEmbedded = (() => {
  try { return window.parent !== window; } catch { return true; }
})();

function PrototypeChrome({ label, onExit, children }: { label: string; onExit: () => void; children: React.ReactNode }) {
  const [showBar, setShowBar] = useState(false);

  if (isEmbedded) {
    return (
      <div style={{ height: '100vh', overflow: 'auto' }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="ds-mode-bar-trigger" onMouseEnter={() => setShowBar(true)} />
      <div
        className={`ds-mode-bar ds-mode-bar--floating${showBar ? ' ds-mode-bar--visible' : ''}`}
        onMouseLeave={() => setShowBar(false)}
      >
        <Button variant="tertiary" size="xs" onClick={onExit}>← Design System</Button>
        <span className="text-xs-medium ds-mode-bar__label">{label}</span>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>{children}</div>
    </div>
  );
}

// ── App ─────────────────────────────────────────────────────
export default function App() {
  const getModeFromHash = (hash: string): 'ds' | 'prototype' | 'onboarding' | 'timed-offers' | 'loader' => {
    if (hash.startsWith('#loader')) return 'loader';
    if (hash.startsWith('#onboarding')) return 'onboarding';
    if (hash.startsWith('#timed-offers')) return 'timed-offers';
    if (hash.startsWith('#prototype') || hash === '#edit-branding') return 'prototype';
    return 'ds';
  };
  const getDsSectionFromHash = (hash: string): string => {
    // Hash shape in DS mode: '' or '#ds/<section>' (e.g. '#ds/buttons')
    const m = hash.match(/^#ds\/([\w-]+)/);
    return m ? m[1] : 'overview';
  };
  const [mode, setMode] = useState<'ds' | 'prototype' | 'onboarding' | 'timed-offers' | 'loader'>(
    getModeFromHash(window.location.hash)
  );
  const [dsSection, setDsSection] = useState<string>(getDsSectionFromHash(window.location.hash));

  // React to browser back/forward navigation at the top level
  useEffect(() => {
    const onHashChange = () => {
      setMode(getModeFromHash(window.location.hash));
      setDsSection(getDsSectionFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateDs = (id: string) => {
    const hash = id === 'overview' ? '' : `ds/${id}`;
    window.location.hash = hash;
    setDsSection(id);
    setMode('ds');
  };
  const [toggleOn, setToggleOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [comboboxValue, setComboboxValue] = useState('usd');

  const addToast = (props: Omit<ToastItem, 'id'>) =>
    setToasts(t => [...t, { ...props, id: Math.random().toString(36).slice(2) }]);
  const dismissToast = (id: string) =>
    setToasts(t => t.filter(x => x.id !== id));

  const exitToDS = () => { window.location.hash = ''; setMode('ds'); };

  if (mode === 'prototype') {
    return (
      <PrototypeChrome label="Bolt Configuration — Prototype" onExit={exitToDS}>
        <Prototype />
      </PrototypeChrome>
    );
  }

  if (mode === 'onboarding') {
    return (
      <PrototypeChrome label="Onboarding Acceleration — Prototype" onExit={exitToDS}>
        <OnboardingFlow />
      </PrototypeChrome>
    );
  }

  if (mode === 'timed-offers') {
    return (
      <PrototypeChrome label="Timed Offers — Prototype" onExit={exitToDS}>
        <TimedOffersFlow />
      </PrototypeChrome>
    );
  }

  if (mode === 'loader') {
    // Standalone loader — no chrome, safe to iframe anywhere.
    return <LoadingScreen />;
  }

  const PROJECTS: { id: string; mode: 'prototype' | 'onboarding' | 'timed-offers'; label: string; description: string; icon: IconName; theme: 'config' | 'onboarding' | 'offers' }[] = [
    { id: 'onboarding',   mode: 'onboarding',   label: 'Onboarding Acceleration', description: 'Merchant signup flow with streamlined setup and verification.', icon: 'user',     theme: 'onboarding' },
    { id: 'timed-offers', mode: 'timed-offers', label: 'Timed Offers',            description: 'Post-purchase offers dashboard with creation and scheduling.',   icon: 'gift',     theme: 'offers' },
    { id: 'prototype',    mode: 'prototype',    label: 'Bolt Configuration',      description: 'Merchant-facing configuration surfaces — branding, payments.',   icon: 'setting',  theme: 'config' },
  ];

  const SECTIONS: { id: string; label: string; group: string }[] = [
    { id: 'overview',   label: 'Overview',   group: '' },
    { id: 'colors',     label: 'Colors',     group: 'Foundations' },
    { id: 'typography', label: 'Typography', group: 'Foundations' },
    { id: 'icons',      label: 'Icons',      group: 'Foundations' },
    { id: 'buttons',    label: 'Buttons',    group: 'Components' },
    { id: 'tags',       label: 'Tags',       group: 'Components' },
    { id: 'inputs',     label: 'Inputs',     group: 'Components' },
    { id: 'select',     label: 'Select',     group: 'Components' },
    { id: 'combobox',   label: 'Combobox',   group: 'Components' },
    { id: 'controls',   label: 'Controls',   group: 'Components' },
    { id: 'radio',      label: 'Radio',      group: 'Components' },
    { id: 'callouts',   label: 'Callouts',   group: 'Components' },
    { id: 'accordion',  label: 'Accordion',  group: 'Components' },
    { id: 'modal',      label: 'Modal',      group: 'Components' },
    { id: 'tabs',       label: 'Tabs',       group: 'Components' },
    { id: 'avatar',     label: 'Avatar',     group: 'Components' },
    { id: 'toast',      label: 'Toast',      group: 'Components' },
    { id: 'progress',   label: 'Progress',   group: 'Components' },
    { id: 'tooltip',    label: 'Tooltip',    group: 'Components' },
  ];

  const groups = Array.from(new Set(SECTIONS.filter(s => s.group).map(s => s.group)));

  return (
    <div className="ds-app">
      {/* Header */}
      <header className="ds-header">
        <div className="ds-header__inner">
          <div className="ds-header__logo" onClick={() => navigateDs('overview')}>
            <Icon name="bolt_icon_filled" size="l" />
            <span className="text-h3">Blitz Design System</span>
          </div>
        </div>
      </header>

      <div className="ds-layout">
        {/* Sidebar nav */}
        <aside className="ds-sidebar">
          <nav className="ds-sidebar__nav">
            <button
              className={`ds-nav-link${dsSection === 'overview' ? ' ds-nav-link--active' : ''}`}
              onClick={() => navigateDs('overview')}
            >
              Overview
            </button>
            {groups.map(g => (
              <div key={g} className="ds-nav-group">
                <p className="ds-nav-group__label">{g}</p>
                {SECTIONS.filter(s => s.group === g).map(s => (
                  <button
                    key={s.id}
                    className={`ds-nav-link${dsSection === s.id ? ' ds-nav-link--active' : ''}`}
                    onClick={() => navigateDs(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

      <main className="ds-main">

        {/* ── Overview ────────────────────────────────────── */}
        {dsSection === 'overview' && (
          <section className="ds-section">
            <h2 className="ds-section__title text-h3">Overview</h2>
            <p className="text-m-regular" style={{ color: 'var(--content-secondary)', maxWidth: 640 }}>
              Blitz is Bolt's internal design system. Foundations for color, typography, and iconography sit under one system alongside a component library used across every merchant-facing surface.
            </p>

            <h3 className="ds-overview-subtitle text-h4">Prototypes</h3>
            <div className="ds-project-grid">
              {PROJECTS.map(p => (
                <button key={p.id} className="ds-project-card" onClick={() => { window.location.hash = p.id; setMode(p.mode); }}>
                  <div className={`ds-project-card__preview ds-project-card__preview--${p.theme}`}>
                    <Icon name={p.icon} size="xl" />
                  </div>
                  <div className="ds-project-card__meta">
                    <div className="ds-project-card__title">
                      <p className="text-s-medium">{p.label}</p>
                      <span className="text-s-medium">→</span>
                    </div>
                    <p className="ds-project-card__description text-xs-regular">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="ds-overview-subtitle text-h4">Library</h3>
            <div className="ds-overview-grid">
              {SECTIONS.filter(s => s.id !== 'overview').map(s => (
                <button key={s.id} className="ds-overview-card" onClick={() => navigateDs(s.id)}>
                  <div className="ds-overview-card__preview">
                    <OverviewPreview id={s.id} />
                  </div>
                  <div className="ds-overview-card__meta">
                    <p className="text-s-medium">{s.label}</p>
                    <p className="text-xs-regular" style={{ color: 'var(--content-tertiary)' }}>{s.group}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── Colors ─────────────────────────────────────── */}
        {dsSection === 'colors' && (
        <Section title="Colors">
          <Row label="Brand">
            <Swatch name="Bolt Black" value="#11190c" />
            <Swatch name="Lightning" value="#e1ff00" />
            <Swatch name="Blue 500" value="#006dff" />
          </Row>
          <Row label="Content">
            <Swatch name="Primary" value="#000000" />
            <Swatch name="Secondary" value="#454644" />
            <Swatch name="Tertiary" value="#6f6f67" />
            <Swatch name="Disabled" value="#9e9e99" />
            <Swatch name="Critical" value="#e62728" />
            <Swatch name="Success" value="#00ae49" />
            <Swatch name="Warning" value="#9a6f00" />
            <Swatch name="Info" value="#8c40f2" />
          </Row>
          <Row label="Surface">
            <Swatch name="Primary" value="#ffffff" />
            <Swatch name="Secondary" value="#fafafa" />
            <Swatch name="Tertiary" value="#f6f5f4" />
            <Swatch name="Inverse" value="#1f211c" />
            <Swatch name="Critical" value="#fbeaec" />
            <Swatch name="Success" value="#e0f6e2" />
            <Swatch name="Warning" value="#fdf6e3" />
            <Swatch name="Info" value="#f2eafd" />
          </Row>
        </Section>
        )}

        {/* ── Typography ─────────────────────────────────── */}
        {dsSection === 'typography' && (
        <Section title="Typography">
          <div className="ds-type-stack">
            <p className="text-h1-xl" style={{ fontFamily: 'sans-serif' }}>Heading XL — 48px</p>
            <p className="text-h1-l" style={{ fontFamily: 'sans-serif' }}>Heading Large — 32px</p>
            <p className="text-h1">Heading 1 — 24px / Semi Bold</p>
            <p className="text-h2">Heading 2 — 20px / Semi Bold</p>
            <p className="text-h3">Heading 3 — 16px / Semi Bold</p>
            <p className="text-h4">Heading 4 — 14px / Semi Bold</p>
            <p className="text-h5">Heading 5 — 11px / Semi Bold</p>
            <p className="text-m-regular">Body Medium Regular — 16px</p>
            <p className="text-m-medium">Body Medium Medium — 16px</p>
            <p className="text-s-regular">Body Small Regular — 14px</p>
            <p className="text-s-medium">Body Small Medium — 14px</p>
            <p className="text-xs-regular">Body XS Regular — 11px</p>
          </div>
        </Section>
        )}

        {/* ── Buttons ────────────────────────────────────── */}
        {dsSection === 'buttons' && (
        <Section title="Buttons">
          <Row label="Primary — sizes">
            <Button variant="primary" size="xs">Extra Small</Button>
            <Button variant="primary" size="s">Small</Button>
            <Button variant="primary" size="m">Medium</Button>
          </Row>
          <Row label="Secondary">
            <Button variant="secondary" size="xs">Extra Small</Button>
            <Button variant="secondary" size="s">Small</Button>
            <Button variant="secondary" size="m">Medium</Button>
          </Row>
          <Row label="Tertiary">
            <Button variant="tertiary" size="xs">Extra Small</Button>
            <Button variant="tertiary" size="s">Small</Button>
            <Button variant="tertiary" size="m">Medium</Button>
          </Row>
          <Row label="Pill — Primary">
            <Button variant="primary" shape="pill" size="xs">Extra Small</Button>
            <Button variant="primary" shape="pill" size="s">Small</Button>
            <Button variant="primary" shape="pill" size="m">Medium</Button>
          </Row>
          <Row label="States">
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" busy>Busy</Button>
            <Button variant="primary" destructive>Destructive</Button>
          </Row>
          <Row label="Inverse (dark bg)" >
            <div style={{ background: 'var(--surface-inverse-primary)', padding: '12px 16px', borderRadius: 8, display: 'flex', gap: 8 }}>
              <Button variant="primary" inverse>Primary</Button>
              <Button variant="secondary" inverse>Secondary</Button>
              <Button variant="tertiary" inverse>Tertiary</Button>
            </div>
          </Row>
          <Row label="With icons">
            <Button variant="primary" iconLeft={<BoltIcon />}>Pay with Bolt</Button>
            <Button variant="secondary" iconRight={<ChevronIcon />}>Continue</Button>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Button variant="primary" size="m" onClick={handleClick}>
  Pay with Bolt
</Button>

<Button variant="secondary" iconRight={<ChevronIcon />}>
  Continue
</Button>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Tags ───────────────────────────────────────── */}
        {dsSection === 'tags' && (
        <Section title="Tags">
          <Row label="Sentiment">
            <Tag sentiment="neutral">Neutral</Tag>
            <Tag sentiment="success">Success</Tag>
            <Tag sentiment="warning">Warning</Tag>
            <Tag sentiment="error">Error</Tag>
            <Tag sentiment="informative">Informative</Tag>
            <Tag sentiment="highlight">Highlight</Tag>
            <Tag sentiment="quiet">Quiet</Tag>
          </Row>
          <Row label="Outline">
            <Tag sentiment="neutral" outline>Neutral</Tag>
            <Tag sentiment="success" outline>Success</Tag>
            <Tag sentiment="warning" outline>Warning</Tag>
            <Tag sentiment="error" outline>Error</Tag>
            <Tag sentiment="informative" outline>Informative</Tag>
          </Row>
          <Row label="Inverse">
            <div style={{ background: 'var(--surface-inverse-primary)', padding: '12px 16px', borderRadius: 8, display: 'inline-flex', gap: 8 }}>
              <Tag inverse>Authorized</Tag>
              <Tag inverse>Completed</Tag>
            </div>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Tag sentiment="success">Authorized</Tag>
<Tag sentiment="warning" outline>Pending</Tag>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Inputs ─────────────────────────────────────── */}
        {dsSection === 'inputs' && (
        <Section title="Inputs">
          <Row label="Sizes">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
              <Input label="Medium input" placeholder="Enter value..." size="m" value={inputVal} onChange={e => setInputVal(e.target.value)} />
              <Input label="Small input" placeholder="Enter value..." size="s" />
            </div>
          </Row>
          <Row label="States">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
              <Input label="Default" placeholder="Default state" />
              <Input label="Error" placeholder="Error state" status="error" hint="This field is required." />
              <Input label="Warning" placeholder="Warning state" status="warning" hint="Double-check this value." />
              <Input label="Disabled" placeholder="Disabled" disabled />
            </div>
          </Row>
          <Row label="Variants">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
              <Input label="Outline (default)" placeholder="Outline input" variant="outline" />
              <Input label="Flat" placeholder="Flat input" variant="flat" />
            </div>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
  status="error"
  hint="Please enter a valid email."
/>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Controls ───────────────────────────────────── */}
        {dsSection === 'controls' && (
        <Section title="Controls">
          <Row label="Toggle">
            <Toggle label="Off" />
            <Toggle label="On" checked={toggleOn} onChange={e => setToggleOn(e.target.checked)} />
            <Toggle label="Disabled" disabled />
            <Toggle label="Disabled on" checked disabled onChange={() => {}} />
          </Row>
          <Row label="Checkbox">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" checked={checked} onChange={e => setChecked(e.target.checked)} />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Toggle
  label="Notifications"
  checked={on}
  onChange={e => setOn(e.target.checked)}
/>

<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
/>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Callout ────────────────────────────────────── */}
        {dsSection === 'callouts' && (
        <Section title="Callouts">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
            <Callout sentiment="success" title="Payment authorized">
              Your payment of $149.00 has been successfully authorized.
            </Callout>
            <Callout sentiment="warning" title="Verification required">
              Please verify your identity before continuing with this transaction.
            </Callout>
            <Callout sentiment="error" title="Payment failed">
              We were unable to process your payment. Please try a different card.
            </Callout>
            <Callout sentiment="informative" title="New feature">
              One-click checkout is now available for returning customers.
            </Callout>
          </div>
          <Row label="Usage">
            <CodeBlock>{`<Callout sentiment="success" title="Payment authorized">
  Your payment of $149.00 has been successfully authorized.
</Callout>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Radio ──────────────────────────────────────── */}
        {dsSection === 'radio' && (
        <Section title="Radio">
          <Row label="Sizes">
            <Radio name="r1" label="Option A" size="m" defaultChecked />
            <Radio name="r1" label="Option B" size="m" />
            <Radio name="r2" label="Small" size="s" defaultChecked />
            <Radio name="r2" label="Small unchecked" size="s" />
          </Row>
          <Row label="States">
            <Radio name="r3" label="Default" />
            <Radio name="r3" label="Checked" defaultChecked />
            <Radio name="r4" label="Disabled" disabled />
            <Radio name="r4" label="Disabled checked" disabled defaultChecked />
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Radio name="plan" label="Starter"  value="starter"  checked={plan === 'starter'}  onChange={() => setPlan('starter')} />
<Radio name="plan" label="Business" value="business" checked={plan === 'business'} onChange={() => setPlan('business')} />`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Accordion ──────────────────────────────────── */}
        {dsSection === 'accordion' && (
        <Section title="Accordion">
          <div style={{ maxWidth: 560 }}>
            <Accordion>
              <AccordionItem title="What payment methods are accepted?" defaultOpen>
                We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Bolt one-click checkout.
              </AccordionItem>
              <AccordionItem title="How does one-click checkout work?">
                Bolt stores your payment details securely so you can check out with a single click on any participating merchant site.
              </AccordionItem>
              <AccordionItem title="Is my payment information secure?">
                Yes. All payment data is encrypted and stored using PCI DSS Level 1 compliant infrastructure.
              </AccordionItem>
              <AccordionItem title="Disabled item" disabled>
                This content is not visible.
              </AccordionItem>
            </Accordion>
          </div>
          <Row label="Usage">
            <CodeBlock>{`<Accordion>
  <AccordionItem title="What payment methods are accepted?" defaultOpen>
    We accept Visa, Mastercard, Amex, PayPal, Apple Pay, and Bolt.
  </AccordionItem>
  <AccordionItem title="Is my payment information secure?">
    Yes — encrypted and PCI DSS Level 1 compliant.
  </AccordionItem>
</Accordion>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Modal ──────────────────────────────────────── */}
        {dsSection === 'modal' && (
        <Section title="Modal">
          <Row label="Trigger">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open modal</Button>
          </Row>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm payment"
            footer={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p className="text-m-regular" style={{ color: 'var(--content-secondary)' }}>
              Are you sure you want to authorize a payment of <strong>$149.00</strong> to Acme Store? This action cannot be undone.
            </p>
          </Modal>
          <Row label="Usage">
            <CodeBlock>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm payment"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
    </>
  }
>
  Are you sure you want to authorize a payment of $149.00?
</Modal>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Select ─────────────────────────────────────── */}
        {dsSection === 'select' && (
        <Section title="Select">
          <Row label="Sizes">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ width: 200 }}>
                <Select label="Medium" size="m">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </Select>
              </div>
              <div style={{ width: 180 }}>
                <Select label="Small" size="s">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </Select>
              </div>
              <div style={{ width: 160 }}>
                <Select label="XSmall" size="xs">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </Select>
              </div>
            </div>
          </Row>
          <Row label="States">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ width: 200 }}>
                <Select label="Error" status="error" hint="Selection required.">
                  <option value="">Choose...</option>
                  <option>Visa</option>
                </Select>
              </div>
              <div style={{ width: 200 }}>
                <Select label="Disabled" disabled>
                  <option>Auto-detected</option>
                </Select>
              </div>
              <div style={{ width: 200 }}>
                <Select label="Flat variant" variant="flat">
                  <option>All merchants</option>
                  <option>Active only</option>
                </Select>
              </div>
            </div>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Select
  label="Country"
  value={country}
  onChange={e => setCountry(e.target.value)}
>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</Select>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Combobox ───────────────────────────────────── */}
        {dsSection === 'combobox' && (
        <Section title="Combobox">
          <Row label="Default">
            <div style={{ width: 260 }}>
              <Combobox
                label="Currency"
                value={comboboxValue}
                onChange={setComboboxValue}
                options={[
                  { value: 'usd', label: 'USD — US Dollar' },
                  { value: 'eur', label: 'EUR — Euro' },
                  { value: 'gbp', label: 'GBP — British Pound' },
                  { value: 'jpy', label: 'JPY — Japanese Yen' },
                  { value: 'cad', label: 'CAD — Canadian Dollar' },
                ]}
              />
            </div>
          </Row>
          <Row label="Sizes">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
              <div style={{ width: 240 }}>
                <Combobox label="Medium" size="m" value="visa" onChange={() => {}} options={[
                  { value: 'visa', label: 'Visa •••• 4242' },
                  { value: 'mc', label: 'Mastercard •••• 8080' },
                ]} />
              </div>
              <div style={{ width: 200 }}>
                <Combobox label="Small" size="s" value="visa" onChange={() => {}} options={[
                  { value: 'visa', label: 'Visa •••• 4242' },
                  { value: 'mc', label: 'Mastercard •••• 8080' },
                ]} />
              </div>
            </div>
          </Row>
          <Row label="States">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ width: 240 }}>
                <Combobox label="Error" status="error" hint="Please pick a currency." value="" onChange={() => {}} options={[
                  { value: 'usd', label: 'USD' },
                  { value: 'eur', label: 'EUR' },
                ]} />
              </div>
              <div style={{ width: 240 }}>
                <Combobox label="Disabled" disabled value="usd" onChange={() => {}} options={[
                  { value: 'usd', label: 'USD' },
                ]} />
              </div>
            </div>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Combobox
  label="Currency"
  value={value}
  onChange={setValue}
  options={[
    { value: 'usd', label: 'USD — US Dollar' },
    { value: 'eur', label: 'EUR — Euro' },
  ]}
/>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Tabs ───────────────────────────────────────── */}
        {dsSection === 'tabs' && (
        <Section title="Tabs">
          <Row label="Default (underline)">
            <Tabs
              items={[
                { id: 'overview', label: 'Overview' },
                { id: 'transactions', label: 'Transactions', badge: 12 },
                { id: 'settings', label: 'Settings' },
                { id: 'logs', label: 'Logs', disabled: true },
              ]}
            />
          </Row>
          <Row label="Pill">
            <Tabs
              variant="pill"
              items={[
                { id: 'all', label: 'All' },
                { id: 'authorized', label: 'Authorized', badge: 4 },
                { id: 'failed', label: 'Failed', badge: 1 },
                { id: 'refunded', label: 'Refunded' },
              ]}
            />
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Tabs
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions', badge: 12 },
    { id: 'settings', label: 'Settings' },
  ]}
  onChange={setActiveTab}
/>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Icons ──────────────────────────────────────── */}
        {dsSection === 'icons' && (
        <Section title={`Icons (${ICON_NAMES.length})`}>
          <Row label="Sizes">
            <Icon name="bolt_icon_filled" size="xs" />
            <Icon name="bolt_icon_filled" size="s" />
            <Icon name="bolt_icon_filled" size="m" />
            <Icon name="bolt_icon_filled" size="l" />
            <Icon name="bolt_icon_filled" size="xl" />
          </Row>
          <Row label="Colors (via currentColor)">
            <span style={{ color: 'var(--content-primary)' }}><Icon name="check_circle" /></span>
            <span style={{ color: 'var(--content-success, #00ae49)' }}><Icon name="check_circle" /></span>
            <span style={{ color: 'var(--content-critical, #e62728)' }}><Icon name="x_circle" /></span>
            <span style={{ color: 'var(--content-warning, #9a6f00)' }}><Icon name="exclamation_circle" /></span>
            <span style={{ color: 'var(--content-info, #8c40f2)' }}><Icon name="i_circle" /></span>
          </Row>
          <div className="icon-grid">
            {ICON_NAMES.map(name => (
              <div key={name} className="icon-grid__cell" title={name}>
                <Icon name={name} size="l" />
                <span className="icon-grid__label text-xs-regular">{name}</span>
              </div>
            ))}
          </div>
        </Section>
        )}

        {/* ── Avatar ─────────────────────────────────────── */}
        {dsSection === 'avatar' && (
        <Section title="Avatar">
          <Row label="Sizes">
            <Avatar name="Michelle Taylor" size="xs" />
            <Avatar name="Michelle Taylor" size="s" />
            <Avatar name="Michelle Taylor" size="m" />
            <Avatar name="Michelle Taylor" size="l" />
            <Avatar name="Michelle Taylor" size="xl" />
          </Row>
          <Row label="Types">
            <Avatar name="John Smith" />
            <Avatar name="Alice B" />
            <Avatar />
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Avatar name="Michelle Taylor" size="m" />

<Avatar src="/avatars/alice.jpg" name="Alice" size="l" />`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Toast ──────────────────────────────────────── */}
        {dsSection === 'toast' && (
        <Section title="Toast">
          <Row label="Trigger">
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Changes saved', sentiment: 'default' })}>Default</Button>
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Payment authorized', sentiment: 'success' })}>Success</Button>
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Payment failed', description: 'Please try another card.', sentiment: 'error' })}>Error</Button>
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Verification needed', sentiment: 'warning' })}>Warning</Button>
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Item removed', sentiment: 'default', action: { label: 'Undo', onClick: () => {} } })}>With action</Button>
            <Button variant="secondary" size="s" onClick={() => addToast({ message: 'Session saved', sentiment: 'success', inverse: true })}>Inverse</Button>
          </Row>
          <ToastContainer toasts={toasts} onDismiss={dismissToast} />
          <Row label="Usage">
            <CodeBlock>{`const [toasts, setToasts] = useState<ToastItem[]>([]);

const addToast = (t: Omit<ToastItem, 'id'>) =>
  setToasts(prev => [...prev, { ...t, id: crypto.randomUUID() }]);

<Button onClick={() => addToast({ message: 'Payment authorized', sentiment: 'success' })}>
  Show toast
</Button>

<ToastContainer
  toasts={toasts}
  onDismiss={id => setToasts(t => t.filter(x => x.id !== id))}
/>`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Progress ───────────────────────────────────── */}
        {dsSection === 'progress' && (
        <Section title="Progress">
          <Row label="Sizes">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
              <Progress value={40} size="m" />
              <Progress value={70} size="s" />
            </div>
          </Row>
          <Row label="Sentiment">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
              <Progress value={55} sentiment="default" label="Default" showValue />
              <Progress value={80} sentiment="success" label="Success" showValue />
              <Progress value={60} sentiment="warning" label="Warning" showValue />
              <Progress value={25} sentiment="error"   label="Error"   showValue />
            </div>
          </Row>
          <Row label="Indeterminate">
            <div style={{ width: 360 }}>
              <Progress indeterminate label="Processing payment…" />
            </div>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Progress value={70} label="Uploading" showValue />

<Progress indeterminate label="Processing payment…" />`}</CodeBlock>
          </Row>
        </Section>
        )}

        {/* ── Tooltip ────────────────────────────────────── */}
        {dsSection === 'tooltip' && (
        <Section title="Tooltip">
          <Row label="Placements">
            <div style={{ display: 'flex', gap: 32, padding: '48px 24px' }}>
              <Tooltip content="Tooltip on top" placement="top">
                <Button variant="secondary" size="s">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" placement="bottom">
                <Button variant="secondary" size="s">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left" placement="left">
                <Button variant="secondary" size="s">Left</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" placement="right">
                <Button variant="secondary" size="s">Right</Button>
              </Tooltip>
            </div>
          </Row>
          <Row label="On an icon button">
            <Tooltip content="Copy to clipboard">
              <Button variant="tertiary" size="s" iconLeft={<Icon name="copy" />}>Copy</Button>
            </Tooltip>
          </Row>
          <Row label="Usage">
            <CodeBlock>{`<Tooltip content="Copy to clipboard" placement="top">
  <Button variant="tertiary">Copy</Button>
</Tooltip>`}</CodeBlock>
          </Row>
        </Section>
        )}

      </main>
      </div>
    </div>
  );
}

// ── Overview preview thumbnails ──────────────────────────────
function OverviewPreview({ id }: { id: string }) {
  switch (id) {
    case 'colors':
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          {['#11190c', '#e1ff00', '#006dff', '#e62728', '#00ae49'].map(c => (
            <div key={c} style={{ width: 24, height: 24, borderRadius: 4, background: c }} />
          ))}
        </div>
      );
    case 'typography':
      return <div className="text-h2" style={{ color: 'var(--content-primary)' }}>Aa</div>;
    case 'icons':
      return <Icon name="bolt_icon_filled" size="xl" />;
    case 'buttons':
      return <Button variant="primary" size="s">Button</Button>;
    case 'tags':
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          <Tag sentiment="success">Active</Tag>
          <Tag sentiment="neutral">Draft</Tag>
        </div>
      );
    case 'inputs':
      return <div style={{ width: 160 }}><Input placeholder="Type here" size="s" /></div>;
    case 'select':
      return <div style={{ width: 160 }}><Select size="s"><option>Option</option></Select></div>;
    case 'combobox':
      return <div style={{ width: 160, pointerEvents: 'none' }}><Combobox size="s" value="usd" onChange={() => {}} options={[{ value: 'usd', label: 'USD' }]} /></div>;
    case 'controls':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Toggle checked onChange={() => {}} />
          <Checkbox checked onChange={() => {}} />
        </div>
      );
    case 'radio':
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <Radio name="ov" defaultChecked /><Radio name="ov" />
        </div>
      );
    case 'callouts':
      return <div style={{ width: '100%' }}><Callout sentiment="informative" title="Heads up">Inline message.</Callout></div>;
    case 'accordion':
      return (
        <div style={{ width: '100%' }}>
          <Accordion><AccordionItem title="Item">...</AccordionItem></Accordion>
        </div>
      );
    case 'modal':
      return <Icon name="maximize" size="xl" />;
    case 'tabs':
      return <Tabs items={[{ id: 'a', label: 'Tab A' }, { id: 'b', label: 'Tab B' }]} />;
    case 'avatar':
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          <Avatar name="Clark C" />
          <Avatar name="Skyler S" />
        </div>
      );
    case 'toast':
      return <Icon name="notification" size="xl" />;
    case 'progress':
      return <div style={{ width: '80%' }}><Progress value={65} /></div>;
    case 'tooltip':
      return <Icon name="message" size="xl" />;
    default:
      return null;
  }
}

// ── Inline SVG icons ─────────────────────────────────────────
function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 2 4 9h5l-2 5 7-8H9l2-4Z" fill="currentColor"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
