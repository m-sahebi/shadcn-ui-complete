import { Slot } from '@radix-ui/react-slot';
import { cn } from '#src/lib-private/cn';

const alignClasses = {
  left: 'ui-justify-start',
  right: 'ui-justify-end',
  center: 'ui-justify-center',
};

export function Divider(
  props: React.HTMLAttributes<HTMLElement> & {
    align?: 'left' | 'right' | 'center';
    asChild?: boolean;
  },
): React.ReactElement {
  const { className, children, align, asChild, ...rest } = props;

  const Comp = asChild ? Slot : 'span';

  return (
    <div {...rest} className={cn('ui-flex', alignClasses[align ?? 'center'], className)}>
      <div
        className={cn(
          'me-2 ui-top-1/2 ui-self-center ui-border-t',
          align !== 'left' && 'ui-flex-1',
        )}
      />
      <Comp>{children}</Comp>
      <div
        className={cn(
          'ms-2 ui-top-1/2 ui-self-center ui-border-t',
          align !== 'right' && 'ui-flex-1',
        )}
      />
    </div>
  );
}
