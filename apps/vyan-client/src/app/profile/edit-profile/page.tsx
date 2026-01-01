"use server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/src/@/components/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/src/@/components/tabs";
import ProfileNav from "~/components/profile-nav";
import ManagePasswordForm from "./manage-password-form";
import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import PersonalInformationForm from "./personal-information-form";

const EditProfile = async () => {
  const session = await getServerSession();
  const userDetails = await db.user.findFirst({
    select: {
      email: true,
      phoneNumber: true,
      name: true,
      passwordHash: true,
    },
    where: {
      email: session?.user.email!,
    },
  });


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
                  <BreadcrumbLink>
                    Edit Profile
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="pb-[32px] lg:pb-[55px] xl:pb-[60px] 2xl:pb-[65px]">
            <div className="items-start justify-between xl:flex xl:flex-row xl:justify-center xl:gap-[46px] 2xl:gap-[60px] ">
              <div className="b w-full rounded-md border border-border-400 bg-white px-6 py-9">
                <div className="mb-10 text-base  text-[#181818] lg:text-xl font-semibold xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
                  <svg
                    className="mr-2 inline size-[18px] lg:size-6 xl:size-[28px] 2xl:size-[32px] "
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.3307 16H6.66406"
                      stroke="#434343"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9974 25.3334L6.66406 16.0001L15.9974 6.66675"
                      stroke="#434343"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Edit Profile 
                </div>
                <div>
                  <Tabs defaultValue="Personal Information">
                    <TabsList className="text-black-200 flex justify-center gap-10 text-lg font-medium ">
                      <TabsTrigger
                        className="border-b-primary pb-[6px] data-[state=active]:border-b-2 "
                        value="Personal Information"
                      >
                        Personal Information
                      </TabsTrigger>
                      <TabsTrigger
                        className="border-b-primary pb-[6px] data-[state=active]:border-b-2"
                        value="Manage Password"
                      >
                        Manage Password
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="Personal Information">
                      <PersonalInformationForm user={userDetails} />
                    </TabsContent>
                    <TabsContent value="Manage Password">
                      <ManagePasswordForm email={userDetails?.email!} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
