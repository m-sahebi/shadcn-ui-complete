import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '../lib-private/cn';

const spinnerVariants = cva('ui-inline-flex', {
  variants: {
    size: {
      sm: 'ui-size-5',
      default: 'ui-size-6',
      lg: 'ui-size-7',
    },
    hidden: {
      true: 'ui-hidden',
      false: 'ui-flex',
    },
  },
  defaultVariants: {
    size: 'sm',
    hidden: false,
  },
});

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  strokeWidth?: number | string;
}

export function Spinner(props: SpinnerContentProps) {
  const { size, hidden, className, strokeWidth = 2 } = props;
  return (
    <span className={cn(spinnerVariants({ size, hidden, className }))} role="status">
      <span className="sr-only">Loading</span>
      <svg
        className="ui-size-full ui-animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    </span>
  );
}
