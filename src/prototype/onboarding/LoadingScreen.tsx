import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  /** Text shown below the animated icon. */
  text?: string;
  /** Full-bleed mode — removes navy frame + white card. */
  bare?: boolean;
}

export function LoadingScreen({ text: propText, bare: propBare }: LoadingScreenProps = {}) {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [text] = useState(propText ?? params?.get('text') ?? 'Creating account');
  const bare = propBare ?? params?.get('bare') === '1';

  const [dots, setDots] = useState('');
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d.length >= 3 ? '' : d + '.')), 450);
    return () => clearInterval(id);
  }, []);

  const FILLED_PATH = 'M93 37.1217C77.9589 56.7452 65.2632 81.5589 58.6859 104H43.7977V66.8289H0C15.0411 47.2548 27.7368 22.4411 34.3142 0H49.2023V37.1217H93V37.1217Z';
  const OUTLINE_PATH = 'M46.7021 2.5V39.6221H88.0195C74.511 58.2395 63.1674 80.7501 56.8252 101.5H46.2979V64.3291H4.9873C18.4937 45.7515 29.8339 23.2456 36.1748 2.5H46.7021Z';

  return (
    <div className={`ls${bare ? ' ls--bare' : ''}`}>
      <div className="ls__card">
        <div className="ls__inner">
          <svg
            className="ls__icon"
            width="48"
            height="54"
            viewBox="0 0 93 104"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              {/* Clip rect rises from below, revealing the fill inside the bolt */}
              <clipPath id="ls-fill-clip">
                {/* Oversized + angled so the fill surface enters at a slight tilt
                    while still fully covering the bolt when in position. */}
                <rect className="ls__fill-rect" x="-60" y="0" width="220" height="140" />
              </clipPath>
            </defs>

            {/* Outline — always visible */}
            <path
              className="ls__outline"
              d={OUTLINE_PATH}
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeLinejoin="round"
            />

            {/* Fill — clipped to the rising rect */}
            <path
              d={FILLED_PATH}
              fill="currentColor"
              clipPath="url(#ls-fill-clip)"
            />
          </svg>
          <p className="ls__text">
            {text}
            <span className="ls__dots" aria-hidden>{dots}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
