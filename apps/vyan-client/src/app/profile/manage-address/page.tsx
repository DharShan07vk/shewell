"use server";
import ProfileNav from "~/components/profile-nav";
import AddressCard from "./address-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/src/@/components/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import AddressForm from "./address-form";
import { IAddressForm } from "~/models/address.model";
import AddressPopUp from "./address-popup";
export default async function ManageAddress() {
  const session = await getServerSession();
  const userDetails = await db.user.findUnique({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      name: true,
    },
    where: {
      email: session?.user.email!,
    },
  });
  const countries = await db.country.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      active: true,
    },
  });

  console.log("countries are", countries);
  const addedAddresses = await db.address.findMany({
    select: {
      id: true,
      name: true,
      city: true,
      houseNo: true,
      area: true,
      mobile: true,
      landmark: true,
      pincode: true,
      addressType: true,
      countryId: true,
      stateId: true,
    },
    where: {
      userId: userDetails?.id,
      deletedAt: null,
    },
  });
  console.log("addresses", addedAddresses);
  console.log("countries", countries);
  console.log("session user id", session?.user.id);
  return (
    <>
      <div className="w-full bg-[#FBFBFB] font-inter">
        <div className="container mx-auto max-w-full">
          <div className="py-4 md:py-6 xl:py-[28px] 2xl:py-[32px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Manage Addresses</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="pb-[32px] lg:pb-[55px] xl:pb-[60px] 2xl:pb-[65px]">
            <div className="items-start justify-between xl:flex xl:flex-row xl:justify-center xl:gap-[46px] 2xl:gap-[60px] ">
              {/* <div className="hidden xl:block 2xl:w-[375px] xl:w-[343px]">
                <ProfileNav
                  email={userDetails?.email!}
             name={userDetails?.name!}
                />
              </div> */}
              <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:p-10">
                <div className="mb-10 flex items-center gap-3 font-poppins text-xl font-semibold text-[#181818] lg:text-2xl xl:text-3xl">
                  <svg
                    className="size-6 xl:size-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.3307 16H6.66406"
                      stroke="#434343"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.9974 25.3334L6.66406 16.0001L15.9974 6.66675"
                      stroke="#434343"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Manage Addresses
                </div>
                <div className="mb-8 flex-wrap text-center font-inter text-sm font-normal text-[#666666] xl:px-[105px] 2xl:px-[180px]">
                  Quickly add new delivery addresses to your account and choose
                  your preferred default for faster checkouts.
                </div>
                <div className="grid grid-cols-1 gap-y-6 2xl:gap-8">
                  <AddressPopUp
                    addedAddresses={addedAddresses}
                    countries={countries}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
