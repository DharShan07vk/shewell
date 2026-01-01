"use client";
import { Button } from "@repo/ui/src/@/components/button";

const PremiumMembership = () => {
  return (
    <>
      <div className="my-[32px]  flex flex-col items-center justify-center gap-[12px] rounded-lg bg-black px-4 py-6 md:my-[65px] md:gap-[16px] md:px-[60px] lg:px-10 lg:py-10 2xl:gap-[24px] 2xl:px-[100px] 2xl:py-[50px]">
        <div className="lg:text-[36px] lg:leading-[45px] font-poppins text-[22px] font-bold leading-[32px] text-white md:text-[30px] text-center md:leading-[48px] 2xl:text-[40px] 2xl:leading-[52px]">
          PREMIUM MEMBERSHIP
        </div>
        <div className="text-center font-inter text-sm font-normal container mx-auto leading-[20px] text-white md:text-base md:leading-[24px] 2xl:text-[18px] 2xl:leading-[28px]">
          Don't miss out - join our premium community of counselors dedicated to
          making a difference. Upgrade now and let your expertise shine on Vyan
        </div>
        <Button className="flex items-center gap-[10px] rounded-md bg-primary px-4 py-3 font-inter text-base font-medium leading-[24px] text-white">
          Go Premium{" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <g clip-path="url(#clip0_6075_45265)">
                <path
                  d="M0.909061 9.17166H16.8962L13.9026 6.17808C13.5476 5.82311 13.5476 5.24748 13.9026 4.89245C14.2576 4.53748 14.8332 4.53748 15.1883 4.89245L19.7337 9.4379C20.0888 9.79287 20.0888 10.3685 19.7337 10.7235L15.1883 15.269C15.0107 15.4465 14.7781 15.5353 14.5454 15.5353C14.3128 15.5353 14.0801 15.4465 13.9026 15.269C13.5476 14.914 13.5476 14.3384 13.9026 13.9834L16.8962 10.9898H0.909061C0.407 10.9898 -3.05176e-05 10.5828 -3.05176e-05 10.0808C-3.05176e-05 9.57869 0.407 9.17166 0.909061 9.17166Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_6075_45265">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="matrix(-1 0 0 1 20 0.0808105)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </Button>
      </div>
    </>
  );
};
export default PremiumMembership;
