"use client";
import Image from "next/image";

import { Button } from "@repo/ui/src/@/components/button";
import Link from "next/link";
import { format } from "date-fns";
import QuillHtml from "../components/shared/quill-html";

type BlogCardProps = {
  fileUrl: string;
  createdAt: Date;
  title: string;
  body: string;
  slug: string;
  des : string | null
};
const BlogCard = ({ fileUrl, title, createdAt, body, slug }: BlogCardProps) => {
  return (
    <>
      <Link href={`/blogs/${slug}`} className="h-full w-full" >
        <div className="group  w-full  h-full border border-3  ">
          {/* <div className="w-[393px] md:w-[350px] lg:w-[295px] xl:w-[398px] 2xl:w-[498px]">
            
          </div> */}
          <div className="relative aspect-square w-full   ">
            <Image
              src={fileUrl}
              alt="blog-image"
              fill
              className="rounded-md  object-cover"
            />
          </div>
          <div className=" px-3  py-5 md:p-6">
            <div className="font-inter text-base font-medium text-primary">
              {/* Posted on : {format(createdAt!, "dd MMMM yyyy")} */}
            </div>
            <h2 className="mb-2 mt-[2px] line-clamp-2 font-inter  text-base font-semibold group-hover:text-secondary md:mb-3 md:mt-1  md:text-xl md:leading-[30px] xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
              {" "}
              {title}
            </h2>
            <div
              className=" mb-6 line-clamp-3 font-inter text-sm font-normal text-inactive md:mb-8 md:text-base"
              // dangerouslySetInnerHTML={{ __html: body }}
            >
              {" "}
              {/* {body} */}
              
              <QuillHtml className="line-clamp-3" body={body} />
            </div>

            <Button className="group-hover:bg-secondary" variant="blog">
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
      </Link>
    </>
  );
};
export default BlogCard;
