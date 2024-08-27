import { cn } from '#src/lib-private/cn';
import {
  Children,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

type Props = ComponentProps<'div'> & {
  children: ReactNode;
  cellMinWidth: string;
  cellMaxWidth?: string;
  className?: string;
  columnGap?: string;
  itemsCount?: number;
  style?: CSSProperties;
};

export function GridView(props: Props): ReactElement {
  const {
    children,
    className,
    cellMinWidth,
    cellMaxWidth,
    columnGap = '1rem',
    itemsCount,
    style,
    ...rest
  } = props;
  const count = String(itemsCount ?? Children.count(children));

  return (
    <div
      className={cn(
        'ui-grid ui-w-full ui-place-content-stretch ui-place-items-stretch ui-justify-start ui-gap-y-4',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${cellMinWidth}, 100%), ${
          cellMaxWidth ?? '1fr'
        }))`,
        maxWidth: `min(100%,calc(${count} * ${cellMinWidth} + ${columnGap} * (${count} - 1)))`,
        columnGap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
