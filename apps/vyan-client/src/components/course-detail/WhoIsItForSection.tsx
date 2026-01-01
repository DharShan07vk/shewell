interface WhoIsItForSectionProps {
  items: string[];
}

export const WhoIsItForSection = ({
  items,
}: WhoIsItForSectionProps): JSX.Element => {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-50">
      
      <div className="bg-[#e6eff1] px-6 py-3">
        <h3 className="text-base font-medium text-gray-900">
          Who is it for?
        </h3>
      </div>

      <div className="h-[5px] bg-white/80" />

      <div className="px-6 py-5">
        <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};