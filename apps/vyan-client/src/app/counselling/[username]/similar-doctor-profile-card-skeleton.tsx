const SimilarDoctorCardSkeleton = () => {
  return (
    <>
      <div className="flex animate-pulse gap-4 rounded-md border border-border-300 p-3 md:p-4 lg:gap-6 lg:p-6 w-fit">
        {/* Image skeleton */}
        <div className="flex flex-col items-center justify-center gap-3 self-center">
          <div className="flex aspect-square w-[135px] items-center justify-center self-center bg-gray-200">
            <div className="aspect-square w-[116px] rounded-full bg-gray-300"></div>
          </div>
          <div className="h-4 w-24 rounded-md bg-gray-300"></div>
          <div className="h-8 w-32 rounded-md bg-gray-300"></div>
        </div>

        {/* Text and Specialization skeleton */}
        <div className="flex flex-col gap-3 self-center">
          <div className="h-6 w-48 rounded-md bg-gray-300"></div>
          <div className="h-4 w-36 rounded-md bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 rounded-md bg-gray-300"></div>
            <div className="h-4 w-16 rounded-md bg-gray-300"></div>
            <div className="h-4 w-28 rounded-md bg-gray-300"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-4 w-16 rounded-md bg-gray-300"></div>
            <div className="h-4 w-20 rounded-md bg-gray-300"></div>
            <div className="h-4 w-12 rounded-md bg-gray-300"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-4 w-16 rounded-md bg-gray-300"></div>
            <div className="h-4 w-20 rounded-md bg-gray-300"></div>
            <div className="h-4 w-12 rounded-md bg-gray-300"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SimilarDoctorCardSkeleton;
