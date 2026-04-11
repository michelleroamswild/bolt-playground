import { useEffect } from 'react';

/**
 * Bidirectional postMessage bridge between the onboarding flow (when embedded
 * in an iframe) and its parent window.
 *
 * Outbound — when the current step changes, posts:
 *   { type: 'bolt-onboarding:step', step: '0b' | 0 | 1 | 2 | 3 | 4 | 5 | 7 }
 *
 * Inbound — listens for:
 *   { type: 'bolt-onboarding:goto', step: '0b' | 0 | 1 | 2 | 3 | 4 | 5 | 7 }
 *   { type: 'bolt-onboarding:reset' }
 *
 * Parent (portfolio) usage:
 *   const iframe = document.getElementById('bolt-prototype');
 *   window.addEventListener('message', e => {
 *     if (e.data?.type === 'bolt-onboarding:step') {
 *       console.log('Visitor is on step', e.data.step);
 *     }
 *   });
 *   iframe.contentWindow.postMessage(
 *     { type: 'bolt-onboarding:goto', step: '0b' },
 *     '*'
 *   );
 */

export type OnboardingStep = '0b' | 0 | 1 | 2 | 3 | 4 | 5 | 7;

export interface IframeMessageBridge {
  step: OnboardingStep;
  onGoto: (step: OnboardingStep) => void;
  onReset: () => void;
}

const inIframe = () => {
  try {
    return window.parent !== window;
  } catch {
    return false;
  }
};

export function useIframeMessage({ step, onGoto, onReset }: IframeMessageBridge) {
  // Outbound — broadcast step changes
  useEffect(() => {
    if (!inIframe()) return;
    window.parent.postMessage(
      { type: 'bolt-onboarding:step', step },
      '*'
    );
  }, [step]);

  // Inbound — listen for parent commands
  useEffect(() => {
    if (!inIframe()) return;
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'bolt-onboarding:goto' && data.step !== undefined) {
        onGoto(data.step);
      } else if (data.type === 'bolt-onboarding:reset') {
        onReset();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onGoto, onReset]);
}
