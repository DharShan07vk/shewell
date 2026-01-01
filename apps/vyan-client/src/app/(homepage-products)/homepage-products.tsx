import Image from "next/image";
import Link from "next/link";

const personalCareTypes = [
  {
    type: "Women's Personal Care",
    url: "/products",
  },
  {
    type: "Child Personal Care",
    url: "/products",
  },
];
const nutritionTypes = [
  {
    type: "Postnatal mom",
    url: "/products",
  },
  {
    type: "Baby Product",
    url: "/products",
  },
  {
    type: "Prenatal mom",
    url: "/products",
  },
];
const HomePageCard = ({
  productImage,
  productCategory,
  productCategoryTypes,
}: {
  productImage: string;
  productCategory: string;
  productCategoryTypes: {
    type: string;
    url: string;
  }[];
}) => {
  return (
    <>
      <div className="border-1 flex w-full bg-white rounded-[12px] border border-primary xs:gap-[24px] xs:px-2 xs:py-3 sm:gap-[30px] sm:p-5 lg:px-[20px] lg:py-5 xl:gap-[24px] xl:p-[28px]">
        <div className="h-[82px] w-[82px] rounded-full bg-primary p-[14px]">
          <Image
            src={productImage}
            alt="product-image"
            width={53}
            height={53}
          />
        </div>
        <div className="flex flex-col gap-[12px] font-inter text-[16px] font-semibold leading-[24px] text-primary lg:text-[20px] lg:leading-[30px] xl:text-[24px] xl:leading-[32px] 2xl:text-[28px] 2xl:leading-[38px]">
          <Link href="/products">{productCategory}</Link>
          <div className="flex flex-col gap-[16px] lg:flex-row xl:gap-[20px]">
            {productCategoryTypes.map((item, index) => {
              return (
                <>
                  <Link href={item.url} className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M15.1471 5.16722L5.89046 14.243L1.76511 10.0354"
                        stroke="#008F4E"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.4474 8.53348L12.136 14.7215L10.8984 13.4592"
                        stroke="#008F4E"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="font-inter text-[14px] font-medium leading-[20px] text-[#000000] xl:text-[16px] xl:leading-[24px] 2xl:text-[18px] 2xl:leading-[28px]">
                      {item.type}
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
const HomePageProducts = () => {
  return (
    <>
    
      <div className="bg-[url('/images/bg-homepage-products.png')]">
      <div className="container mx-auto max-w-full  ">
          <div className="flex w-full flex-col gap-[24px]  py-8 md:py-[55px] lg:flex-row xl:py-[65px] 2xl:gap-[40px]">
            <div className="flex w-full  flex-col items-center justify-center gap-4 lg:basis-[326px] lg:items-start xl:basis-[548px] 2xl:basis-[780px]">
              <div className="text-center w-full text-[22px] font-bold  leading-[32px] md:text-left lg:text-[30px] lg:leading-[48px] xl:text-[36px] xl:leading-[45px] 2xl:text-[40px] 2xl:leading-[52px]">
                Essential Food And Care Products for Mothers & Babies
              </div>
              <Link
                href="/products"
                className="flex w-fit gap-2 rounded-[6px] bg-secondary px-4 py-3 font-inter text-[16px] font-medium leading-[24px] text-white"
              >
                Shop Now{" "}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-move-right"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="flex lg:basis-[548px] xl:basis-[696px] flex-col gap-[16px]">
              <HomePageCard
                productImage="/images/personal-care.svg"
                productCategory="Personal Care"
                productCategoryTypes={personalCareTypes}
              />
              <HomePageCard
                productCategory="Nutrition"
                productImage="/images/nutrition.svg"
                productCategoryTypes={nutritionTypes}
              />
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};
export default HomePageProducts;
