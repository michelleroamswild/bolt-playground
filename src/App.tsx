import { useState } from 'react';
import './App.css';
import { Button, Input, Toggle, Checkbox, Radio, Tag, Callout, Modal, ToastContainer, Accordion, AccordionItem, Select, Tabs, Avatar, Icon, ICON_NAMES } from './components';
import type { ToastItem } from './components';
import { Prototype } from './prototype/Prototype';
import { OnboardingFlow } from './prototype/onboarding/OnboardingFlow';

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

// ── App ─────────────────────────────────────────────────────
export default function App() {
  const initialHash = window.location.hash;
  const [mode, setMode] = useState<'ds' | 'prototype' | 'onboarding'>(
    initialHash === '#onboarding'
      ? 'onboarding'
      : initialHash.startsWith('#prototype') || initialHash === '#edit-branding'
        ? 'prototype'
        : 'ds'
  );
  const [toggleOn, setToggleOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (props: Omit<ToastItem, 'id'>) =>
    setToasts(t => [...t, { ...props, id: Math.random().toString(36).slice(2) }]);
  const dismissToast = (id: string) =>
    setToasts(t => t.filter(x => x.id !== id));

  if (mode === 'prototype') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="ds-mode-bar">
          <Button variant="tertiary" size="xs" onClick={() => { window.location.hash = ''; setMode('ds'); }}>← Design System</Button>
          <span className="text-xs-medium ds-mode-bar__label">Bolt Configuration — Prototype</span>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Prototype />
        </div>
      </div>
    );
  }

  if (mode === 'onboarding') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="ds-mode-bar">
          <Button variant="tertiary" size="xs" onClick={() => { window.location.hash = ''; setMode('ds'); }}>← Design System</Button>
          <span className="text-xs-medium ds-mode-bar__label">Onboarding Acceleration — Prototype</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <OnboardingFlow />
        </div>
      </div>
    );
  }

  return (
    <div className="ds-app">
      {/* Header */}
      <header className="ds-header">
        <div className="ds-header__inner">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Bolt">
            <rect width="32" height="32" rx="8" fill="#11190c"/>
            <path d="M18 6 9 18h8l-3 8 12-14h-8l3-8Z" fill="#e1ff00"/>
          </svg>
          <span className="text-h3">Blitz Design System</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="s" onClick={() => { window.location.hash = 'onboarding'; setMode('onboarding'); }}>Onboarding Flow →</Button>
            <Button variant="primary" size="s" onClick={() => { window.location.hash = 'prototype'; setMode('prototype'); }}>View Prototype →</Button>
          </div>
        </div>
      </header>

      <main className="ds-main">

        {/* ── Colors ─────────────────────────────────────── */}
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

        {/* ── Typography ─────────────────────────────────── */}
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

        {/* ── Buttons ────────────────────────────────────── */}
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
        </Section>

        {/* ── Tags ───────────────────────────────────────── */}
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
        </Section>

        {/* ── Inputs ─────────────────────────────────────── */}
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
        </Section>

        {/* ── Controls ───────────────────────────────────── */}
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
        </Section>

        {/* ── Callout ────────────────────────────────────── */}
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
        </Section>

        {/* ── Radio ──────────────────────────────────────── */}
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
        </Section>

        {/* ── Accordion ──────────────────────────────────── */}
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
        </Section>

        {/* ── Modal ──────────────────────────────────────── */}
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
        </Section>

        {/* ── Select ─────────────────────────────────────── */}
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
        </Section>

        {/* ── Tabs ───────────────────────────────────────── */}
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
        </Section>

        {/* ── Icons ──────────────────────────────────────── */}
        <Section title={`Icons (${ICON_NAMES.length})`}>
          <Row label="Sizes">
            <Icon name="bolt" size="xs" />
            <Icon name="bolt" size="s" />
            <Icon name="bolt" size="m" />
            <Icon name="bolt" size="l" />
            <Icon name="bolt" size="xl" />
          </Row>
          <Row label="Colors (via currentColor)">
            <span style={{ color: 'var(--content-primary)' }}><Icon name="check_circle" /></span>
            <span style={{ color: 'var(--content-success, #00ae49)' }}><Icon name="check_circle" /></span>
            <span style={{ color: 'var(--content-critical, #e62728)' }}><Icon name="x_circle" /></span>
            <span style={{ color: 'var(--content-warning, #9a6f00)' }}><Icon name="semantic_warning" /></span>
            <span style={{ color: 'var(--content-info, #8c40f2)' }}><Icon name="semantic_info" /></span>
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

        {/* ── Avatar ─────────────────────────────────────── */}
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
        </Section>

        {/* ── Toast ──────────────────────────────────────── */}
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
        </Section>

      </main>
    </div>
  );
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
