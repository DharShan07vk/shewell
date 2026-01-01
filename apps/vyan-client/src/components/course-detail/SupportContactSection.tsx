interface SupportContactSectionProps {
  supportTitle: string;
  supportItems: string[];
  contactTitle: string;
  contactItems: string[];
}

export const SupportContactSection = ({
  supportTitle,
  supportItems,
  contactTitle,
  contactItems,
}: SupportContactSectionProps): JSX.Element => {
  return (
    <section className="w-full px-6 md:px-12 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Support */}
          <div className="rounded-xl overflow-hidden bg-gray-50">
            <div className="bg-[#e6eff1] px-6 py-3">
              <h3 className="text-base font-medium text-gray-900">
                {supportTitle}
              </h3>
            </div>

            <div className="h-[5px] bg-white/80" />

            <div className="px-6 py-5">
              <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                {supportItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-xl overflow-hidden bg-gray-50">
            <div className="bg-[#e6eff1] px-6 py-3">
              <h3 className="text-base font-medium text-gray-900">
                {contactTitle}
              </h3>
            </div>

            <div className="h-[5px] bg-white/80" />

            <div className="px-6 py-5">
              <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                {contactItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};