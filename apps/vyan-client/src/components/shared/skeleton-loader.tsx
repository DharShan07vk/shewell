import React from "react";

const SkeletonLoader = ({
  numberOfRenders,
  skeleton,
}: {
  numberOfRenders: number;
  skeleton: React.ReactNode;
}) => {
  return (
    <>
      {Array.from({ length: numberOfRenders }).map((_, index) => {
       {skeleton};
      })}
    </>
  );
};
export default SkeletonLoader;
