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
    <section className="w-full bg-white px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <WhoIsItForSection items={whoIsItFor} />
          <WhatYouLearnSection items={whatYouLearn} />
        </div>
      </div>
    </section>
  );
};
