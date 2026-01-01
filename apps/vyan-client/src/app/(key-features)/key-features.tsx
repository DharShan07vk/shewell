import KeyFeaturesCard from "~/components/key-features-card";

const KeyFeaturesCardCredentials = [
  {
    image: "/images/key-features/key-feat-1.png",
    title: "Certified Counsellor"
  },

  {
    image: "/images/key-features/key-feat-3.png",
    title: "Certified Counsellor"
  },
  {
    image: "/images/key-features/key-feat-3.png",
    title: "Certified Counsellor"
  },
];

const KeyFeatures = () => {
  return (
    <>
      <div className="container mx-auto ">
        <div className="py-8 lg:py-[55px] xl:py-[65px]">
          <div className="text-center font-poppins text-[22px] leading-[32px] font-bold mb-6 lg:mb-[30px] lg:text-[30px] lg:leading-[48px] xl:mb-9 xl:text-[36px] xl:leading-[45px] 2xl:mb-10 2xl:text-[40px] 2xl:leading-[52px]">
            KEY FEATURES
          </div>
          <div className="flex md:justify-between items-center gap-6 flex-col lg:flex-row   md:px-6 lg:px-[50px] xl:px-[140px] 2xl:px-[180px]">
            {KeyFeaturesCardCredentials.map( (item,index) => {
              return(
                <KeyFeaturesCard key={index}
               
                 keyfeaturescard={item}/>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyFeatures;
