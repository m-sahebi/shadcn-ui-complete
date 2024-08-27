import { Slot, Slottable } from '@radix-ui/react-slot';
import { Spinner } from '#src/ds/spinner';
import { cn } from '#src/lib-private/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'ui-relative ui-gap-x-2 ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-transition-colors-opacity focus-visible:ui-outline-none focus-visible:ui-ring-1 focus-visible:ui-ring-ring',
  {
    variants: {
      variant: {
        default: 'ui-bg-primary ui-text-primary-foreground ui-shadow hover:ui-bg-primary/90',
        destructive:
          'ui-bg-destructive ui-text-destructive-foreground ui-shadow-sm hover:ui-bg-destructive/90',
        outline:
          'ui-border ui-border-input ui-bg-background ui-shadow-sm hover:ui-bg-accent hover:ui-text-accent-foreground',
        secondary:
          'ui-bg-secondary ui-text-secondary-foreground ui-shadow-sm hover:ui-bg-secondary/80',
        ghost: 'hover:ui-bg-accent hover:ui-text-accent-foreground',
        link: 'ui-text-primary ui-underline-offset-4 hover:ui-underline',
      },
      size: {
        default: 'ui-h-9 ui-px-4 ui-py-2',
        sm: 'ui-h-8 ui-rounded-md ui-px-3 ui-text-xs',
        lg: 'ui-h-10 ui-rounded-md ui-px-8',
        icon: 'ui-h-9 ui-w-9',
        narrow: 'ui-h-9 ui-px-2.5 ui-py-2',
        'narrow-sm': 'ui-h-8 ui-rounded-md ui-px-2.5 ui-text-xs',
        'narrow-lg': 'ui-h-10 ui-rounded-md ui-px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const iconVariants = cva(
  'ui-inline-flex ui-relative ui-flex-shrink-0 ui-items-center ui-justify-center ui-whitespace-nowrap ui-transition-all',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        outline: '',
        secondary: '',
        ghost: '',
        link: '',
      },
      size: {
        default: 'ui-size-4.5',
        sm: 'ui-size-4',
        lg: 'ui-size-5',
        icon: 'ui-size-4.5',
        narrow: 'ui-size-4.5',
        'narrow-sm': 'ui-size-4',
        'narrow-lg': 'ui-size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconCLassName?: string;
  loading?: boolean;
  spinnerClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      icon,
      iconCLassName,
      loading,
      disabled,
      spinnerClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'ui-pointer-events-none',
          disabled && 'ui-pointer-events-none ui-opacity-50',
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        <span
          className={cn(
            iconVariants({ variant, size }),
            !(loading || icon) && '-ui-me-2 ui-size-0',
            iconCLassName,
          )}
        >
          <Slot
            className={cn(
              'ui-size-full ui-rotate-0 ui-scale-100 ui-transition-transform ui-duration-300',
              loading && '-ui-rotate-90 ui-scale-0',
            )}
          >
            {icon}
          </Slot>
          <Spinner
            className={cn(
              'ui-absolute ui-size-full ui-rotate-90 ui-scale-0 ui-transition-transform ui-duration-300',
              loading && 'ui-rotate-0 ui-scale-100',
              spinnerClassName,
            )}
          />
        </span>
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
