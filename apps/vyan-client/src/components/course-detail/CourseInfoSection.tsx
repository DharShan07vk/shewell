import { WhoIsItForSection } from "@/components/course-detail/WhoIsItForSection";
import { WhatYouLearnSection } from "@/components/course-detail/WhatYouLearnSection";

interface CourseInfoSectionProps {
  whoIsItFor: string[];
  whatYouLearn: string[];
}

export const CourseInfoSection = ({
  whoIsItFor,
  whatYouLearn,
}: CourseInfoSectionProps): JSX.Element => {
  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 md:gap-8">
          <WhoIsItForSection items={whoIsItFor} />
          <WhatYouLearnSection items={whatYouLearn} />
        </div>
      </div>
    </section>
  );
};
