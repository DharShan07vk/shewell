import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-black py-10 md:py-[50px] xl:py-[55px] 2xl:py-[60px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-[25px] ">
            {/* Footer-Part-1 */}
            <div className="grid grid-cols-1   md:grid-cols-3 lg:grid-cols-5 gap-[22px] lg:justify-between pb-[25px]">
              {/* div1 */}
              <div className="mx-auto md:mx-[0] ">
                <div className="relative aspect-[3.82/1] h-[44px]">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    fill
                    className="max-w-full h-auto"
                  />
                </div>
                <div className=" mt-5 flex  gap-6">

                  {/* fb-icon */}
                  <Link href="#">
                    <svg
                      width="14"
                      height="22"
                      viewBox="0 0 14 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3538 4.06117H13.4673V0.202452H9.62638C9.30597 0.18912 5.40015 0.114461 4.38781 3.97495C4.37314 4.01539 4.04962 4.93352 4.04962 7.07819L0.537537 7.08886V11.136L4.05406 11.1258V21.8007H9.42551V11.1351H12.9807V7.0773H9.42551V5.80054C9.42551 5.00685 9.76014 4.06117 11.3538 4.06117ZM12.0919 7.96565V10.2459H8.53671V20.9114H4.94286V10.2343L1.42633 10.2445V7.97499L4.95219 7.96477L4.94286 7.51281C4.89664 5.24104 5.22061 4.28559 5.23528 4.23982C6.10896 0.914824 9.44507 1.08192 9.58816 1.09081L12.5785 1.09169V3.17281H11.3538C9.27708 3.17281 8.53716 4.53001 8.53716 5.8001V7.96565H12.0919Z"
                        fill="white"
                      />
                    </svg>
                  </Link>

                  {/* telegram-icon */}
                  <Link href={"#"}>
                    <svg
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9452 0.62912L0.201538 9.02043V10.2333L6.14278 12.0675L8.02176 18.0956L9.52168 18.0953L11.94 15.6211L17.0449 19.3707L18.0386 18.9927L21.8016 1.34784L20.9452 0.62912ZM17.0049 17.7708L10.2816 12.8324L9.53223 13.8526L10.9097 14.8643L8.95309 16.8297L7.41781 11.9043L16.3104 6.59479L15.6615 5.50798L6.63808 10.8956L2.27271 9.54801L20.315 2.2495L17.0049 17.7708Z"
                        fill="white"
                      />
                    </svg>
                  </Link>

                  {/* instagram-icon */}
                  <Link href={"#"}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3406_5724)">
                      <path
                        d="M15.881 0.200165H6.12358C2.85856 0.200165 0.202271 2.85646 0.202271 6.12152V15.8789C0.202271 19.1439 2.85856 21.8002 6.12358 21.8002H15.881C19.146 21.8002 21.8023 19.1439 21.8023 15.8789V6.12152C21.8023 2.85646 19.146 0.200165 15.881 0.200165ZM20.5267 15.8789C20.5267 18.4405 18.4427 20.5246 15.881 20.5246H6.12358C3.56191 20.5246 1.47785 18.4406 1.47785 15.8789V6.12152C1.47785 3.55981 3.56191 1.47575 6.12358 1.47575H15.881C18.4427 1.47575 20.5267 3.55981 20.5267 6.12152V15.8789Z"
                        fill="white"
                      />
                      <path
                        d="M11.0017 5.07544C7.73496 5.07544 5.07727 7.73313 5.07727 10.9999C5.07727 14.2666 7.73491 16.9243 11.0017 16.9243C14.2684 16.9243 16.9262 14.2666 16.9262 10.9998C16.9262 7.73308 14.2684 5.07544 11.0017 5.07544ZM11.0017 15.6488C8.43831 15.6488 6.35281 13.5632 6.35281 10.9998C6.35281 8.43643 8.43831 6.35094 11.0017 6.35094C13.5651 6.35094 15.6506 8.43648 15.6506 10.9999C15.6506 13.5633 13.5651 15.6488 11.0017 15.6488Z"
                        fill="white"
                      />
                      <path
                        d="M17.2804 2.92105C16.2879 2.92105 15.4805 3.72856 15.4805 4.72106C15.4805 5.71357 16.2879 6.52104 17.2804 6.52104C18.2729 6.52104 19.0804 5.71353 19.0804 4.72102C19.0804 3.72852 18.2729 2.92105 17.2804 2.92105ZM17.2804 5.24541C16.9913 5.24541 16.756 5.01018 16.756 4.72102C16.756 4.43187 16.9913 4.19663 17.2804 4.19663C17.5696 4.19663 17.8048 4.43191 17.8048 4.72102C17.8048 5.01013 17.5696 5.24541 17.2804 5.24541Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3406_5724">
                        <rect
                          width="21.6"
                          height="21.6"
                          fill="white"
                          transform="translate(0.199951 0.200012)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  </Link>

                  {/* twitter-icon */}
                 <Link href={"#"}>
                 <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0549 9.34614L21.096 0.200012H19.1905L12.2084 8.14146L6.63185 0.200012H0.199951L8.63281 12.2089L0.199951 21.8H2.10554L9.47879 13.4136L15.368 21.8H21.7999L13.0549 9.34614ZM10.4449 12.3147L9.5905 11.1189L2.79215 1.60366H5.71902L11.2054 9.28275L12.0598 10.4786L19.1914 20.4602H16.2645L10.4449 12.3147Z"
                      fill="white"
                    />
                  </svg></Link>
                </div>
              </div>

              {/* div2 */}


              <ul className="grid grid-cols-1 gap-[10px] 	">
                <li className="font-inter text-base 2xl:text-2lg font-medium text-white">
                  <Link href="#">QUICK LINKS</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">About Us</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Blog</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Recipe</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Reviews</Link>
                </li>
              </ul>


              {/* div3 */}

              <ul className="grid grid-cols-1 gap-[10px] ">
                <li className="font-inter text-base 2xl:text-2lg font-medium text-white">COUNSELING</li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Phycology</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Nutritious</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Mental Health</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">New Born Child</Link>
                </li>
              </ul>

              {/* div4 */}
              <ul className="grid grid-cols-1 gap-[10px]">
                <li className="font-inter text-base 2xl:text-2lg font-medium text-white">SERVICES</li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Pregnancies</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Child Health</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Prenatal</Link>
                </li>
                <li className="font-inter text-sm font-normal text-white 2xl:text-base">
                  <Link href="#">Postnatal</Link>
                </li>
              </ul>

              {/* div5 */}
              <ul className="grid grid-cols-1 gap-[10px] ">
                <li className="font-inter text-base 2xl:text-2lg font-medium text-white">CONTACT US</li>

                <li className="flex" >
                  <svg
                    className="mr-1 "
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 2.01611C15.87 2.01611 19 5.14611 19 9.01611C19 14.2661 12 22.0161 12 22.0161C12 22.0161 5 14.2661 5 9.01611C5 5.14611 8.13 2.01611 12 2.01611ZM7 9.01611C7 11.8661 9.92 16.2261 12 18.8961C14.12 16.2061 17 11.8961 17 9.01611C17 6.25611 14.76 4.01611 12 4.01611C9.24 4.01611 7 6.25611 7 9.01611ZM12 11.5161C10.6193 11.5161 9.5 10.3968 9.5 9.01611C9.5 7.6354 10.6193 6.51611 12 6.51611C13.3807 6.51611 14.5 7.6354 14.5 9.01611C14.5 10.3968 13.3807 11.5161 12 11.5161Z"
                      fill="#00898F"
                    />
                  </svg>

                  <Link className="font-inter text-sm font-normal text-white 2xl:text-base " href="#">123 colony Gurgram, Haryana- 122001</Link>

                </li>



                <li>
                  <svg
                    className="mr-2 inline"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 6.01611C22 4.91611 21.1 4.01611 20 4.01611H4C2.9 4.01611 2 4.91611 2 6.01611V18.0161C2 19.1161 2.9 20.0161 4 20.0161H20C21.1 20.0161 22 19.1161 22 18.0161V6.01611ZM20 6.01611L12 11.0161L4 6.01611H20ZM20 18.0161H4V8.01611L12 13.0161L20 8.01611V18.0161Z"
                      fill="#00898F"
                    />
                  </svg>

                  <Link className="font-inter text-sm font-normal text-white 2xl:text-base " href="#">jskdjflsjlj@gmail</Link>

                </li>

                <li >
                  <svg
                    className="ml-1 mr-2 inline"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.54 2.01611C3.6 2.90611 3.75 3.77611 3.99 4.60611L2.79 5.80611C2.38 4.60611 2.12 3.33611 2.03 2.01611H3.54ZM13.4 14.0361C14.25 14.2761 15.12 14.4261 16 14.4861V15.9761C14.68 15.8861 13.41 15.6261 12.2 15.2261L13.4 14.0361ZM4.5 0.0161133H1C0.45 0.0161133 0 0.466113 0 1.01611C0 10.4061 7.61 18.0161 17 18.0161C17.55 18.0161 18 17.5661 18 17.0161V13.5261C18 12.9761 17.55 12.5261 17 12.5261C15.76 12.5261 14.55 12.3261 13.43 11.9561C13.33 11.9161 13.22 11.9061 13.12 11.9061C12.86 11.9061 12.61 12.0061 12.41 12.1961L10.21 14.3961C7.38 12.9461 5.06 10.6361 3.62 7.80611L5.82 5.60611C6.1 5.32611 6.18 4.93611 6.07 4.58611C5.7 3.46611 5.5 2.26611 5.5 1.01611C5.5 0.466113 5.05 0.0161133 4.5 0.0161133Z"
                      fill="#00898F"
                    />
                  </svg>


                  <Link className="font-inter text-sm font-normal text-white 2xl:text-base" href="#">+91-1234567890</Link>

                </li>
              </ul>

            </div>
          </div>


          {/* Footer-Part-2 */}
          <div className="border-white-200 flex flex-col lg:flex-row justify-between md:items-baseline border-t-[1px] pt-[25px] ">
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-3   ">
              <Link
                className="font-inter text-base font-normal text-white"
                href="#"
              >
                Terms & Conditions
              </Link>
              <Link
                className="font-inter text-base font-normal text-white "
                href="#"
              >
                Privacy Polices
              </Link>
              <Link
                className="font-inter text-base font-normal text-white"
                href="#"
              >
                2023, All Rights Reserved
              </Link>
            </div>
            <div>
              <div className="font-inter text-base 2xl:text-lg font-normal text-white mt-[18px]  ">
                Developed By{" "}
                <Link className="text-primary font-medium 2xl:text-lg" href="#">
                  NEXTFLY TECHNOLOGIES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};
export default Footer;
