import Image from "next/image";

import { Button } from "./shadcnUi/button";
type BlogCardProps = {
  props: {
    src: string;
    date: string;
    heading: string;
    description: string;
  }
};
const BlogCard = ({ props }: BlogCardProps) => {
  return (
    <>
      <div className="group">
        <div className="relative aspect-[4/3] h-[314px]">
          <Image
            src={props.src}
            alt="blog-image"
            fill
            className="h-auto  max-w-full"
          />
        </div>
        <div className="py-5 px-3 md:p-6 xl:p-6 rounded-md border">
          <div className="font-inter text-base font-medium text-primary">
            {props.date}
          </div>
          <h2 className="font-inter text-base md:text-xl xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px] font-semibold group-hover:text-secondary mt-[2px] mb-2 md:mt-1 md:mt-3">
            {" "}
            {props.heading}
          </h2>
          <div className="font-inter md:text-base font-normal text-sm text-inactive mb-6 xl:mb-8 ">
            {props.description}
          </div>

          <Button variant="appointment">
            <div className="mr-2">Read More</div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1939_3209)">
                <path
                  d="M0.909061 9.09085H16.8962L13.9026 6.09727C13.5476 5.7423 13.5476 5.16667 13.9026 4.81164C14.2576 4.45667 14.8332 4.45667 15.1883 4.81164L19.7337 9.35709C20.0888 9.71206 20.0888 10.2877 19.7337 10.6427L15.1883 15.1882C15.0107 15.3657 14.7781 15.4545 14.5454 15.4545C14.3128 15.4545 14.0801 15.3657 13.9026 15.1882C13.5476 14.8332 13.5476 14.2576 13.9026 13.9025L16.8962 10.909H0.909061C0.407 10.909 -3.05176e-05 10.502 -3.05176e-05 9.99994C-3.05176e-05 9.49788 0.407 9.09085 0.909061 9.09085Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1939_3209">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="matrix(-1 0 0 1 20 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};
export default BlogCard;
