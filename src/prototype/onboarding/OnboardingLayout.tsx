import type { ReactNode } from 'react';
import bgTop from '../../assets/bolt-bg-top.png';
import bgBottom from '../../assets/bolt-bg-bottom.png';
import boltLogo from '../../assets/boltLogo.png';
import { Icon } from '../../components';
import './OnboardingLayout.css';

interface OnboardingLayoutProps {
  children: ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="ob-layout">
      <div className="ob-layout__bg" aria-hidden>
        <img className="ob-layout__bg-top" src={bgTop} alt="" />
        <img className="ob-layout__bg-bot" src={bgBottom} alt="" />
      </div>
      <div className="ob-layout__logo-sticky">
        <img className="ob-layout__logo" src={boltLogo} alt="Bolt" />
      </div>
      <div className="ob-layout__content">
        {children}
        <p className="ob-footer-note">
          All of the information on this form is secured using SSL and client-side encryption.
        </p>
      </div>
    </div>
  );
}

interface OnboardingCardProps {
  title: string;
  subtitle?: string;
  step?: string;
  onBack?: () => void;
  children: ReactNode;
}

export function OnboardingCard({ title, subtitle, step, onBack, children }: OnboardingCardProps) {
  const showTopbar = onBack || step;
  return (
    <div className="ob-card">
      <div className="ob-card__header">
        {showTopbar && (
          <div className="ob-card__topbar">
            {onBack ? (
              <button type="button" className="ob-card__back" onClick={onBack}>
                <Icon name="arrow_left" size="m" />
                Back
              </button>
            ) : <span />}
            {step && <span className="ob-card__step">{step}</span>}
          </div>
        )}
        <h1 className="ob-card__title">{title}</h1>
        {subtitle && <p className="ob-card__subtitle">{subtitle}</p>}
      </div>
      <div className="ob-card__body">{children}</div>
    </div>
  );
}

