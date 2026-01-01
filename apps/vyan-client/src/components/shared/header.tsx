"use client";
import Image from "next/image";

import * as React from "react";

import { Navmenu } from "../nav-menu";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductsHeader from "./productsHeader";
import { useCartStore } from "~/store/cart.store";
import { slugifyName } from "~/lib/utils";
import ProfileNav from "../profile-nav";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/src/@/components/hover-card";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IProduct } from "~/models/product-model";
import { api } from "~/trpc/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/src/@/components/dropdown-menu";
import { env } from "~/env";

interface ICategoryProps {
  categories: {
    id: string;
    name: string;
    order: number;
    childCategories: {
      id: string;
      name: string;
      childCategories: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
  products: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface ICategory {
  id: string;
  name: string;
  // order: number | null;
  childCategories?: ICategory[];
}

interface IHeaderProps {
  categories: ICategory[];
  email: string;
  name: string;
  wishlistedProLength: number;
}

const Header = ({
  categories,
  email,
  name,
  wishlistedProLength,
}: IHeaderProps) => {
  const session = useSession();
  const { cart } = useCartStore((state) => {
    return {
      cart: state.cart,
    };
  });

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [findProducts, setFindProducts] = useState<IProduct[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log("pathname", pathname);

  const product = searchParams.get("productName") as string;
  const { isLoading, data: productsData } =
    api.searchProduct.searchProductRouter.useQuery(
      { searchQuery: searchTerm },
      { enabled: !!searchTerm },
    );

  useEffect(() => {
    if (productsData) {
      const formattedSearchProducts = productsData.searchProducts.map(
        (item) => ({
          ...item,
        }),
      );
      setFindProducts(formattedSearchProducts);
    }
  }, [productsData]);

  const getUrl = (category: ICategory) => {
    const params = new URLSearchParams(searchParams);
    const categoryIds =
      category.childCategories?.map((child) => {
        return child.id;
      }) || [];
    params.set("category", categoryIds.join(","));
    return `/products/?${params.toString()}`;
  };

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close dropdown when a search result is clicked
  const handleSearchResultClick = () => {
    setShowDropdown(false);
  };

  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const cartItems = cart.lineItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <>
      <div className="w-full sticky top-0 z-[1000] ">
        <div className="z-50">
       
           {/* top-bar-starts */}
           <div className="w-full   bg-[#DCF7FB]">
            <div className="container mx-auto max-w-full">
              <div className="flex items-center justify-between py-[4px] ">
                <Link
                  className="font-inter text-xs font-normal	md:text-sm	"
                  href="mailto:shewellcare.com"
                >
                  <svg
                    className="mr-1 inline"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.418 2.67188H1.58203C0.711492 2.67188 0 3.38024 0 4.25391V13.7461C0 14.6201 0.711949 15.3281 1.58203 15.3281H16.418C17.2885 15.3281 18 14.6198 18 13.7461V4.25391C18 3.38003 17.2882 2.67188 16.418 2.67188ZM16.175 3.72656C15.6636 4.23974 9.65549 10.2674 9.40866 10.515C9.2025 10.7218 8.79761 10.722 8.59134 10.515L1.82496 3.72656H16.175ZM1.05469 13.5522V4.44779L5.59213 9L1.05469 13.5522ZM1.82496 14.2734L6.3367 9.747L7.84438 11.2596C8.46221 11.8794 9.53803 11.8792 10.1557 11.2596L11.6633 9.74704L16.175 14.2734H1.82496ZM16.9453 13.5522L12.4079 9L16.9453 4.44779V13.5522Z"
                      fill="#121212"
                    />
                  </svg>
                  shewell@gmail.com
                </Link>

                <div className="flex gap-1 sm:gap-3  md:gap-[18px] xl:gap-6  ">
                  <div className="group">
                    <Link
                      className="group-hover:hidden"
                      href="https://www.facebook.com/profile.php?id=61566486577092"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="3"
                          fill="#1877F2"
                          fill-opacity="0.08"
                        />
                        <path
                          d="M16.0843 22V15.6144H18.2268L18.5483 13.1251H16.0843V11.536C16.0843 10.8155 16.2836 10.3245 17.3179 10.3245L18.635 10.324V8.09746C18.4072 8.06786 17.6254 8 16.7154 8C14.8152 8 13.5142 9.15988 13.5142 11.2895V13.1251H11.3652V15.6144H13.5142V22H16.0843Z"
                          fill="#1877F2"
                        />
                      </svg>
                    </Link>

                    <Link
                      className="hidden group-hover:block"
                      href="https://www.facebook.com/profile.php?id=61566486577092"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="30" height="30" rx="3" fill="#1877F2" />
                        <path
                          d="M16.0843 22V15.6144H18.2268L18.5483 13.1251H16.0843V11.536C16.0843 10.8155 16.2836 10.3245 17.3179 10.3245L18.635 10.324V8.09746C18.4072 8.06786 17.6254 8 16.7154 8C14.8152 8 13.5142 9.15988 13.5142 11.2895V13.1251H11.3652V15.6144H13.5142V22H16.0843Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="group">
                    <Link
                      className="group-hover:hidden"
                      href="https://www.instagram.com/shewellcare/"
                      target="_blank"
                    >
                      {" "}
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="3"
                          fill="url(#paint0_linear_1198_27533)"
                          fill-opacity="0.08"
                        />
                        <g clip-path="url(#clip0_1198_27533)">
                          <path
                            d="M21.9856 12.116C21.9528 11.3722 21.8325 10.8608 21.6602 10.4176C21.4824 9.94723 21.2089 9.5261 20.8506 9.17601C20.5005 8.82047 20.0766 8.5442 19.6117 8.36921C19.166 8.19689 18.6573 8.0766 17.9134 8.0438C17.164 8.00823 16.926 8 15.0253 8C13.1245 8 12.8866 8.00823 12.14 8.04102C11.3961 8.07382 10.8847 8.19422 10.4416 8.36644C9.97116 8.5442 9.55002 8.8177 9.19993 9.17601C8.8444 9.5261 8.56824 9.95001 8.39314 10.4149C8.22082 10.8608 8.10052 11.3694 8.06773 12.1133C8.03215 12.8627 8.02393 13.1006 8.02393 15.0014C8.02393 16.9021 8.03215 17.14 8.06495 17.8867C8.09775 18.6306 8.21815 19.142 8.39047 19.5851C8.56824 20.0555 8.8444 20.4766 9.19993 20.8267C9.55002 21.1823 9.97393 21.4585 10.4389 21.6335C10.8847 21.8058 11.3933 21.9261 12.1373 21.9589C12.8838 21.9918 13.1219 22 15.0226 22C16.9234 22 17.1613 21.9918 17.9079 21.9589C18.6518 21.9261 19.1632 21.8058 19.6062 21.6335C20.5471 21.2698 21.291 20.5259 21.6548 19.5851C21.827 19.1393 21.9474 18.6306 21.9802 17.8867C22.013 17.14 22.0212 16.9021 22.0212 15.0014C22.0212 13.1006 22.0184 12.8627 21.9856 12.116ZM20.7249 17.832C20.6948 18.5157 20.5799 18.8849 20.4842 19.1311C20.249 19.741 19.7649 20.225 19.155 20.4603C18.9088 20.556 18.537 20.6709 17.8559 20.7009C17.1175 20.7338 16.896 20.7419 15.0281 20.7419C13.1601 20.7419 12.9359 20.7338 12.2001 20.7009C11.5164 20.6709 11.1472 20.556 10.901 20.4603C10.5975 20.3481 10.3212 20.1703 10.097 19.9379C9.86454 19.7109 9.68677 19.4374 9.5746 19.1339C9.47887 18.8877 9.36403 18.5157 9.33401 17.8348C9.30111 17.0964 9.29299 16.8748 9.29299 15.0068C9.29299 13.1389 9.30111 12.9146 9.33401 12.179C9.36403 11.4952 9.47887 11.126 9.5746 10.8799C9.68677 10.5763 9.86454 10.3001 10.0998 10.0758C10.3267 9.84329 10.6002 9.66552 10.9038 9.55345C11.1499 9.45773 11.5219 9.34288 12.2029 9.31276C12.9413 9.27996 13.1629 9.27173 15.0307 9.27173C16.9015 9.27173 17.1229 9.27996 17.8587 9.31276C18.5424 9.34288 18.9116 9.45773 19.1578 9.55345C19.4613 9.66552 19.7375 9.84329 19.9618 10.0758C20.1943 10.3028 20.372 10.5763 20.4842 10.8799C20.5799 11.126 20.6948 11.4979 20.7249 12.179C20.7577 12.9174 20.7659 13.1389 20.7659 15.0068C20.7659 16.8748 20.7577 17.0936 20.7249 17.832Z"
                            fill="url(#paint1_linear_1198_27533)"
                          />
                          <path
                            d="M15.0256 11.405C13.0401 11.405 11.4292 13.0158 11.4292 15.0014C11.4292 16.987 13.0401 18.5978 15.0256 18.5978C17.0112 18.5978 18.622 16.987 18.622 15.0014C18.622 13.0158 17.0112 11.405 15.0256 11.405ZM15.0256 17.3343C13.7375 17.3343 12.6927 16.2896 12.6927 15.0014C12.6927 13.7132 13.7375 12.6685 15.0256 12.6685C16.3138 12.6685 17.3585 13.7132 17.3585 15.0014C17.3585 16.2896 16.3138 17.3343 15.0256 17.3343Z"
                            fill="url(#paint2_linear_1198_27533)"
                          />
                          <path
                            d="M19.6036 11.2627C19.6036 11.7263 19.2277 12.1023 18.7639 12.1023C18.3003 12.1023 17.9243 11.7263 17.9243 11.2627C17.9243 10.7989 18.3003 10.4231 18.7639 10.4231C19.2277 10.4231 19.6036 10.7989 19.6036 11.2627Z"
                            fill="url(#paint3_linear_1198_27533)"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1198_27533"
                            x1="2.51755"
                            y1="27.4824"
                            x2="27.4826"
                            y2="2.51752"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1198_27533"
                            x1="9.19855"
                            y1="20.8251"
                            x2="20.8489"
                            y2="9.17708"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_1198_27533"
                            x1="12.0328"
                            y1="17.9942"
                            x2="18.0184"
                            y2="12.0086"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_1198_27533"
                            x1="18.0652"
                            y1="11.9614"
                            x2="19.4626"
                            y2="10.5639"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                          <clipPath id="clip0_1198_27533">
                            <rect
                              width="14"
                              height="14"
                              fill="white"
                              transform="translate(8 8)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>

                    <Link
                      className="hidden group-hover:block"
                      href="https://www.instagram.com/shewellcare/"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="3"
                          fill="url(#paint0_linear_1198_27535)"
                        />
                        <g clip-path="url(#clip0_1198_27535)">
                          <path
                            d="M21.9856 12.116C21.9528 11.3722 21.8325 10.8608 21.6602 10.4176C21.4824 9.94723 21.2089 9.5261 20.8506 9.17601C20.5005 8.82047 20.0766 8.5442 19.6117 8.36921C19.166 8.19689 18.6573 8.0766 17.9134 8.0438C17.164 8.00823 16.926 8 15.0253 8C13.1245 8 12.8866 8.00823 12.14 8.04102C11.3961 8.07382 10.8847 8.19422 10.4416 8.36644C9.97116 8.5442 9.55002 8.8177 9.19993 9.17601C8.8444 9.5261 8.56824 9.95001 8.39314 10.4149C8.22082 10.8608 8.10052 11.3694 8.06773 12.1133C8.03215 12.8627 8.02393 13.1006 8.02393 15.0014C8.02393 16.9021 8.03215 17.14 8.06495 17.8867C8.09775 18.6306 8.21815 19.142 8.39047 19.5851C8.56824 20.0555 8.8444 20.4766 9.19993 20.8267C9.55002 21.1823 9.97393 21.4585 10.4389 21.6335C10.8847 21.8058 11.3933 21.9261 12.1373 21.9589C12.8838 21.9918 13.1219 22 15.0226 22C16.9234 22 17.1613 21.9918 17.9079 21.9589C18.6518 21.9261 19.1632 21.8058 19.6062 21.6335C20.5471 21.2698 21.291 20.5259 21.6548 19.5851C21.827 19.1393 21.9474 18.6306 21.9802 17.8867C22.013 17.14 22.0212 16.9021 22.0212 15.0014C22.0212 13.1006 22.0184 12.8627 21.9856 12.116ZM20.7249 17.832C20.6948 18.5157 20.5799 18.8849 20.4842 19.1311C20.249 19.741 19.7649 20.225 19.155 20.4603C18.9088 20.556 18.537 20.6709 17.8559 20.7009C17.1175 20.7338 16.896 20.7419 15.0281 20.7419C13.1601 20.7419 12.9359 20.7338 12.2001 20.7009C11.5164 20.6709 11.1472 20.556 10.901 20.4603C10.5975 20.3481 10.3212 20.1703 10.097 19.9379C9.86454 19.7109 9.68677 19.4374 9.5746 19.1339C9.47887 18.8877 9.36403 18.5157 9.33401 17.8348C9.30111 17.0964 9.29299 16.8748 9.29299 15.0068C9.29299 13.1389 9.30111 12.9146 9.33401 12.179C9.36403 11.4952 9.47887 11.126 9.5746 10.8799C9.68677 10.5763 9.86454 10.3001 10.0998 10.0758C10.3267 9.84329 10.6002 9.66552 10.9038 9.55345C11.1499 9.45773 11.5219 9.34288 12.2029 9.31276C12.9413 9.27996 13.1629 9.27173 15.0307 9.27173C16.9015 9.27173 17.1229 9.27996 17.8587 9.31276C18.5424 9.34288 18.9116 9.45773 19.1578 9.55345C19.4613 9.66552 19.7375 9.84329 19.9618 10.0758C20.1943 10.3028 20.372 10.5763 20.4842 10.8799C20.5799 11.126 20.6948 11.4979 20.7249 12.179C20.7577 12.9174 20.7659 13.1389 20.7659 15.0068C20.7659 16.8748 20.7577 17.0936 20.7249 17.832Z"
                            fill="white"
                          />
                          <path
                            d="M15.0256 11.405C13.0401 11.405 11.4292 13.0158 11.4292 15.0014C11.4292 16.987 13.0401 18.5978 15.0256 18.5978C17.0112 18.5978 18.622 16.987 18.622 15.0014C18.622 13.0158 17.0112 11.405 15.0256 11.405ZM15.0256 17.3343C13.7375 17.3343 12.6927 16.2896 12.6927 15.0014C12.6927 13.7132 13.7375 12.6685 15.0256 12.6685C16.3138 12.6685 17.3585 13.7132 17.3585 15.0014C17.3585 16.2896 16.3138 17.3343 15.0256 17.3343Z"
                            fill="white"
                          />
                          <path
                            d="M19.6036 11.2627C19.6036 11.7263 19.2277 12.1023 18.7639 12.1023C18.3003 12.1023 17.9243 11.7263 17.9243 11.2627C17.9243 10.7989 18.3003 10.4231 18.7639 10.4231C19.2277 10.4231 19.6036 10.7989 19.6036 11.2627Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1198_27535"
                            x1="2.51755"
                            y1="27.4824"
                            x2="27.4826"
                            y2="2.51752"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                          <clipPath id="clip0_1198_27535">
                            <rect
                              width="14"
                              height="14"
                              fill="white"
                              transform="translate(8 8)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </div>

                  <div className="group">
                    <Link
                      className="group-hover:hidden"
                      href="https://www.youtube.com/@Shewellcare"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="3"
                          fill="url(#paint0_linear_7080_47545)"
                          fill-opacity="0.08"
                        />
                        <path
                          d="M19.3515 9H10.6485C9.18475 9 8 10.4229 8 12.1764V17.8238C8 19.5771 9.18475 21 10.6485 21H19.3514C20.8152 21 22 19.5771 22 17.8236V12.1764C22 10.4229 20.8152 9 19.3515 9ZM13.1557 17.5739V12.4261L16.8441 15.0052L13.1557 17.5739Z"
                          fill="#FF0000"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_7080_47545"
                            x1="2.51755"
                            y1="27.4824"
                            x2="27.4826"
                            y2="2.51752"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD600" />
                            <stop offset="0.5" stop-color="#FF0100" />
                            <stop offset="1" stop-color="#D800B9" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </Link>

                    <Link
                      className="hidden group-hover:block"
                      href="https://www.youtube.com/@Shewellcare"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="30" height="30" rx="3" fill="#FF0000" />
                        <path
                          d="M19.0924 9H10.9076C9.30178 9 8 10.5768 8 12.522V17.478C8 19.4232 9.30178 21 10.9076 21H19.0924C20.6982 21 22 19.4232 22 17.478V12.522C22 10.5768 20.6982 9 19.0924 9ZM17.126 15.2411L13.2977 17.4528C13.1957 17.5117 13.0779 17.4216 13.0779 17.2847V12.7232C13.0779 12.5844 13.1988 12.4944 13.301 12.5572L17.1293 14.907C17.2431 14.9769 17.2411 15.1746 17.126 15.2411Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="group">
                    <Link
                      className="group-hover:hidden"
                      href="https://x.com/shewellcare"
                      target="_blank"
                    >
                      {" "}
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="3"
                          fill="black"
                          fill-opacity="0.08"
                        />
                        <path
                          d="M16.3319 13.928L21.5437 8H20.3087L15.7833 13.1472L12.1688 8H8L13.4657 15.7835L8 22H9.2351L14.0141 16.5643L17.8312 22H22L16.3319 13.928ZM14.6403 15.8521L14.0865 15.077L9.68013 8.90977H11.5772L15.1331 13.887L15.6869 14.662L20.3093 21.1316H18.4122L14.6403 15.8521Z"
                          fill="black"
                        />
                      </svg>
                    </Link>

                    <Link
                      className="hidden group-hover:block"
                      href="https://x.com/shewellcare"
                      target="_blank"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="30" height="30" rx="3" fill="black" />
                        <path
                          d="M16.3319 13.928L21.5437 8H20.3087L15.7833 13.1472L12.1688 8H8L13.4657 15.7835L8 22H9.2351L14.0141 16.5643L17.8312 22H22L16.3319 13.928ZM14.6403 15.8521L14.0865 15.077L9.68013 8.90977H11.5772L15.1331 13.887L15.6869 14.662L20.3093 21.1316H18.4122L14.6403 15.8521Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* top-bar-ends */}

          {/* middle-bar-starts */}
          <div className="w-full bg-white">
            <div className="container mx-auto max-w-full">
              <div className=" flex  items-center justify-between py-2.5 md:py-4 2xl:py-[14px]">
                {/* part-1-start */}
                <Link  href="/">
                  <div className="relative aspect-[3.68/1] h-[44px] cursor-pointer">
                    <Image
                      src="/images/vyan-logo.png"
                      fill
                      alt="logo"
                      className="h-auto max-w-full"
                    />
                  </div>
                </Link>
                {/* part-1-ends */}

                {/* part-2-start */}
                <div className="flex items-center gap-[20px] ">
                  <div ref={dropdownRef} className="relative hidden md:block">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className=" border-1 rounded-lg border border-black p-2 pl-[38px] outline-none placeholder:font-inter  placeholder:text-sm placeholder:font-normal  hover:border-yellow-500 md:w-[300px] lg:w-[494px]  xl:w-[893px] 2xl:w-[1005px] "
                      type="search"
                      placeholder="Search"
                      onFocus={() => setShowDropdown(true)}
                    />

                    <svg
                      className="absolute left-2 top-[10px]  hidden md:block "
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="8.70437"
                        cy="8.64134"
                        rx="7.59325"
                        ry="7.53022"
                        stroke="black"
                        stroke-width="1.20637"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.9958 15.1389L17.7772 18.8889"
                        stroke="black"
                        stroke-width="1.20637"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    {showDropdown && (
                      <div className="absolute top-12 z-50 flex w-full flex-col gap-5 bg-white p-5 text-black">
                        {findProducts.length > 0 ? (
                          findProducts.map((item, index) => (
                            <Link
                              href={`/products/${item.slug}`}
                              className=" rounded-md p-2  hover:bg-slate-200"
                              key={index}
                              onClick={(e) => {
                                handleSearchResultClick();
                                setSearchTerm(item.name);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))
                        ) : (
                          <div>No products found</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-[25px] ">
                    {/* profile */}

                    {session.data &&
                    session.data.user.email &&
                    session.data.user.name ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_3406_5779)">
                              <path
                                d="M11.8286 11.5609C13.4169 11.5609 14.792 10.9913 15.9159 9.86735C17.0394 8.74364 17.6093 7.3687 17.6093 5.78026C17.6093 4.19237 17.0396 2.81726 15.9157 1.69317C14.7918 0.56964 13.4167 0 11.8286 0C10.2402 0 8.86523 0.56964 7.74152 1.69336C6.6178 2.81707 6.04797 4.19219 6.04797 5.78026C6.04797 7.3687 6.6178 8.74382 7.74152 9.86753C8.8656 10.9911 10.2407 11.5609 11.8286 11.5609ZM8.73615 2.6878C9.59839 1.82556 10.6099 1.40643 11.8286 1.40643C13.0472 1.40643 14.0588 1.82556 14.9213 2.6878C15.7835 3.55023 16.2028 4.56188 16.2028 5.78026C16.2028 6.99901 15.7835 8.01048 14.9213 8.87291C14.0588 9.73533 13.0472 10.1545 11.8286 10.1545C10.6102 10.1545 9.59875 9.73515 8.73615 8.87291C7.87372 8.01067 7.45441 6.99901 7.45441 5.78026C7.45441 4.56188 7.87372 3.55023 8.73615 2.6878Z"
                                fill="#121212"
                              />
                              <path
                                d="M21.9434 18.4549C21.911 17.9873 21.8455 17.4772 21.749 16.9385C21.6515 16.3957 21.5261 15.8827 21.376 15.4137C21.2207 14.9291 21.0099 14.4504 20.749 13.9918C20.4786 13.5157 20.1607 13.1011 19.804 12.76C19.431 12.4031 18.9744 12.1162 18.4463 11.9069C17.92 11.6987 17.3369 11.5933 16.713 11.5933C16.468 11.5933 16.2311 11.6938 15.7735 11.9917C15.4919 12.1754 15.1625 12.3878 14.7948 12.6227C14.4804 12.823 14.0545 13.0107 13.5284 13.1806C13.0152 13.3467 12.4941 13.4309 11.9796 13.4309C11.4654 13.4309 10.9443 13.3467 10.4307 13.1806C9.90515 13.0109 9.47906 12.8232 9.16522 12.6229C8.80102 12.3901 8.47144 12.1777 8.18561 11.9915C7.72839 11.6936 7.49145 11.5931 7.24646 11.5931C6.62244 11.5931 6.03943 11.6987 5.51337 11.9071C4.98566 12.116 4.52881 12.403 4.15546 12.7602C3.79877 13.1015 3.4809 13.5159 3.21063 13.9918C2.95007 14.4504 2.73914 14.9289 2.58386 15.4139C2.4339 15.8829 2.30847 16.3957 2.21106 16.9385C2.11438 17.4764 2.04901 17.9867 2.0166 18.4555C1.98474 18.9138 1.96863 19.3908 1.96863 19.8727C1.96863 21.1255 2.36688 22.1397 3.15222 22.8877C3.92786 23.6258 4.95398 24.0001 6.20221 24.0001H17.7584C19.0062 24.0001 20.0323 23.6258 20.8082 22.8877C21.5937 22.1403 21.9919 21.1257 21.9919 19.8725C21.9918 19.389 21.9755 18.912 21.9434 18.4549ZM19.8384 21.8688C19.3259 22.3565 18.6455 22.5937 17.7582 22.5937H6.20221C5.3147 22.5937 4.63428 22.3565 4.12195 21.8689C3.61932 21.3905 3.37506 20.7373 3.37506 19.8727C3.37506 19.423 3.38989 18.979 3.41956 18.5527C3.44849 18.1345 3.50763 17.6751 3.59534 17.1869C3.68195 16.7048 3.79218 16.2524 3.92328 15.8428C4.04907 15.45 4.22064 15.0611 4.43341 14.6865C4.63647 14.3294 4.87012 14.0231 5.12793 13.7762C5.36908 13.5453 5.67303 13.3564 6.03119 13.2147C6.36243 13.0836 6.73468 13.0118 7.13879 13.001C7.18805 13.0272 7.27576 13.0771 7.41785 13.1698C7.70697 13.3582 8.04022 13.5732 8.40863 13.8085C8.82391 14.0732 9.35895 14.3124 9.99817 14.5187C10.6517 14.73 11.3182 14.8373 11.9797 14.8373C12.6413 14.8373 13.308 14.73 13.9611 14.5189C14.6009 14.3122 15.1357 14.0732 15.5516 13.8081C15.9286 13.5671 16.2525 13.3584 16.5416 13.1698C16.6837 13.0773 16.7714 13.0272 16.8207 13.001C17.225 13.0118 17.5972 13.0836 17.9286 13.2147C18.2866 13.3564 18.5906 13.5455 18.8317 13.7762C19.0895 14.0229 19.3232 14.3292 19.5262 14.6866C19.7392 15.0611 19.9109 15.4502 20.0366 15.8426C20.1678 16.2527 20.2783 16.705 20.3647 17.1868C20.4522 17.6758 20.5115 18.1354 20.5405 18.5529V18.5533C20.5703 18.9779 20.5853 19.4217 20.5855 19.8727C20.5853 20.7375 20.3411 21.3905 19.8384 21.8688Z"
                                fill="#121212"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3406_5779">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" mt-2 max-h-[80vh] bg-white">
                          <ProfileNav
                            email={session.data.user.email}
                            name={session.data.user.name}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_3406_5779)">
                              <path
                                d="M11.8286 11.5609C13.4169 11.5609 14.792 10.9913 15.9159 9.86735C17.0394 8.74364 17.6093 7.3687 17.6093 5.78026C17.6093 4.19237 17.0396 2.81726 15.9157 1.69317C14.7918 0.56964 13.4167 0 11.8286 0C10.2402 0 8.86523 0.56964 7.74152 1.69336C6.6178 2.81707 6.04797 4.19219 6.04797 5.78026C6.04797 7.3687 6.6178 8.74382 7.74152 9.86753C8.8656 10.9911 10.2407 11.5609 11.8286 11.5609ZM8.73615 2.6878C9.59839 1.82556 10.6099 1.40643 11.8286 1.40643C13.0472 1.40643 14.0588 1.82556 14.9213 2.6878C15.7835 3.55023 16.2028 4.56188 16.2028 5.78026C16.2028 6.99901 15.7835 8.01048 14.9213 8.87291C14.0588 9.73533 13.0472 10.1545 11.8286 10.1545C10.6102 10.1545 9.59875 9.73515 8.73615 8.87291C7.87372 8.01067 7.45441 6.99901 7.45441 5.78026C7.45441 4.56188 7.87372 3.55023 8.73615 2.6878Z"
                                fill="#121212"
                              />
                              <path
                                d="M21.9434 18.4549C21.911 17.9873 21.8455 17.4772 21.749 16.9385C21.6515 16.3957 21.5261 15.8827 21.376 15.4137C21.2207 14.9291 21.0099 14.4504 20.749 13.9918C20.4786 13.5157 20.1607 13.1011 19.804 12.76C19.431 12.4031 18.9744 12.1162 18.4463 11.9069C17.92 11.6987 17.3369 11.5933 16.713 11.5933C16.468 11.5933 16.2311 11.6938 15.7735 11.9917C15.4919 12.1754 15.1625 12.3878 14.7948 12.6227C14.4804 12.823 14.0545 13.0107 13.5284 13.1806C13.0152 13.3467 12.4941 13.4309 11.9796 13.4309C11.4654 13.4309 10.9443 13.3467 10.4307 13.1806C9.90515 13.0109 9.47906 12.8232 9.16522 12.6229C8.80102 12.3901 8.47144 12.1777 8.18561 11.9915C7.72839 11.6936 7.49145 11.5931 7.24646 11.5931C6.62244 11.5931 6.03943 11.6987 5.51337 11.9071C4.98566 12.116 4.52881 12.403 4.15546 12.7602C3.79877 13.1015 3.4809 13.5159 3.21063 13.9918C2.95007 14.4504 2.73914 14.9289 2.58386 15.4139C2.4339 15.8829 2.30847 16.3957 2.21106 16.9385C2.11438 17.4764 2.04901 17.9867 2.0166 18.4555C1.98474 18.9138 1.96863 19.3908 1.96863 19.8727C1.96863 21.1255 2.36688 22.1397 3.15222 22.8877C3.92786 23.6258 4.95398 24.0001 6.20221 24.0001H17.7584C19.0062 24.0001 20.0323 23.6258 20.8082 22.8877C21.5937 22.1403 21.9919 21.1257 21.9919 19.8725C21.9918 19.389 21.9755 18.912 21.9434 18.4549ZM19.8384 21.8688C19.3259 22.3565 18.6455 22.5937 17.7582 22.5937H6.20221C5.3147 22.5937 4.63428 22.3565 4.12195 21.8689C3.61932 21.3905 3.37506 20.7373 3.37506 19.8727C3.37506 19.423 3.38989 18.979 3.41956 18.5527C3.44849 18.1345 3.50763 17.6751 3.59534 17.1869C3.68195 16.7048 3.79218 16.2524 3.92328 15.8428C4.04907 15.45 4.22064 15.0611 4.43341 14.6865C4.63647 14.3294 4.87012 14.0231 5.12793 13.7762C5.36908 13.5453 5.67303 13.3564 6.03119 13.2147C6.36243 13.0836 6.73468 13.0118 7.13879 13.001C7.18805 13.0272 7.27576 13.0771 7.41785 13.1698C7.70697 13.3582 8.04022 13.5732 8.40863 13.8085C8.82391 14.0732 9.35895 14.3124 9.99817 14.5187C10.6517 14.73 11.3182 14.8373 11.9797 14.8373C12.6413 14.8373 13.308 14.73 13.9611 14.5189C14.6009 14.3122 15.1357 14.0732 15.5516 13.8081C15.9286 13.5671 16.2525 13.3584 16.5416 13.1698C16.6837 13.0773 16.7714 13.0272 16.8207 13.001C17.225 13.0118 17.5972 13.0836 17.9286 13.2147C18.2866 13.3564 18.5906 13.5455 18.8317 13.7762C19.0895 14.0229 19.3232 14.3292 19.5262 14.6866C19.7392 15.0611 19.9109 15.4502 20.0366 15.8426C20.1678 16.2527 20.2783 16.705 20.3647 17.1868C20.4522 17.6758 20.5115 18.1354 20.5405 18.5529V18.5533C20.5703 18.9779 20.5853 19.4217 20.5855 19.8727C20.5853 20.7375 20.3411 21.3905 19.8384 21.8688Z"
                                fill="#121212"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3406_5779">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-2 flex items-center justify-center bg-white px-5 py-3 ">
                          <Link href="/auth/login" className="">
                            Login
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {/* cart */}
                    <Link href="/cart" className="relative ">
                      <svg
                        width="24"
                        height="19"
                        viewBox="0 0 24 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative"
                      >
                        <path
                          d="M23.7083 4.49994C23.4036 4.0553 22.9107 3.77749 22.3561 3.73793L4.10779 2.43465L3.70404 0.538116C3.63739 0.224944 3.34936 0 3.01501 0H0.703125C0.314758 0 0 0.300918 0 0.672207C0 1.0435 0.314758 1.34441 0.703125 1.34441H2.44061L4.85577 12.6909L4.30664 13.8226C4.05029 14.3507 4.09295 14.9591 4.42071 15.4499C4.54962 15.643 4.71478 15.8047 4.90429 15.9308C4.6485 16.2522 4.49615 16.6529 4.49615 17.087C4.49615 18.1419 5.39374 19 6.49713 19C7.60052 19 8.4981 18.1419 8.4981 17.087C8.4981 16.7805 8.42193 16.4906 8.28717 16.2336H15.0829C14.9484 16.4908 14.8722 16.7805 14.8722 17.087C14.8722 18.1419 15.7698 19 16.873 19C17.9764 19 18.8741 18.1419 18.8741 17.087C18.8741 16.7805 18.7978 16.4906 18.6632 16.2336H18.9444C19.3328 16.2336 19.6476 15.9325 19.6476 15.5614C19.6476 15.1901 19.3328 14.8892 18.9444 14.8892H5.91668C5.73431 14.8892 5.63855 14.7754 5.60595 14.7264C5.57318 14.6774 5.50561 14.5466 5.58233 14.3886L6.03991 13.4455H19.9151C20.6688 13.4455 21.342 12.9885 21.5905 12.3084L23.8995 5.98947C24.0828 5.48759 24.0132 4.94457 23.7083 4.49994ZM6.49713 17.6556C6.16919 17.6556 5.9024 17.4005 5.9024 17.087C5.9024 16.7735 6.16919 16.5183 6.49713 16.5183C6.82507 16.5183 7.09185 16.7735 7.09185 17.087C7.09185 17.4005 6.82507 17.6556 6.49713 17.6556ZM16.873 17.6556C16.545 17.6556 16.2783 17.4005 16.2783 17.087C16.2783 16.7735 16.545 16.5183 16.873 16.5183C17.2009 16.5183 17.4679 16.7735 17.4679 17.087C17.4679 17.4005 17.2009 17.6556 16.873 17.6556ZM22.5719 5.54606L20.263 11.865C20.2114 12.0062 20.0715 12.1011 19.9151 12.1011H6.16534L4.39911 3.80375L22.2513 5.07849C22.409 5.08987 22.495 5.18247 22.5322 5.23674C22.5694 5.291 22.6241 5.40339 22.5719 5.54606Z"
                          fill="#121212"
                        />
                      </svg>
                      <div className="absolute -bottom-2 -right-1 h-[20px] w-[20px] rounded-full bg-[#00898F] py-0.5 text-center text-xs text-white">
                        {cartItems}
                      </div>
                    </Link>

                    {/* wishlist */}
                    <Link href="/wishlist" className="relative ">
                      <svg
                        width="22"
                        height="21"
                        viewBox="0 0 22 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.3949 2.14319C19.3098 0.904387 17.8044 0.222168 16.1562 0.222168C13.8382 0.222168 12.3706 1.61514 11.5476 2.78373C11.3341 3.08697 11.1525 3.39103 11 3.67714C10.8475 3.39103 10.6659 3.08697 10.4524 2.78373C9.62943 1.61514 8.16183 0.222168 5.84375 0.222168C4.19555 0.222168 2.69023 0.90443 1.6051 2.14323C0.570066 3.32497 0 4.90764 0 6.5997C0 8.44156 0.714699 10.1547 2.2492 11.9909C3.62063 13.632 5.59363 15.3236 7.87832 17.2825C8.72966 18.0124 9.61005 18.7673 10.5473 19.5924L10.5755 19.6172C10.697 19.7242 10.8485 19.7777 11 19.7777C11.1515 19.7777 11.303 19.7242 11.4245 19.6172L11.4527 19.5924C12.39 18.7673 13.2703 18.0125 14.1218 17.2824C16.4064 15.3237 18.3794 13.632 19.7508 11.9909C21.2853 10.1546 22 8.44156 22 6.5997C22 4.90764 21.4299 3.32497 20.3949 2.14319ZM13.2856 16.2953C12.5517 16.9245 11.7964 17.5721 11 18.2687C10.2036 17.5722 9.44827 16.9246 8.71423 16.2952C4.24295 12.4616 1.28906 9.92896 1.28906 6.5997C1.28906 5.22359 1.74475 3.94545 2.5722 3.00076C3.40914 2.04535 4.57097 1.51916 5.84375 1.51916C7.61101 1.51916 8.75342 2.6146 9.40053 3.53357C9.981 4.35776 10.2839 5.18862 10.3872 5.50755C10.4736 5.77451 10.721 5.95518 11 5.95518C11.279 5.95518 11.5264 5.77451 11.6128 5.50755C11.7161 5.18862 12.019 4.35776 12.5995 3.53352C13.2466 2.6146 14.389 1.51916 16.1562 1.51916C17.429 1.51916 18.5909 2.04535 19.4278 3.00076C20.2553 3.94545 20.7109 5.22359 20.7109 6.5997C20.7109 9.92896 17.7571 12.4616 13.2856 16.2953Z"
                          fill="#121212"
                        />
                      </svg>
                      <div className="absolute -bottom-2 -right-1 h-[20px] w-[20px] rounded-full bg-[#00898F] py-[2px] text-center text-xs text-white">
                        {wishlistedProLength}
                      </div>
                    </Link>
                  </div>
                </div>
                {/* part-2-ends */}
              </div>
            </div>
          </div>
          {/* middle-bar-ends */}
        

          {/* menu-bar-starts */}

          <div className="menu-bar hidden bg-black py-3 md:block">
            {/* <Navmenu /> */}
            <div className="w-full">
              <div className="container mx-auto max-w-full">
                <NavigationMenu className=" mx-auto">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {/* <Link href="/"> */}
                      <NavigationMenuLink
                        href="/"
                        className={`h-full  bg-none px-4 py-2 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg ${pathname === "/" && "rounded-[4px] bg-primary"}`}
                      >
                        Home
                      </NavigationMenuLink>
                      {/* </Link> */}
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      {/* <Link href="/counselling"> */}
                      <NavigationMenuLink
                        href="/counselling"
                        className={`h-full bg-none px-4 py-2 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg ${pathname === "/counselling" && "rounded-[4px] bg-primary"}`}
                      >
                        Book Experts
                      </NavigationMenuLink>
                      {/* </Link> */}
                    </NavigationMenuItem>

                    {categories.length < 1 && (
                      <NavigationMenuItem>
                        {/* <Link href="/counselling"> */}
                        <NavigationMenuLink
                          href="/products"
                          className={`h-full  px-4 py-1 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg ${pathname === "/products" &&"rounded-[4px] bg-primary" }`}
                        >
                          Products
                        </NavigationMenuLink>
                        {/* </Link> */}
                      </NavigationMenuItem>
                    )}

                    {categories.length > 0 && (
                      <NavigationMenuItem>
                        <Link href="/products">
                          <NavigationMenuTrigger className={`h-full px-4  py-1 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg ${pathname === "/products" && 'rounded-[4px] bg-primary'}`}>
                            Products
                          </NavigationMenuTrigger>
                        </Link>
                        <NavigationMenuContent className="p-6 md:w-[300px]">
                          <div className="flex flex-col gap-4">
                            {categories.map((item, index) => {
                              const categoryIds = item.childCategories?.map(
                                (item) => item.id,
                              );

                           
                              return (
                                <>
                                  <div className="flex flex-col gap-2">
                                    <Link
                                      className=""
                                      href={`products?category=${categoryIds?.join("%2C")}`}
                                    >
                                      {" "}
                                      <div className="text-sm font-bold">
                                        {item.name}
                                      </div>
                                    </Link>
                                    <div className="flex flex-col">
                                      {item.childCategories?.map(
                                        (childCategory, childCategoryIndex) => {
                                          return (
                                            <>
                                              <Link
                                                className="text-sm"
                                                href={`products?category=${childCategory.id}`}
                                              >
                                                {childCategory.name}
                                              </Link>
                                            </>
                                          );
                                        },
                                      )}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )}

                    <NavigationMenuItem>
                      {/* <Link href="/"> */}
                      <NavigationMenuLink
                        href="/blogs"
                        className={`h-full  bg-none px-4 py-2 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg ${pathname ==='/blogs' && 'bg-primary rounded-[4px]'}`}
                      >
                        Blogs
                      </NavigationMenuLink>
                      {/* </Link> */}
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      {/* <Link href="/"> */}
                      <NavigationMenuLink
                        target="_blank"
                        href={env.NEXT_PUBLIC_PROFESSIONAL}
                        className="h-full rounded-none bg-none px-4 py-2 text-sm font-medium text-white hover:rounded-[4px] hover:bg-primary md:text-base 2xl:text-lg"
                      >
                        Register as a therapist
                      </NavigationMenuLink>
                      {/* </Link> */}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>

          {/* menu-bar-for-mobile-screen */}
          <div className="bg-black py-3 md:hidden">
            <div className="container mx-auto max-w-full">
              <div className="flex items-center justify-between ">
                <div className="md:hidden">
                  <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
                    <SheetTrigger>
                      <svg
                        onClick={() => setSheetOpen(true)}
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.666 4.5L14.666 4.5"
                          stroke="#ECECEC"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M14.6663 25.8333L1.33301 25.8333"
                          stroke="#ECECEC"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M26.6663 15.1667L1.33301 15.1667"
                          stroke="#ECECEC"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className=" w-full overflow-scroll "
                    >
                      <Accordion type="single">
                        <AccordionItem
                          className="py-2 font-inter text-sm font-medium text-inactive"
                          value=""
                        >
                          <Link href="/" onClick={() => setSheetOpen(false)}>
                            Home{" "}
                          </Link>
                        </AccordionItem>
                        <AccordionItem
                          className="py-2 font-inter text-sm font-medium text-inactive"
                          value=""
                        >
                          <Link
                            href="/counselling"
                            onClick={() => setSheetOpen(false)}
                          >
                            Book Experts
                          </Link>
                        </AccordionItem>
                        {categories.length < 1 && (
                          <AccordionItem
                            className="py-2 font-inter text-sm font-medium text-inactive"
                            value=""
                          >
                            <Link
                              href="/products"
                              onClick={() => setSheetOpen(false)}
                            >
                              Products
                            </Link>
                          </AccordionItem>
                        )}
                        <AccordionItem
                          className="py-2 font-inter text-sm font-medium text-inactive"
                          value=""
                        >
                          <Link
                            href="/blogs"
                            onClick={() => setSheetOpen(false)}
                          >
                            Blogs{" "}
                          </Link>
                        </AccordionItem>

                        <AccordionItem
                          className="py-2 font-inter text-sm font-medium text-inactive"
                          value=""
                        >
                          <Link
                            href="/counselling"
                            onClick={() => setSheetOpen(false)}
                          >
                            Register as a therapist{" "}
                          </Link>
                        </AccordionItem>
                      </Accordion>

                      {categories.length > 0 && (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger
                              className="py-2 font-inter text-sm font-medium text-inactive"
                              value=""
                            >
                              <Link
                                href="/products"
                                onClick={() => setSheetOpen(false)}
                              >
                                Products
                              </Link>
                            </AccordionTrigger>
                            <AccordionContent>
                              {categories.map((category, categoryIndex) => {
                                return (
                                  <>
                                    {category.childCategories && (
                                      <Link href="/products">
                                        <SheetDescription key={categoryIndex}>
                                          <Accordion type="single" collapsible>
                                            <AccordionItem
                                              className="border-none"
                                              value="item-1"
                                            >
                                              <AccordionTrigger className="py-1 pl-4 font-inter text-sm font-bold  text-active ">
                                                {category.name}
                                              </AccordionTrigger>
                                              {category.childCategories.map(
                                                (item, index) => {
                                                  return (
                                                    <>
                                                      <AccordionContent
                                                        key={index}
                                                        className="pb-0 pl-8 font-inter text-sm font-medium text-inactive"
                                                      >
                                                        <Link
                                                          href={`/products?category=${item.id}`}
                                                          onClick={() =>
                                                            setSheetOpen(false)
                                                          }
                                                        >
                                                          {item.name}
                                                        </Link>
                                                      </AccordionContent>
                                                    </>
                                                  );
                                                },
                                              )}
                                            </AccordionItem>
                                          </Accordion>
                                        </SheetDescription>
                                      </Link>
                                    )}
                                  </>
                                );
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}

                      {/* {categories.map((category, categoryIndex) => {
                        return (
                          <>
                            {category.childCategories &&
                            category.childCategories.length > 0 ? (
                              <Link href="#">
                                <SheetDescription key={categoryIndex}>
                                  <Accordion type="single" collapsible>
                                    <AccordionItem
                                      className="border-none"
                                      value="item-1"
                                    >
                                      <AccordionTrigger className="pl-4 font-inter text-base font-medium text-active ">
                                        {category.name}
                                      </AccordionTrigger>
                                      {category.childCategories.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              <AccordionContent
                                                key={index}
                                                className=" pl-8 font-inter text-sm font-medium text-inactive"
                                              >
                                                <Link
                                                  href={`/products?category=${category.id}`}
                                                >
                                                  {item.name}
                                                </Link>
                                                <div className="mt-2 pl-2">
                                                  {item.childCategories &&
                                                    item.childCategories.map(
                                                      (child, index) => {
                                                        return (
                                                          <>
                                                            <Link
                                                              href={`/products?category=${child.id}`}
                                                              key={index}
                                                              className="flex flex-col gap-1"
                                                            >
                                                              {child.name}
                                                            </Link>
                                                          </>
                                                        );
                                                      },
                                                    )}
                                                </div>
                                              </AccordionContent>
                                            </>
                                          );
                                        },
                                      )}
                                    </AccordionItem>
                                  </Accordion>
                                </SheetDescription>
                              </Link>
                            ) : (
                              <Link href="#">
                                {" "}
                                <SheetDescription className=" py-2 pl-4 font-inter text-base  font-medium text-active 2xl:text-[19px]">
                                  {category.name}
                                </SheetDescription>
                              </Link>
                            )}
                          </>
                        );
                      })} */}
                      <div className="mt-3  text-left">
                        {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}

                        <Link
                          href="/auth/login"
                          onClick={() => setSheetOpen(false)}
                        >
                          {" "}
                          <SheetDescription className="text-center">
                            <Button
                              className=" mt-[46px]"
                              variant="login"
                              size="large"
                            >
                              Login
                            </Button>
                          </SheetDescription>
                        </Link>

                        <Link href="#">
                          {" "}
                          <SheetDescription className="mt-2.5 ">
                            <div className="flex flex-wrap items-center justify-center gap-4 gap-y-1">
                              <div className="font-inter text-sm font-normal text-active">
                                Don't have Vyan Account
                              </div>
                              <Link
                                onClick={() => setSheetOpen(false)}
                                href="/auth/register"
                                className="font-poppins text-sm font-medium text-primary hover:underline  "
                              >
                                Create account{" "}
                                <svg
                                  className="ml-2 inline"
                                  width="15"
                                  height="8"
                                  viewBox="0 0 15 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1.13634 3.36357L12.3273 3.36357L10.2318 1.26807C9.98332 1.01959 9.98332 0.616643 10.2318 0.368122C10.4803 0.119643 10.8833 0.119643 11.1318 0.368122L14.3136 3.54994C14.5621 3.79842 14.5621 4.20136 14.3136 4.44989L11.1318 7.6317C11.0075 7.75596 10.8447 7.81812 10.6818 7.81812C10.5189 7.81812 10.3561 7.75596 10.2318 7.6317C9.98332 7.38322 9.98332 6.98028 10.2318 6.73176L12.3273 4.6363L1.13634 4.6363C0.7849 4.6363 0.499979 4.35138 0.499979 3.99993C0.499979 3.64849 0.7849 3.36357 1.13634 3.36357Z"
                                    fill="#00898F"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </SheetDescription>
                        </Link>

                        <Link href="#">
                          {" "}
                          <SheetDescription className="pb-2.5  pt-10">
                            <div className="relative aspect-[1/1] w-full ">
                              <Image
                                src="/images/sidebar.png"
                                alt="sidebar"
                                fill
                                className="max-w-auto h-full"
                              />
                            </div>
                          </SheetDescription>
                        </Link>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-[230px] rounded-md border bg-black p-2 pl-[38px]"
                  />

                  <svg
                    className="absolute left-[9px]  top-3"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="8.70458"
                      cy="9.14131"
                      rx="7.59325"
                      ry="7.53022"
                      stroke="#ECECEC"
                      stroke-width="1.20637"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.9961 15.6389L17.7775 19.3889"
                      stroke="#ECECEC"
                      stroke-width="1.20637"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* menu-bar-ends */}
        </div>
      </div>
    </>
  );
};
export default Header;
