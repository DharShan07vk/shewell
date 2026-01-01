
import SectionTitle from "../components/shared/section-title";
// import BlogSlider from "./blogs-slider";
import { db } from "~/server/db";
import Slider from "./blogSlider";
export const dynamic = 'force-dynamic';
// const blogCredentials = [
//   {
//     src: "/images/blogs/blog1.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog2.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog3.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog1.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog2.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog3.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog1.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog2.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
//   {
//     src: "/images/blogs/blog3.png",
//     date: "Posted on : 14 Jan 2024",
//     heading: "Know your carbs and diet balance in easy way",
//     description:
//       "Recognizing organizations as collections of human beings who are motivated by varying perspectives and emotions",
//   },
// ];

const Blogs = async () => {
  const blogCredentials = await db.blog.findMany({
    select: {
      id: true,
      media: {
        select: {
          id: true,
          fileUrl: true,
        },
      },
      title: true,
      body: true,
      createdAt: true,
      slug: true,
      shortDescription : true,
    },
    where: {
      active: true,
    },
  });
  return (
    <>
      <div className="w-full py-8 md:py-[55px] xl:py-[65px] ">
        <div className="container mx-auto max-w-full">
          <SectionTitle text="Blogs" />
          <div className="mb-8 text-center font-inter text-base font-normal md:mb-[30px] lg:mb-[38px] xl:mb-[44px] 2xl:mb-[48px] 2xl:text-lg 2xl:font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </div>

          {/* <BlogSlider blogCredentials={blogCredentials} /> */}
          <Slider blogCredentials={blogCredentials}/>
        </div>
      </div>
    </>
  );
};
export default Blogs;
