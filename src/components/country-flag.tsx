import { type ReactElement } from 'react';

const COUNTRY_FLAG_SIZES = [
  '16x12',
  '20x15',
  '24x18',
  '28x21',
  '32x24',
  '36x27',
  '40x30',
  '48x36',
  '56x42',
  '60x45',
  '64x48',
  '72x54',
  '80x60',
  '84x63',
  '96x72',
  '108x81',
  '112x84',
  '120x90',
  '128x96',
  '144x108',
  '160x120',
  '192x144',
  '224x168',
  '256x192',
] as const;
export type CountryFlagSize = (typeof COUNTRY_FLAG_SIZES)[number];

function getCountryFlagSize2xIdx(flagIdx: number): number {
  return Math.min(flagIdx + 5, COUNTRY_FLAG_SIZES.length - 1);
}

function getCountryFlagSize3xIdx(flagIdx: number): number {
  return Math.min(flagIdx + 5, COUNTRY_FLAG_SIZES.length - 1);
}

export function CountryFlag(props: {
  code: string;
  className?: string;
  size: CountryFlagSize;
  name: string | undefined;
}): ReactElement {
  const { className, size, name } = props;
  const code = props.code.toLowerCase();
  const flagIdx = COUNTRY_FLAG_SIZES.indexOf(size);
  if (flagIdx === -1) throw new Error('Invalid country flag size');
  const size2x = COUNTRY_FLAG_SIZES[getCountryFlagSize2xIdx(flagIdx)];
  const size3x = COUNTRY_FLAG_SIZES[getCountryFlagSize3xIdx(flagIdx)];
  const [w, h] = size.split('x');

  return (
    <picture title={name}>
      <source
        type="image/webp"
        srcSet={`https://flagcdn.com/${size}/${code}.webp,
          https://flagcdn.com/${size2x}/${code}.webp 2x,
          https://flagcdn.com/${size3x}/${code}.webp 3x`}
      />
      <source
        type="image/png"
        srcSet={`https://flagcdn.com/16x12/${code}.png,
          https://flagcdn.com/${size2x}/${code}.png 2x,
          https://flagcdn.com/${size3x}/${code}.png 3x`}
      />
      <img
        src={`https://flagcdn.com/${size}/${code}.png`}
        width={w}
        height={h}
        alt={`${code} flag`}
        className={className}
      />
    </picture>
  );
}
