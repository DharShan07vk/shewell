import SectionTitle from "~/components/shared/section-title";
import Slider from "./blogs-slider";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

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
      shortDescription: true,
    },
    where: {
      active: true,
    },
  });

  if (blogCredentials.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <SectionTitle text="Blogs" />
        <p>No blogs available right now.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-[55px] xl:py-[65px]">
      <div className="container mx-auto max-w-full">
        <SectionTitle text="Blogs" />
        <div className="mb-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <Slider blogCredentials={blogCredentials} />
      </div>
    </div>
  );
};

export default Blogs;
