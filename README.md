# Fully configured shadcn/ui components for Next.js Apps in a pnpm monorepo

This repository provides a fully-configured boilerplate of shadcn/ui components, including
additional custom components, optimized for use in a pnpm monorepo with Next.js.

## Features

- Includes all shadcn/ui components with minor enhancements and fixes.
- New components such as Spinner and CountryFlag.
- TypeScript, ESLint, Prettier, Tailwind CSS, Husky, and lint-staged are pre-configured.
- Resolved ESLint errors in the original shadcn/ui components.
- shadcn/ui components are organized under `src/ds` (design system), with additional components in
  `src/components`.

## Installation

1. Copy this repository into your pnpm monorepo.
2. Add it to your Next.js app's `package.json` dependencies.
   ```json
   {
     "dependencies": {
       "shadcn-ui-complete": "workspace:*"
     }
   }
   ```
3. Run `pnpm install`.
4. Import the CSS file into your Next.js app:

   ```ts
   import 'shadcn-ui-complete/styles.css';
   ```

## Changes and Enhancements

- **Blurred Backgrounds:** Popover components (e.g., context-menu, dropdown-menu, select, etc.) now
  feature a blurred background.
- **Sheet Component:** The close button is optional and can be included using the `SheetCloseX`
  component within `SheetContent`.
- **Dark Mode Support:** The Chart component uses `[data-theme="dark"]` CSS selector.
  See [Theme Configuration](#theme-configuration) for details.
- **New Main Component:** `Spinner` component is available in `src/ds/spinner`.
- **Button Enhancements:** The Button component includes new `icon` and `loading` props.
  Additionally, new `size` values (`narrow`, `narrow-sm`, and `narrow-lg`) are available to reduce
  icon horizontal padding.

  Example:

  ```tsx
  import { IconClick } from '@tabler/icons-react';
  import { Button } from 'shadcn-ui-complete/ds/button';

  export default function Page() {
    return (
      <Button size="narrow" icon={<IconClick />} loading={false}>
        Click me
      </Button>
    );
  }
  ```

## Additional Custom Components

### CountryFlag

Display country flags using a country code. Flags are sourced
from [flagcdn.com](https://flagcdn.com) (use third party CDNs with caution, it is best to host your
own assets).

Example:

```tsx
import { CountryFlag } from 'shadcn-ui-complete/components/country-flag';

export default function Page() {
  return <CountryFlag code="us" size="24x18" name="United States of America" />;
}
```

### BgDotPattern

Add a decorative dot pattern background.

Example:

```tsx
import { BgDotPattern } from 'shadcn-ui-complete/components/bg-dot-pattern';

export default function Page() {
  return <BgDotPattern>content</BgDotPattern>;
}
```

### GridView

Display items in a grid with a configurable minimum and maximum width.

Example:

```tsx
import { GridView } from 'shadcn-ui-complete/components/grid-view';

export default function Page() {
  return (
    <GridView cellMinWidth="36px" cellMaxWidth="100px">
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
      <div>item 4</div>
      <div>item 5</div>
    </GridView>
  );
}
```

### SingleAccordion

Display a single accordion for collapsible content.

Example:

```tsx
import { SingleAccordion } from 'shadcn-ui-complete/components/single-accordion';

export default function Page() {
  return (
    <SingleAccordion
      trigger={<span className="bg-muted px-4 text-sm font-bold">FAQ</span>}
      className="overflow-hidden rounded-lg"
    >
      Accordion content
    </SingleAccordion>
  );
}
```

### TwScreenIndicator

Display the current screen size (e.g., `md`, `lg`) in the corner of the screen. Include it in your
root layout component:

```tsx
// app/layout.tsx
import { TwScreenIndicator } from 'shadcn-ui-complete/components/tw-screen-indicator';

<html>
  <body id="app">
    <TwScreenIndicator />
    {children}
  </body>
</html>;
```

## Theme Configuration

- The package internally uses `ui-` prefix for Tailwind classes to avoid conflicts with classes in
  your
  main Next.js project.
- In your Next.js app, set `darkMode: ['selector', '[data-theme="dark"]']` in
  `tailwind.config.js`, and add `data-theme="dark"` to the root element when dark mode is active. We
  recommend using the `next-themes` package like this:

  ```tsx
  import { ThemeProvider as NextThemesProvider } from 'next-themes';

  <html>
    <body id="app">
      <NextThemesProvider attribute="data-theme">
        <TwScreenIndicator />
        {children}
      </NextThemesProvider>
    </body>
  </html>;
  ```

## Shared Configurations

- It’s recommended to remove Prettier, Husky, and lint-staged packages and add them to your root
  pnpm workspace `package.json` for a unified setup.
- Consider creating a separate package for shared configurations (e.g., tsconfig, eslint, tailwind)
  to use across your monorepo packages and apps.
