interface SessionOverviewSectionProps {
  description: string;
}

export const SessionOverviewSection = ({
  description,
}: SessionOverviewSectionProps): JSX.Element => {
  return (
    <section className="w-full px-6 md:px-12 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-xl overflow-hidden bg-gray-50">
          
          {/* Header */}
          <div className="bg-[#e6eff1] px-6 py-3">
            <h2 className="text-base font-medium text-gray-900">
              Session Overview
            </h2>
          </div>
          
          <div className="h-[5px] bg-white/80" />

          {/* Content */}
          <div className="px-6 py-5 bg-gray-50">
            <p className="text-gray-700 leading-relaxed text-sm">
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};