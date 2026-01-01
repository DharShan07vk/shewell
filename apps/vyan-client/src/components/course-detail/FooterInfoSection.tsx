import { HostedBySection } from "@/components/course-detail/HostedBySection";
import { TermsConditionsSection } from "@/components/course-detail/TermsConditionsSection";

interface FooterInfoSectionProps {
  terms: string[];
}

export const FooterInfoSection = ({
  terms,
}: FooterInfoSectionProps): JSX.Element => {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <HostedBySection />
          <TermsConditionsSection terms={terms} />
        </div>
      </div>
    </section>
  );
};
