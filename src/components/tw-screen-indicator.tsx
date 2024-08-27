export function TwScreenIndicator() {
  if (process.env.NODE_ENV === 'production') return <></>;

  return (
    <div className="ui-fixed ui-bottom-1 ui-left-1 ui-z-50 ui-flex ui-h-6 ui-w-6 ui-items-center ui-justify-center ui-rounded-full ui-bg-gray-800 ui-p-3 ui-font-mono ui-text-xs ui-text-white">
      <div className="ui-block sm:ui-hidden">xs</div>
      <div className="ui-hidden sm:ui-block md:ui-hidden">sm</div>
      <div className="ui-hidden md:ui-block lg:ui-hidden">md</div>
      <div className="ui-hidden lg:ui-block xl:ui-hidden">lg</div>
      <div className="ui-hidden xl:ui-block 2xl:ui-hidden">xl</div>
      <div className="ui-hidden 2xl:ui-block">2xl</div>
    </div>
  );
}
