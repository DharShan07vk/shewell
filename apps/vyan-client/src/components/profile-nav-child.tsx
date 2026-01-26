"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProfileChildProps {
  profileChild: {
    path: string;
    img: string;
    title: string;
  };
}
const ProfileNavChild = ({ profileChild }: IProfileChildProps) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={profileChild.path}
        className="group flex cursor-pointer items-center justify-between"
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="w-6 ">
            <div className="relative aspect-square w-full">
              <Image
                fill={true}
                src={profileChild.img}
                alt=""
                className="object-cover"
              />
            </div>
          </div>
          <div
            className={` font-poppins text-base font-medium group-hover:text-secondary ${pathname === profileChild.path ? "text-secondary" : ""} `}
          >
            {profileChild.title}
          </div>
        </div>
        {/* Right-arrow */}
        <div>
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.887285 11.8402C0.674303 11.6273 0.674266 11.2819 0.887321 11.0689L5.95616 6.00013L0.887285 0.931145C0.674303 0.718164 0.674266 0.372782 0.887321 0.159764C1.10034 -0.0532545 1.44568 -0.0532545 1.6587 0.159764L7.11325 5.61445C7.21554 5.71675 7.27299 5.85547 7.27299 6.00013C7.27299 6.14478 7.2155 6.28354 7.11321 6.3858L1.65867 11.8402C1.44568 12.0533 1.1003 12.0533 0.887285 11.8402Z"
              fill="#181818"
              className={`group-hover:fill-secondary ${pathname === profileChild.path ? "fill-secondary" : ""}`}
            />
          </svg>
        </div>
      </Link>
    </>
  );
};
export default ProfileNavChild;
