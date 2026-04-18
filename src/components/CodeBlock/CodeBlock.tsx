import { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './CodeBlock.css';

export interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ children, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — fall through */
    }
  };

  return (
    <div className={clsx('code-block', className)}>
      <div className="code-block__header">
        <span className="code-block__language text-xs-regular">{language}</span>
        <button type="button" className="code-block__copy" onClick={copy} aria-label="Copy code">
          <Icon name={copied ? 'checkmark' : 'copy'} size="s" />
          <span className="text-xs-medium">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="code-block__pre">
        <code>{children}</code>
      </pre>
    </div>
  );
}
