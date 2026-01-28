import { db } from "~/server/db";
import Blogs from "./(blogs)/blogs";
;
import MyAppointments from "./(my-appointments)/appointments";
import Subscribe from "./(subscribe)/subscribe";
import EditProfileHomePage from "./components/edit-profile-home-page";
import Hero from "./components/hero";
import PremiumMembership from "./components/premium-membership";
import WhyVyan from "./components/why-vyan";
import { HomeBannerType } from "@repo/database";

export default async function Home() {
  
  
    const heroMedias = await db.homeBanner.findMany({
      select:{
        id : true,
        url : true,
        media :{
          select:{
            id : true,
            fileUrl : true
          }
        }
      },
      where:{
        active : true,
        usedFor : HomeBannerType.HomeBannerDoctor
      }
    })
  return (
    <>
      <div className="min-h-screen bg-white">
        <Hero heroMedias={heroMedias} />
        <MyAppointments />
        <PremiumMembership />
        <EditProfileHomePage />
        <WhyVyan />
        <Blogs />
        <Subscribe />
      </div>
    </>
  );
}
