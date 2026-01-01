import { Button } from "@repo/ui/src/@/components/button";
import Image from "next/image";

const CartLayoverCard = () => {
  return (
    <>
      <div className="flex gap-[158px]">
        {/* 1st-div */}
        <div>
          <div className="w-[124px]">
            <div className="aspect-square relative w-full">
              <Image src={""} fill={true} alt="Product-image" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
          <div>Dry Nuts Powder</div>
          <div>
            Units: <span>1</span>
          </div>
          <div className="mt-[16px]">$599</div>
        </div>
        </div>
        
        {/* 2nd-div */}
       
          <div className="flex flex-col gap-8 ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="#CA0000"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66797 5.00008V3.33341C6.66797 2.89139 6.84356 2.46746 7.15612 2.1549C7.46868 1.84234 7.89261 1.66675 8.33464 1.66675H11.668C12.11 1.66675 12.5339 1.84234 12.8465 2.1549C13.159 2.46746 13.3346 2.89139 13.3346 3.33341V5.00008M15.8346 5.00008V16.6667C15.8346 17.1088 15.659 17.5327 15.3465 17.8453C15.0339 18.1578 14.61 18.3334 14.168 18.3334H5.83464C5.39261 18.3334 4.96868 18.1578 4.65612 17.8453C4.34356 17.5327 4.16797 17.1088 4.16797 16.6667V5.00008H15.8346Z"
                stroke="#CA0000"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.33203 9.16675V14.1667"
                stroke="#CA0000"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.668 9.16675V14.1667"
                stroke="#CA0000"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="rounded-md border border-border-color">
              <Button>
                <svg
                  width="12"
                  height="2"
                  viewBox="0 0 12 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33398 1H10.6673"
                    stroke="#00898F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
              1
              <Button>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.75 0C5.94891 0 6.13968 0.0790175 6.28033 0.21967C6.42098 0.360322 6.5 0.551088 6.5 0.75V5H10.75C10.9489 5 11.1397 5.07902 11.2803 5.21967C11.421 5.36032 11.5 5.55109 11.5 5.75C11.5 5.94891 11.421 6.13968 11.2803 6.28033C11.1397 6.42098 10.9489 6.5 10.75 6.5H6.5V10.75C6.5 10.9489 6.42098 11.1397 6.28033 11.2803C6.13968 11.421 5.94891 11.5 5.75 11.5C5.55109 11.5 5.36032 11.421 5.21967 11.2803C5.07902 11.1397 5 10.9489 5 10.75V6.5H0.75C0.551088 6.5 0.360322 6.42098 0.21967 6.28033C0.0790175 6.13968 0 5.94891 0 5.75C0 5.55109 0.0790175 5.36032 0.21967 5.21967C0.360322 5.07902 0.551088 5 0.75 5H5V0.75C5 0.551088 5.07902 0.360322 5.21967 0.21967C5.36032 0.0790175 5.55109 0 5.75 0Z"
                    fill="#00898F"
                  />
                </svg>
              </Button>
            </div>
          </div>

        </div>
   
    </>
  );
};
export default CartLayoverCard;
