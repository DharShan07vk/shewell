const CompleteDoctorProfileSkeleton = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-6 rounded-md border border-border-300 py-4 xs:px-2 sm:px-3 md:flex-row md:justify-between md:px-[30px] md:py-[30px] xl:flex-col">
          {/* Left Section */}
          <div className="flex flex-col gap-[18px]">
            {/* Image + Text */}
            <div className="flex gap-4 lg:gap-6 2xl:gap-8">
              {/* Image */}
              <div className="flex aspect-square animate-pulse items-center justify-center rounded-full bg-gray-100 xs:w-[116px] sm:w-[138px]"></div>
              {/* Text */}
              <div className="flex flex-col gap-1">
                <div className="h-6 w-32 animate-pulse rounded-md bg-gray-100"></div>
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-100"></div>
                {/* Ratings */}
                <div className="flex w-full flex-wrap items-center gap-2 md:justify-start">
                  <div className="h-4 w-16 animate-pulse rounded-md bg-gray-100"></div>
                  <div className="h-4 w-20 animate-pulse rounded-md bg-gray-100"></div>
                </div>
                {/* Button */}
                <div className="mt-4 h-10 w-32 animate-pulse rounded-md bg-gray-100"></div>
              </div>
            </div>

            {/* Specialization */}
            <div className="flex flex-wrap items-center gap-1 font-inter text-xs font-normal text-inactive md:text-sm">
              <span className="font-medium text-active">Specialized In: </span>
              <div className="h-6 w-20 animate-pulse rounded-md bg-gray-100"></div>
              <div className="h-6 w-16 animate-pulse rounded-md bg-gray-100"></div>
            </div>

            {/* Languages */}
            <div className="flex flex-wrap items-center gap-1 font-inter text-xs font-normal text-inactive md:text-sm">
              <span className="font-medium text-active">Languages: </span>
              <div className="h-6 w-20 animate-pulse rounded-md bg-gray-100"></div>
              <div className="h-6 w-16 animate-pulse rounded-md bg-gray-100"></div>
            </div>

            {/* Available Time Slots */}
            <div className="mb-6 mt-[18px] md:my-6">
              <div className="border-b border-primary pb-1 font-inter text-base font-medium 2xl:text-lg">
                Available Time Slots
              </div>
              <div className="h-12 w-full animate-pulse rounded-md bg-gray-100"></div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:self-center xl:self-start">
            <div className="h-12 w-48 animate-pulse rounded-md bg-gray-100"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompleteDoctorProfileSkeleton;
