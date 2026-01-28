export const HostedBySection = (): JSX.Element => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gray-50 sm:rounded-xl">
      <div className="bg-[#e6eff1] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
        <h3 className="text-sm font-medium text-gray-900 sm:text-base">Hosted by</h3>
      </div>

      <div className="h-[3px] bg-white/80 sm:h-[5px]" />

      <div className="flex items-center justify-center px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5">
        <img
          src="/home/shewell-logo-2.png"
          alt="Shewell"
          className="h-12 w-auto object-contain sm:h-16 md:h-20 lg:h-24"
        />
      </div>
    </div>
  );
};
