import Image from "next/image";
import Link from "next/link";
interface IFeatureCard {
  featureCard: {
    image: string;
    title: string;
    description: string;
  };
}
const FeatureCard = ({ featureCard }: IFeatureCard) => {
  return (
    <>
      <div className="group flex flex-col items-center  justify-center gap-3 rounded-md border  border-secondary p-4 shadow-[0px_2px_8px_0px_#2632381A] hover:bg-black hover:shadow-[0px_5px_10px_0px_#26323840]  ">
        <div className="w-[72px]">
          <div className="relative aspect-square w-full">
            <Image
              src={featureCard.image}
              alt="feature-card"
              className="object-cover"
              fill={true}
            />
          </div>
        </div>
        <div>
          <div className="text-center font-inter  text-2xl font-semibold text-primary	group-hover:text-secondary">
            {featureCard.title}
          </div>
          <div className="mt-2 text-center font-inter text-base font-normal text-black-400 group-hover:text-white">
            {featureCard.description}
          </div>
        </div>

        <Link
          href={"/"}
          className="flex gap-[216px]  px-4 py-2 font-inter text-base font-medium text-primary group-hover:text-secondary md:gap-[150px] lg:gap-[63px]"
        >
          Get Started
          <svg
            className="group-hover:hidden"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7"
              stroke="#00898F"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17 17V7H7"
              stroke="#00898F"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            className="hidden group-hover:block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7"
              stroke="#008F4E"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17 17V7H7"
              stroke="#008F4E"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};
export default FeatureCard;
