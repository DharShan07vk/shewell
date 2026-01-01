import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@repo/ui/src/@/components/navigation-menu";
interface ICategoryProps {
    categories: {
      id: string;
      name: string;
    }[];
  }
import { useRouter } from "next/navigation";
const ProductsHeader = ({categories}:ICategoryProps) => {
    const router = useRouter()
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger onClick={() => router.push("/products")} className="hover:bg-primary rounded-none py-[18px] px-4 text-white ">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col gap-5 w-full  bg-white items-center justify-center">
                {categories.map( (item,index) => {
                    return(
                        <>
                      <div key={index}>
                      {item.name}
                      </div>
                        </>
                    )
                })}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default ProductsHeader;
