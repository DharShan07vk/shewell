import Image from "next/image";

interface IKeyFeaturesCard {
  keyfeaturescard: {
    image: string;
    title: string;
  };
}
const KeyFeaturesCard = ({ keyfeaturescard }: IKeyFeaturesCard) => {
  return (
    <>
      <div className="flex flex-row  items-center gap-3  md:flex-col">
        <div className="relative aspect-square w-full">
          <Image
            src={keyfeaturescard.image}
            alt="keyfeaturescard"
            fill={true}
            className="h-auto"
            objectFit="cover"
          />
        </div>

        <div className="font-inter text-base font-semibold   md:text-[20px] md:leading-[30px] xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
          {keyfeaturescard.title}
        </div>
      </div>
    </>
  );
};
export default KeyFeaturesCard;
