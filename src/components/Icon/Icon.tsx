import type { SVGAttributes } from 'react';
import clsx from 'clsx';
import type { IconName } from './icon-names';
import { ICON_NAMES } from './icon-names';
import { ICON_DATA } from './icon-data';
import './Icon.css';

export type IconSize = 'xs' | 's' | 'm' | 'l' | 'xl' | number;

const SIZE_PX: Record<Exclude<IconSize, number>, number> = {
  xs: 12,
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
};

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: IconSize;
  title?: string;
}

export function Icon({ name, size = 'l', title, className, ...rest }: IconProps) {
  const px = typeof size === 'number' ? size : SIZE_PX[size];
  const data = ICON_DATA[name];
  const viewBox = data?.viewBox ?? '0 0 24 24';

  return (
    <svg
      className={clsx('icon', className)}
      width={px}
      height={px}
      viewBox={viewBox}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + (data?.content ?? '') }}
    />
  );
}

export { ICON_NAMES };
export type { IconName };
