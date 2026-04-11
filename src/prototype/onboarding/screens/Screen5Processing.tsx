import { useEffect, useState } from 'react';

interface Props {
  onDone: () => void;
}

const stages = [
  'Creating your Bolt account…',
  'Provisioning your sandbox environment…',
  'Almost there — finalizing configuration…',
];

export function Screen5Processing({ onDone }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage(s => {
        if (s >= stages.length - 1) {
          clearInterval(id);
          setTimeout(onDone, 1200);
          return s;
        }
        return s + 1;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="ob-card">
      <div className="ob-processing">
        <div className="ob-processing__spinner" />
        <p className="ob-processing__label">{stages[stage]}</p>
      </div>
    </div>
  );
}
