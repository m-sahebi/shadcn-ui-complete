import { cn } from '#src/lib-private/cn';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

function svgToDataUri(svgString: string): string {
  // Encode the SVG string using encodeURIComponent to ensure it's safe to include in a URI
  const encodedSvg = encodeURIComponent(svgString)
    // Replace certain characters to make it compatible with a data URI
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  // Return the Data URI format
  return `data:image/svg+xml,${encodedSvg}`;
}

const backgroundImage = ({ dotSize, color = '#000' }: { dotSize: number; color?: string }) =>
  `url(${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="${color}"><circle fill="${color}" id="pattern-circle" cx="10" cy="10" r="${dotSize}"></circle></svg>`)})`;

export const BgDot = memo(function BgDot(
  props: HTMLAttributes<HTMLDivElement> & {
    dotSize?: number;
    dotClassName?: string;
    maskClassName?: string;
  },
) {
  const { children, className, dotClassName, maskClassName, dotSize = 1.8, ...rest } = props;

  return (
    <div
      className={cn(
        'ui-relative ui-z-0 ui-flex ui-items-center ui-justify-center ui-bg-background',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'ui-pointer-events-none ui-absolute ui-inset-0 -ui-z-10 ui-opacity-30 dark:ui-hidden',
          dotClassName,
        )}
        style={{ backgroundImage: backgroundImage({ dotSize }) }}
      />
      <div
        className={cn(
          'ui-pointer-events-none ui-absolute ui-inset-0 -ui-z-10 ui-hidden ui-opacity-30 dark:ui-block',
          dotClassName,
        )}
        style={{ backgroundImage: backgroundImage({ dotSize, color: '#fff' }) }}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div
        className={cn(
          'ui-pointer-events-none ui-absolute ui-inset-0 -ui-z-10 ui-flex ui-items-center ui-justify-center ui-bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]',
          maskClassName,
        )}
      ></div>
      {children}
    </div>
  );
});
