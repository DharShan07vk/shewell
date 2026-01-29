interface TermsConditionsSectionProps {
  terms: string[];
}

export const TermsConditionsSection = ({
  terms,
}: TermsConditionsSectionProps): JSX.Element => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-50 sm:rounded-xl">
      
      <div className="bg-[#e6eff1] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
        <h3 className="text-sm font-medium text-gray-900 sm:text-base">
          Terms & Conditions
        </h3>
      </div>

      <div className="h-[3px] bg-white/80 sm:h-[5px]" />

      <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5">
        <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside sm:space-y-3 sm:text-sm">
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};