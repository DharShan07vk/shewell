interface SessionOverviewSectionProps {
  description: string;
}

export const SessionOverviewSection = ({
  description,
}: SessionOverviewSectionProps): JSX.Element => {
  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg overflow-hidden bg-gray-50 sm:rounded-xl">
          
          {/* Header */}
          <div className="bg-[#e6eff1] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
            <h2 className="text-sm font-medium text-gray-900 sm:text-base">
              Session Overview
            </h2>
          </div>
          
          <div className="h-[3px] bg-white/80 sm:h-[5px]" />

          {/* Content */}
          <div className="px-4 py-3 bg-gray-50 sm:px-5 sm:py-4 md:px-6 md:py-5">
            <p className="text-xs text-gray-700 leading-relaxed sm:text-sm">
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};