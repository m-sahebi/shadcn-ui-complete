import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge, type twMerge } from 'tailwind-merge';

function createCustomCn(tailwindMergeFunction: typeof twMerge) {
  return (...inputs: ClassValue[]): string => {
    return tailwindMergeFunction(clsx(inputs));
  };
}

export const cn = createCustomCn(
  extendTailwindMerge({
    prefix: 'ui-',
  }),
);
