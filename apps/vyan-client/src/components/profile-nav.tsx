"use client";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "~/components/ui/navigation-menu";
import ProfileNavChild from "./profile-nav-child";
import { Button } from "@repo/ui/src/@/components/button";
import { signOut } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCartStore } from "~/store/cart.store";
const profile = [
  {
    path: "/profile/edit-profile",
    img: "/icons/profile-nav/profile-nav.svg",
    title: "Edit Profile",
  },
  {
    path: "/profile/manage-address",
    img: "/icons/profile-nav/profile-add.svg",
    title: "Manage Addresses",
  },
  {
    path: "/profile/notification",
    img: "/icons/profile-nav/profile-notif.svg",
    title: "Notification",
  },
];
const account = [
  {
    path: "/profile/orders",
    img: "/icons/profile-account/profile-ord.svg",
    title: "Orders",
  },

  {
    path: "/profile/appointments",
    img: "/icons/profile-account/profile-cal.svg",
    title: "Appointments",
  },
];
interface IProfileProps {
  userProfile: {
    email: string;
    title: string;
  };
}
const ProfileNav = ({ email, name }: { email: string; name: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { emptyCart } = useCartStore((state) => {
    return {
      emptyCart: state.emptyCart,
    };
  });
  return (
    <>
      <div className="xl:w-[343px] 2xl:w-[375px] ">
        {/* image + email*/}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 ">
            <div
              className="relative aspect-square cursor-pointer"
              onClick={() => router.push("/profile/edit-profile")}
            >
              <Image
                fill={true}
                src="/profile-user.png"
                alt=""
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-inter text-base font-semibold text-active">
              {name}
            </div>
            <div className="font-inter text-sm font-normal text-inactive ">
              {email}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* profile */}
          <div>
            <div className="mt-5 pl-5 font-inter text-lg font-bold text-active">
              Profile
            </div>
            {profile &&
              profile.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className={`hover:bg-[#E6F4EE] ${pathname === item.path ? "bg-[#E6F4EE]" : ""}`}
                    >
                      <div className="px-6 py-[14px]">
                        <ProfileNavChild profileChild={item} />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          {/* Account */}
          <div>
            <div className="pl-5 font-inter text-lg font-bold text-active">
              Account
            </div>
            {account &&
              account.map((item, index) => {
                return (
                  <>
                    <div
                      className={`hover:bg-[#E6F4EE] ${pathname === item.path ? "bg-[#E6F4EE]" : ""}`}
                    >
                      <div className="px-6 py-[14px]">
                        <ProfileNavChild profileChild={item} />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="mb-3 mt-3 px-3 text-center">
          <Button
            className=" border-text-active w-full rounded-md border bg-white py-[14px] text-black hover:bg-primary hover:text-white"
            onClick={() => {
              signOut({ redirect: false }).then(() => router.push("/"));
              emptyCart();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProfileNav;
