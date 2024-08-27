import { Slottable } from '@radix-ui/react-slot';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#src/ds/accordion';
import { cn } from '#src/lib-private/cn';
import type { ReactElement } from 'react';

export function SingleAccordion(props: {
  children: ReactElement;
  trigger: ReactElement;
  className?: string;
  innerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}): ReactElement {
  const {
    children,
    trigger,
    className,
    innerClassName,
    open,
    onOpenChange,
    defaultOpen = true,
  } = props;

  return (
    <Accordion
      value={open ? 'auto' : open === false ? '' : undefined}
      onValueChange={(v) => {
        onOpenChange?.(v === 'auto');
      }}
      type="single"
      collapsible
      className={className}
      defaultValue={defaultOpen ? 'auto' : undefined}
    >
      <AccordionItem value="auto" className={cn('ui-border-none', innerClassName)}>
        <AccordionTrigger asChild className="ui-font-foreground ui-text-sm">
          <Slottable>{trigger}</Slottable>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
