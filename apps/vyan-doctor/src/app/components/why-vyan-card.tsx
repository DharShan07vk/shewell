"use client";
const WhyVyanCard = () => {
  return (
    <>
      <div className="border bg-[#FAFAFA] md:basis-1/3 rounded-lg sm:rounded-lg">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-5 pr-6 sm:pr-8 md:pr-[50px]">
          <div className="rounded-full p-1.5 sm:p-2 md:p-[9px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-[19px] md:h-[19px]"
              viewBox="0 0 19 19"
              fill="none"
            >
              <g clip-path="url(#clip0_4166_69645)">
                <path
                  d="M9.5 15.9023C13.2279 15.9023 16.25 12.8803 16.25 9.15234C16.25 5.42442 13.2279 2.40234 9.5 2.40234C5.77208 2.40234 2.75 5.42442 2.75 9.15234C2.75 12.8803 5.77208 15.9023 9.5 15.9023Z"
                  stroke="#2E2E27"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.6875 9.15243C6.6875 11.7863 7.62477 14.139 9.09781 15.7259C9.14898 15.7816 9.21115 15.826 9.28038 15.8564C9.34961 15.8868 9.42439 15.9025 9.5 15.9025C9.57561 15.9025 9.65039 15.8868 9.71962 15.8564C9.78885 15.826 9.85102 15.7816 9.90219 15.7259C11.3752 14.139 12.3125 11.7863 12.3125 9.15243C12.3125 6.51853 11.3752 4.16587 9.90219 2.57892C9.85102 2.52326 9.78885 2.47882 9.71962 2.44843C9.65039 2.41804 9.57561 2.40234 9.5 2.40234C9.42439 2.40234 9.34961 2.41804 9.28038 2.44843C9.21115 2.47882 9.14898 2.52326 9.09781 2.57892C7.62477 4.16587 6.6875 6.51853 6.6875 9.15243Z"
                  stroke="#2E2E27"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.13281 6.90234H15.865"
                  stroke="#2E2E27"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.13281 11.4023H15.865"
                  stroke="#2E2E27"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4166_69645">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0.5 0.152344)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="font-inter text-sm sm:text-base md:text-lg font-normal leading-tight sm:leading-[26px] text-[#2E2E27]">
            One global login
          </div>
          <div className="font-inter text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Skip the login nightmare for all your different accounts, instead,
            see everything from one login.
          </div>
        </div>
      </div>
    </>
  );
};
export default WhyVyanCard;
