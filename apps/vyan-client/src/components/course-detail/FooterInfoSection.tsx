import { HostedBySection } from "@/components/course-detail/HostedBySection";
import { TermsConditionsSection } from "@/components/course-detail/TermsConditionsSection";

interface FooterInfoSectionProps {
  terms: string[];
}

export const FooterInfoSection = ({
  terms,
}: FooterInfoSectionProps): JSX.Element => {
  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 md:gap-8">
          <HostedBySection />
          <TermsConditionsSection terms={terms} />
        </div>
      </div>
    </section>
  );
};
