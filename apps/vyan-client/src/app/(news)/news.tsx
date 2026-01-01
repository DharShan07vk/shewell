import NewSlider from "./news-slider";

const newsImages = [
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
  {
    img: "/images/news/news.png",
  },
];
const News = () => {
  return (
    <>
      <div className="lg:bg-[url('/images/news/news-bg.png')] lg:bg-cover">
        <div className="container mx-auto">
          <div className="py-8 md:py-[55px] xl:py-[60px] 2xl:py-[65px]">
            <div
              className="mb-6 text-center font-poppins text-[22px] font-bold leading-[32px] md:mb-[30px] lg:text-[30px] lg:leading-[48px] xl:mb-9
          xl:text-[36px] xl:leading-[45px] 2xl:mb-[40px] 2xl:text-[40px] 2xl:leading-[52px] "
            >
              IN NEWS
            </div>
            <div className="">
              <NewSlider newsImages={newsImages} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
