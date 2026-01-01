import { Button } from "~/components/ui/button";
import Image from "next/image";
const ReturnedOrders = () => {
  return (
    <>
      <div className="pt-10">
        <div className="rounded-md border border-[#80C7A7] font-inter">
          <div className="grid grid-cols-4 rounded-md bg-[#F0F7F8] lg:px-4 lg:py-2.5 xl:px-5 xl:py-[14px] 2xl:px-[37px] 2xl:py-[22px]">
            <div className="flex flex-col items-center justify-center gap-[3px]">
              <div className=" text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Order Placed
              </div>
              <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-active xl:text-base">
                6 October 2023
              </div>
            </div>
            <div className="flex flex-col items-center gap-[3px]">
              <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Total
              </div>
              <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-primary xl:text-base">
                Rs. 1499
              </div>
            </div>
            <div className="flex flex-col items-center gap-[3px]">
              <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Ship To
              </div>
              <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-primary xl:text-base">
                Holder name
              </div>
            </div>
            <div className="flex flex-col items-center gap-[3px]">
              <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Order Id
              </div>{" "}
              <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-inactive xl:text-base">
                #405-4490-70454-202
              </div>
            </div>
          </div>
          <div className="lg:px-[15px] lg:py-[30px] xl:px-5 xl:py-9 2xl:px-[41px] 2xl:py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-5 2xl:mb-[28px]">
                  <div className="text-base font-semibold text-primary md:text-xl xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
                    Returned on 30 - Oct - 2023
                  </div>
                  <div className="text-sm font-normal text-inactive">
                    Return pickup from shipped location
                  </div>
                </div>
                <div className="flex flex-row lg:gap-5 xl:gap-6 2xl:gap-10">
                  <div className="relative aspect-square w-[120px] 2xl:w-[150px]">
                    <Image
                      src="/images/product/prod-1-a.png"
                      alt="product image"
                      fill={true}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col lg:gap-4 xl:gap-[18px] 2xl:gap-[21px]">
                    <div>
                      <div className="text-base font-semibold text-active xl:text-lg">
                        Dry Nut Powder 250 gm ( contain words around 55)
                      </div>
                      <div className="text-sm font-normal text-inactive">
                        Return is not applicable to this product
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 lg:gap-8">
                      <Button variant="orderBtn" size="normal">
                        Order Details
                      </Button>
                      <Button variant="buyAgain" size="normal">
                        Buy Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="buyAgain">Shipment Feedback</Button>
                <Button variant="buyAgain">Review & Ratings</Button>
                <Button variant="buyAgain">Invoice</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnedOrders;
