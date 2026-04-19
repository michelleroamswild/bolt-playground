import { useEffect, useState } from 'react';
import './App.css';
import { Button, Input, Toggle, Checkbox, Radio, Tag, Callout, Modal, ToastContainer, Accordion, AccordionItem, Select, Tabs, Avatar, Icon, ICON_NAMES, Combobox, CodeBlock, Progress, Tooltip, PropsTable, Guidelines, A11yNote } from './components';
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'variant',     type: "'primary' | 'secondary' | 'tertiary'", defaultValue: "'primary'", description: 'Visual emphasis. Use primary for the main action on a surface.' },
              { name: 'size',        type: "'xs' | 's' | 'm'",                     defaultValue: "'m'",       description: 'Control height and padding.' },
              { name: 'shape',       type: "'default' | 'pill'",                   defaultValue: "'default'", description: 'Pill uses fully rounded corners.' },
              { name: 'destructive', type: 'boolean',                              defaultValue: 'false',     description: 'Applies the critical color treatment for destructive actions.' },
              { name: 'busy',        type: 'boolean',                              defaultValue: 'false',     description: 'Shows a spinner and disables interaction.' },
              { name: 'inverse',     type: 'boolean',                              defaultValue: 'false',     description: 'Recolors the button for dark backgrounds.' },
              { name: 'iconLeft',    type: 'ReactNode',                            defaultValue: '—',         description: 'Leading icon (pass a node, not a name).' },
              { name: 'iconRight',   type: 'ReactNode',                            defaultValue: '—',         description: 'Trailing icon.' },
              { name: 'fullWidth',   type: 'boolean',                              defaultValue: 'false',     description: 'Stretches to the container width.' },
              { name: 'disabled',    type: 'boolean',                              defaultValue: 'false',     description: 'Disables the button (also set by busy).' },
              { name: 'onClick',     type: '(e: MouseEvent) => void',              defaultValue: '—',         description: 'Click handler. Forwarded with all native button props.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use one primary button per surface', body: 'The primary button signals the single main action. Secondary or tertiary for everything else.' },
                { label: 'Lead with a verb in the label',     body: 'Good: "Save changes", "Pay $149.00". Avoid nouns like "Payment" or "OK".' },
                { label: 'Pair busy state with a disabled form', body: 'While the server request is in-flight, disable related inputs so users can\'t retry mid-submit.' },
              ]}
              dont={[
                { label: "Don't stack multiple primary buttons", body: 'Competing primaries make the main action ambiguous.' },
                { label: "Don't use destructive for routine saves",  body: 'Reserve the critical color for actions that delete or cannot be undone.' },
                { label: "Don't mix sizes in a single action row", body: 'Keep a row of buttons at the same size so the layout stays scannable.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Always provide a text label; for icon-only buttons, use <code>aria-label</code>.</li>
                <li>Focus ring is visible on keyboard focus — don't remove <code>:focus-visible</code> styles.</li>
                <li><code>busy</code> toggles <code>disabled</code>, which removes the button from the tab order. Announce state changes elsewhere (e.g. a toast) if the user needs confirmation.</li>
                <li>For destructive actions, consider a confirmation step (Modal) so the action can't be triggered accidentally.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'sentiment', type: "'neutral' | 'success' | 'warning' | 'error' | 'informative' | 'highlight' | 'quiet'", defaultValue: "'neutral'", description: 'Color treatment. Maps to semantic colors.' },
              { name: 'size',      type: "'s' | 'm'",  defaultValue: "'m'",   description: 'Visual density.' },
              { name: 'outline',   type: 'boolean',    defaultValue: 'false', description: 'Outlined variant — transparent fill with colored border.' },
              { name: 'inverse',   type: 'boolean',    defaultValue: 'false', description: 'Use on dark surfaces.' },
              { name: 'iconLeft',  type: 'ReactNode',  defaultValue: '—',     description: 'Leading icon.' },
              { name: 'iconRight', type: 'ReactNode',  defaultValue: '—',     description: 'Trailing icon.' },
              { name: 'children',  type: 'ReactNode',  required: true,         description: 'Label text.' },
            ]} />
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'label',     type: 'string',                       defaultValue: '—',         description: 'Visible label. Associates with the input via htmlFor.' },
              { name: 'size',      type: "'s' | 'm'",                    defaultValue: "'m'",       description: 'Control height.' },
              { name: 'variant',   type: "'outline' | 'flat'",           defaultValue: "'outline'", description: 'Border treatment. Flat is borderless, for compact layouts.' },
              { name: 'status',    type: "'default' | 'error' | 'warning'", defaultValue: "'default'", description: 'Validation state. Error/warning color the border and hint.' },
              { name: 'hint',      type: 'string',                       defaultValue: '—',         description: 'Helper text shown under the input.' },
              { name: 'iconLeft',  type: 'ReactNode',                    defaultValue: '—',         description: 'Leading icon (e.g. search).' },
              { name: 'iconRight', type: 'ReactNode',                    defaultValue: '—',         description: 'Trailing icon.' },
              { name: 'disabled',  type: 'boolean',                      defaultValue: 'false',     description: 'Disables the input.' },
              { name: '...rest',   type: 'InputHTMLAttributes',          defaultValue: '—',         description: 'All native input props (value, onChange, type, placeholder, etc.) are forwarded.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Write clear, short labels', body: 'Prefer "Email" over "Please enter your email address".' },
                { label: 'Use hints for format cues', body: 'e.g. "We\'ll never share this" or "4 digits".' },
                { label: 'Set status="error" only after submit', body: 'Don\'t mark a field as invalid while the user is still typing.' },
              ]}
              dont={[
                { label: "Don't rely on placeholder as the label",  body: 'Placeholder disappears on input, which breaks screen-reader flow and memory.' },
                { label: "Don't combine error + warning states",     body: 'Pick the more important one — error wins.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Always pair each input with a <code>label</code>. If the label is visually hidden, pass an <code>aria-label</code>.</li>
                <li>When <code>status="error"</code>, include a <code>hint</code> that names the problem — screen readers announce it via the label's description.</li>
                <li>Focus state uses <code>:focus-visible</code> — don't override with <code>outline: none</code>.</li>
              </ul>
            </A11yNote>
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
          <Row label="Toggle props">
            <PropsTable rows={[
              { name: 'label',    type: 'string',              defaultValue: '—',     description: 'Visible label associated with the control.' },
              { name: 'checked',  type: 'boolean',             defaultValue: '—',     description: 'Controlled on/off state.' },
              { name: 'onChange', type: '(e: ChangeEvent) => void', defaultValue: '—', description: 'Fires on user toggle.' },
              { name: 'disabled', type: 'boolean',             defaultValue: 'false', description: 'Disables interaction.' },
              { name: '...rest',  type: 'InputHTMLAttributes', defaultValue: '—',     description: 'Native input props forwarded. Role is set to "switch".' },
            ]} />
          </Row>
          <Row label="Checkbox props">
            <PropsTable rows={[
              { name: 'label',        type: 'ReactNode',           defaultValue: '—',     description: 'Visible label.' },
              { name: 'size',         type: "'s' | 'm'",           defaultValue: "'m'",   description: 'Box size.' },
              { name: 'checked',      type: 'boolean',             defaultValue: '—',     description: 'Controlled checked state.' },
              { name: 'indeterminate',type: 'boolean',             defaultValue: 'false', description: 'Visually shows a dash — e.g. for "some items selected".' },
              { name: 'onChange',     type: '(e: ChangeEvent) => void', defaultValue: '—', description: 'Fires on user toggle.' },
              { name: 'disabled',     type: 'boolean',             defaultValue: 'false', description: 'Disables interaction.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use Toggle for instant-commit settings',  body: 'e.g. "Enable notifications" — the change takes effect immediately.' },
                { label: 'Use Checkbox for form-committed choices', body: 'e.g. terms agreement, opt-ins inside a form that submits on Save.' },
              ]}
              dont={[
                { label: "Don't wrap a Toggle in Save/Cancel",        body: 'Toggle implies immediate effect; deferring it confuses users.' },
                { label: "Don't use a Checkbox for binary app state", body: 'A toggle is clearer for on/off switches.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Toggle uses <code>role="switch"</code> so it's announced as "Switch, off/on".</li>
                <li>Both controls use a <code>&lt;label&gt;</code> wrapper so clicking the label also activates the control.</li>
                <li>Indeterminate state on checkbox is purely visual; <code>aria-checked="mixed"</code> is announced by screen readers.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'sentiment', type: "'success' | 'warning' | 'error' | 'informative'", required: true, description: 'Semantic color and default icon.' },
              { name: 'layout',    type: "'inline' | 'flush'",                              defaultValue: "'inline'", description: 'Inline is padded+bordered; flush removes the outer chrome for embedding inside other containers.' },
              { name: 'title',     type: 'string',                                         defaultValue: '—',        description: 'Optional bold headline above the message.' },
              { name: 'icon',      type: 'ReactNode',                                      defaultValue: 'sentiment default', description: 'Override the leading icon.' },
              { name: 'action',    type: 'ReactNode',                                      defaultValue: '—',        description: 'Trailing action — typically a Button or link.' },
              { name: 'children',  type: 'ReactNode',                                      required: true,           description: 'Message body.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Match sentiment to severity',     body: 'Error for failures, warning for risk, informative for context, success for confirmation.' },
                { label: 'Keep messages short and scannable', body: 'Lead with what happened, follow with what to do next.' },
              ]}
              dont={[
                { label: "Don't use error sentiment for validation hints on inputs", body: 'Use the Input hint with status="error" — keep field-level errors near the field.' },
                { label: "Don't stack multiple callouts",    body: 'Collapse related messages into a single callout or a toast queue.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Renders with <code>role="alert"</code> so assistive tech announces the message when it appears.</li>
                <li>For status that doesn't need interrupt-level announcement, wrap the content in a plain container instead.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'label',    type: 'ReactNode',           defaultValue: '—',     description: 'Option label.' },
              { name: 'name',     type: 'string',              required: true,        description: 'Group name — all radios in a single choice must share this.' },
              { name: 'value',    type: 'string',              defaultValue: '—',     description: 'The option value that becomes the form value when selected.' },
              { name: 'size',     type: "'s' | 'm'",           defaultValue: "'m'",   description: 'Control size.' },
              { name: 'checked',  type: 'boolean',             defaultValue: '—',     description: 'Controlled checked state.' },
              { name: 'onChange', type: '(e: ChangeEvent) => void', defaultValue: '—', description: 'Fires on selection.' },
              { name: 'disabled', type: 'boolean',             defaultValue: 'false', description: 'Disables the option.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use radios for 2–5 mutually-exclusive options', body: 'Above 5, use a Select or Combobox.' },
                { label: 'Always preselect a sensible default',           body: 'Avoid a state where no option is chosen unless the form allows "none".' },
              ]}
              dont={[
                { label: "Don't use radios for independent toggles", body: 'Use checkboxes or toggles when options can be chosen independently.' },
                { label: "Don't mix radio groups without labels",     body: 'Group related radios under a visible legend.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Arrow keys move between radios in a group — don't disable this native behavior.</li>
                <li>Wrap related radios in a <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> so screen readers announce the group label.</li>
              </ul>
            </A11yNote>
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
          <Row label="AccordionItem props">
            <PropsTable rows={[
              { name: 'title',       type: 'string',        required: true,         description: 'Header text. Rendered as the toggle button.' },
              { name: 'defaultOpen', type: 'boolean',       defaultValue: 'false',  description: 'Open on first render. Each item manages its own state.' },
              { name: 'disabled',    type: 'boolean',       defaultValue: 'false',  description: 'Prevents interaction and visually dims the item.' },
              { name: 'size',        type: "'s' | 'm'",     defaultValue: "'m'",    description: 'Header density.' },
              { name: 'children',    type: 'ReactNode',     required: true,         description: 'Body content, revealed when open.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for optional / secondary content', body: 'FAQs, advanced settings, progressive disclosure.' },
                { label: 'Write scannable titles',                body: 'The user should know what\'s inside before opening.' },
              ]}
              dont={[
                { label: "Don't hide critical content",           body: 'If the user must see it, show it inline.' },
                { label: "Don't nest accordions more than one level", body: 'Nested accordions make the content hierarchy confusing.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>The header button uses <code>aria-expanded</code> and <code>aria-controls</code> to link to its panel.</li>
                <li>The panel is hidden via the <code>hidden</code> attribute when closed — assistive tech skips it.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'open',     type: 'boolean',      required: true,        description: 'Whether the modal is shown.' },
              { name: 'onClose',  type: '() => void',   required: true,        description: 'Called when the user dismisses the modal (backdrop click, Escape, close button).' },
              { name: 'title',    type: 'string',       defaultValue: '—',     description: 'Modal heading. Anchors the dialog semantically.' },
              { name: 'footer',   type: 'ReactNode',    defaultValue: '—',     description: 'Usually one or two buttons — cancel / primary action.' },
              { name: 'size',     type: "'s' | 'm' | 'l'", defaultValue: "'m'", description: 'Dialog width.' },
              { name: 'children', type: 'ReactNode',    required: true,        description: 'Body content.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for decisions the user must make',        body: 'Confirming a destructive action, choosing between options, entering a short form.' },
                { label: 'Offer a clear primary + cancel',              body: 'Users should always have a "get out of here" path.' },
              ]}
              dont={[
                { label: "Don't stack modals",                          body: 'A modal opening another modal is a sign the flow should be a full page.' },
                { label: "Don't use for long content",                   body: 'If the body needs scrolling beyond the viewport, consider a full page or drawer.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Built on native <code>&lt;dialog&gt;</code> with <code>showModal()</code>: focus is trapped, and Escape closes automatically.</li>
                <li>The <code>title</code> prop becomes the accessible name of the dialog — always provide one.</li>
                <li>Clicking the backdrop closes the modal; be careful this isn't destructive mid-flow.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'label',       type: 'string',                         defaultValue: '—',         description: 'Visible label.' },
              { name: 'size',        type: "'xs' | 's' | 'm'",               defaultValue: "'m'",       description: 'Control height.' },
              { name: 'variant',     type: "'outline' | 'flat'",             defaultValue: "'outline'", description: 'Border treatment.' },
              { name: 'status',      type: "'default' | 'error' | 'warning'", defaultValue: "'default'", description: 'Validation state.' },
              { name: 'placeholder', type: 'string',                         defaultValue: '—',         description: 'Disabled first option shown when nothing is selected.' },
              { name: 'hint',        type: 'string',                         defaultValue: '—',         description: 'Helper text below the select.' },
              { name: 'disabled',    type: 'boolean',                        defaultValue: 'false',     description: 'Disables the control.' },
              { name: '...rest',     type: 'SelectHTMLAttributes',           defaultValue: '—',         description: 'All native select props (value, onChange) are forwarded.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for 5+ options where search is overkill', body: 'Country, currency, plan tier, etc.' },
                { label: 'Sort options predictably',                    body: 'Alphabetically, or by frequency of use — not randomly.' },
              ]}
              dont={[
                { label: "Don't use for 2–5 options",    body: 'Radio is clearer when the set is small and visible.' },
                { label: "Don't use without a default or placeholder", body: 'An empty select gives no cue to what\'s inside.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              Renders a native <code>&lt;select&gt;</code> — keyboard, touch, and screen-reader behavior come from the browser. If you need custom option rendering (icons, descriptions), use <code>Combobox</code> instead.
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'label',       type: 'string',                             defaultValue: '—',       description: 'Visible label.' },
              { name: 'value',       type: 'string',                             required: true,          description: 'Currently-selected option value.' },
              { name: 'onChange',    type: '(value: string) => void',            required: true,          description: 'Called with the chosen option value.' },
              { name: 'options',     type: '{ value: string; label: string; leadingIcon?: ReactNode }[]', required: true, description: 'Selectable options.' },
              { name: 'placeholder', type: 'string',                             defaultValue: "'Select...'", description: 'Trigger text when no option is selected.' },
              { name: 'size',        type: "'m' | 's'",                          defaultValue: "'m'",     description: 'Control height.' },
              { name: 'status',      type: "'default' | 'error' | 'warning'",    defaultValue: "'default'", description: 'Validation state.' },
              { name: 'hint',        type: 'string',                             defaultValue: '—',       description: 'Helper text.' },
              { name: 'disabled',    type: 'boolean',                            defaultValue: 'false',   description: 'Disables the trigger.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for lists that benefit from rich options', body: 'Icons, prices, metadata per option — things native select can\'t show.' },
                { label: 'Keep the option set bounded',                  body: 'Under ~50 items. Beyond that, add search/async loading.' },
              ]}
              dont={[
                { label: "Don't use when native Select suffices",        body: 'Native select is faster, simpler, and better on mobile.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Trigger uses <code>aria-expanded</code> + <code>aria-controls</code>. Popover renders in a portal with <code>role="listbox"</code>.</li>
                <li>Arrow keys navigate options; Enter/Space commits; Escape closes.</li>
                <li>Focus returns to the trigger after close.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'items',      type: 'TabItem[]',               required: true,         description: 'Each item has id, label, optional badge, disabled, and content.' },
              { name: 'defaultTab', type: 'string',                  defaultValue: 'first item\'s id', description: 'id of the tab to show initially.' },
              { name: 'variant',    type: "'default' | 'pill'",      defaultValue: "'default'", description: 'Underline tabs (default) or pill tabs.' },
              { name: 'onChange',   type: '(id: string) => void',    defaultValue: '—',      description: 'Called when the user selects a tab.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for sibling views within a page', body: 'Overview / Transactions / Settings on a merchant dashboard.' },
                { label: 'Keep labels one or two words',        body: 'Tabs are scanned, not read.' },
              ]}
              dont={[
                { label: "Don't use for wizards",                body: 'Wizards have a forward-only flow — use a Stepper instead.' },
                { label: "Don't use more than ~5 tabs",          body: 'Overflow hides content; a sidenav is better.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Each tab uses <code>role="tab"</code> with <code>aria-selected</code>; panels use <code>role="tabpanel"</code>.</li>
                <li>Consider adding left/right arrow key navigation between tabs in a future pass.</li>
              </ul>
            </A11yNote>
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
          <Row label="Usage">
            <CodeBlock>{`<Icon name="bolt_icon_filled" size="l" />

{/* Decorative vs. informative */}
<Icon name="search" />                          {/* hidden from screen readers */}
<Icon name="search" title="Search" />           {/* announced as "Search" */}`}</CodeBlock>
          </Row>
          <Row label="Props">
            <PropsTable rows={[
              { name: 'name',  type: 'IconName',                         required: true,    description: 'One of the generated icon names. Typed — invalid names are a compile error.' },
              { name: 'size',  type: "'xs' | 's' | 'm' | 'l' | 'xl' | number", defaultValue: "'l'", description: 'One of the preset sizes, or an explicit pixel value.' },
              { name: 'title', type: 'string',                           defaultValue: '—', description: 'Accessible name. When provided, the icon is announced; otherwise it\'s hidden from screen readers.' },
              { name: '...rest', type: 'SVGAttributes',                  defaultValue: '—', description: 'Native SVG props forwarded (className, style, etc.).' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Set title only when the icon carries meaning', body: 'Standalone icons (an icon-only button) need a title or parent aria-label.' },
                { label: 'Inherit color from the parent',                body: 'Icons use <code>currentColor</code> so wrapping them in a colored element re-tints them.' },
              ]}
              dont={[
                { label: "Don't set title on decorative icons",          body: 'A heart next to "Favorites" label is decoration — don\'t double-announce it.' },
              ]}
            />
          </Row>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'name', type: 'string',                         defaultValue: '—',   description: 'Full name — used for initials fallback and as the accessible label.' },
              { name: 'src',  type: 'string',                         defaultValue: '—',   description: 'Image URL. When provided, the image is rendered instead of initials.' },
              { name: 'size', type: "'xs' | 's' | 'm' | 'l' | 'xl'",  defaultValue: "'m'", description: 'Avatar diameter.' },
              { name: 'icon', type: 'ReactNode',                      defaultValue: '—',   description: 'Icon fallback when there\'s no image and no name.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Always pass a name',        body: 'It drives the initials fallback and the ARIA label.' },
                { label: 'Prefer images over initials', body: 'If a headshot exists, show it.' },
              ]}
              dont={[
                { label: "Don't use Avatar for brand logos", body: 'Use an <Icon /> or <img> for logos so they don\'t get cropped into a circle.' },
              ]}
            />
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
          <Row label="Toast props">
            <PropsTable rows={[
              { name: 'message',     type: 'string',                                       required: true,        description: 'Short, single-line message.' },
              { name: 'description', type: 'string',                                       defaultValue: '—',     description: 'Secondary line with more context.' },
              { name: 'sentiment',   type: "'default' | 'success' | 'error' | 'warning'",  defaultValue: "'default'", description: 'Color + icon treatment.' },
              { name: 'action',      type: '{ label: string; onClick: () => void }',       defaultValue: '—',     description: 'Inline action (e.g. Undo).' },
              { name: 'duration',    type: 'number',                                       defaultValue: '4000',  description: 'ms before auto-dismiss. 0 = persistent.' },
              { name: 'inverse',     type: 'boolean',                                      defaultValue: 'false', description: 'Dark-surface treatment.' },
              { name: 'onDismiss',   type: '() => void',                                   defaultValue: '—',     description: 'Called when the toast should go away (timeout or close click).' },
            ]} />
          </Row>
          <Row label="ToastContainer props">
            <PropsTable rows={[
              { name: 'toasts',    type: 'ToastItem[]',            required: true, description: 'Array of toasts to render. Each needs a stable id.' },
              { name: 'onDismiss', type: '(id: string) => void',   required: true, description: 'Called when an individual toast dismisses.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use for transient confirmations', body: '"Payment authorized", "Changes saved", "Item removed".' },
                { label: 'Include an Undo action for destructive toasts', body: 'Gives users a recovery path without a modal.' },
              ]}
              dont={[
                { label: "Don't use for errors that need action", body: 'If the user must do something, use a Callout or Modal.' },
                { label: "Don't stack too many at once",          body: 'Queue them; show one or two max.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>Each toast uses <code>role="status"</code> with <code>aria-live="polite"</code> — non-interrupting announcements.</li>
                <li>For critical errors, reconsider a toast and use a Callout or Modal so the user can't miss it.</li>
              </ul>
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'value',         type: 'number',                                         defaultValue: '0',        description: 'Current value (0 to max).' },
              { name: 'max',           type: 'number',                                         defaultValue: '100',      description: 'Maximum value.' },
              { name: 'size',          type: "'s' | 'm'",                                      defaultValue: "'m'",      description: 'Track height.' },
              { name: 'sentiment',     type: "'default' | 'success' | 'warning' | 'error'",   defaultValue: "'default'", description: 'Fill color.' },
              { name: 'indeterminate', type: 'boolean',                                        defaultValue: 'false',    description: 'Animated shimmer when the progress amount is unknown.' },
              { name: 'label',         type: 'string',                                         defaultValue: '—',        description: 'Label above the track — also used as aria-label.' },
              { name: 'showValue',     type: 'boolean',                                        defaultValue: 'false',    description: 'Show the percentage next to the label.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use indeterminate when duration is unknown', body: 'Network requests, background jobs that don\'t report progress.' },
                { label: 'Pair with a label that describes the task',  body: '"Uploading…", "Processing payment…"' },
              ]}
              dont={[
                { label: "Don't use a determinate bar if the value can jump back", body: 'Progress should move forward; if it can reset, use indeterminate.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              Renders with <code>role="progressbar"</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-valuenow</code> (omitted when indeterminate). The <code>label</code> prop becomes the accessible name.
            </A11yNote>
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
          <Row label="Props">
            <PropsTable rows={[
              { name: 'content',   type: 'ReactNode',                             required: true,    description: 'Tooltip body.' },
              { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'",  defaultValue: "'top'", description: 'Which side the bubble appears on.' },
              { name: 'children',  type: 'ReactNode',                             required: true,    description: 'The trigger — anything focusable.' },
            ]} />
          </Row>
          <Row label="Guidelines">
            <Guidelines
              do={[
                { label: 'Use to clarify icon-only controls', body: 'Icon buttons with no visible label are a primary tooltip use case.' },
                { label: 'Keep content short',                 body: 'A few words, not sentences.' },
              ]}
              dont={[
                { label: "Don't put essential info in a tooltip", body: 'Tooltips disappear and don\'t work on touch devices — don\'t rely on them for critical instructions.' },
                { label: "Don't include interactive elements",    body: 'Buttons or links inside a tooltip can\'t be reliably reached by keyboard or screen reader.' },
              ]}
            />
          </Row>
          <Row label="Accessibility">
            <A11yNote>
              <ul>
                <li>The tooltip is linked to the trigger via <code>aria-describedby</code>; screen readers read it after the control.</li>
                <li>Shows on hover and on keyboard focus. Touch devices get no hover — ensure the information is available another way.</li>
              </ul>
            </A11yNote>
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
