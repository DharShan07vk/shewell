// 'use client'
// import Link from "next/link";
// import { useRef, useState } from "react";
// const ProductDescRevFaq = () => {
//     const [selectedItem, setSelectedItem] = useState("Description");
//     return(
//         <>
//          <div className="flex justify-between border-b-[1px] border-border-color pb-[6px]  md:justify-normal md:gap-[40px]">
//             <Link
//            onClick={() => setSelectedItem( "Description")}
//               className={`font-inter text-base font-medium 2xl:text-lg ${selectedItem === "Description" ? "border-b-4 border-secondary " : "hover:border-b-4 hover:border-primary"}`}

//               href="#1"

//             >
//               Description
//             </Link>
//             <Link
//            onClick={() => setSelectedItem("Reviews")}
//               className={`font-inter text-base font-medium  2xl:text-lg ${selectedItem === "Reviews" ? "border-b-4 border-secondary" : "hover:border-b-4 hover:border-primary"}`}

//               href="#2"
//             >
//               Reviews
//             </Link>
//             <Link
//              onClick={() => setSelectedItem( "FAQ")}
//               className={`font-inter text-base font-medium hover:border-b 2xl:text-lg ${selectedItem === "FAQ" ? "border-b-4 border-secondary" : "hover:border-b-4 hover:border-primary"} `}

//               href="#3"
//             >
//               FAQ
//             </Link>
//           </div>
//         </>
//     )
// }
// export default ProductDescRevFaq
"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/src/@/components/tabs";
import ProductDescription from "./product-description";
import ProductReview from "./product-review";
import { IReview } from "~/models/review.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/src/@/components/accordion";

const ProductDescRevFaq = ({
  productDescription,
  productReview,
  productFAQ,
}: {
  productDescription: string;
  productReview: IReview[];
  productFAQ: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
}) => {
  return (
    <>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="overflow-item mb-[22px] flex flex-row items-center gap-10 border-b border-b-[#C0C0C0] pb-[11px] lg:mb-6 2xl:mb-[30px] ">
          <TabsTrigger
            className="font-inter text-base font-medium hover:border-b-4 hover:border-primary data-[state=active]:border-b-2 data-[state=active]:border-primary 2xl:text-lg "
            value="description"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            className="font-inter text-base font-medium hover:border-b-4 hover:border-primary data-[state=active]:border-b-2 data-[state=active]:border-primary 2xl:text-lg"
            value="reviews"
          >
            {" "}
            Reviews
          </TabsTrigger>
          <TabsTrigger
            className="font-inter text-base font-medium hover:border-b-4 hover:border-primary data-[state=active]:border-b-2 data-[state=active]:border-primary 2xl:text-lg"
            value="faq"
          >
            {" "}
            FAQ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProductDescription description={productDescription} />
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReview productReview={productReview} />
        </TabsContent>
        <TabsContent value="faq">
          <div id="FAQ" className="">
            <div className="mb-5 flex items-center gap-4 text-[20px] font-medium leading-[30px] text-black xl:mb-6 xl:gap-5 xl:text-2xl">
              Frequently Asked Questions
            </div>

            {productFAQ.length > 0 ? (
              productFAQ
                .sort((a, b) => a.order - b.order)
                .map((f, index) => (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      key={index}
                    >
                      <AccordionItem
                        value={f.id}
                        className="mb-5 rounded-xl border border-[#ECECEC] p-6 lg:p-4"
                      >
                        <AccordionTrigger className="text-sm font-medium  text-black-300 lg:text-base xl:text-lg">{`${f.question} `}</AccordionTrigger>
                        <AccordionContent className="text-black-200 py-6 text-sm font-normal">
                          {`${f.answer} .`}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                ))
            ) : (
              <>
                <div>No faq's are available for this product</div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default ProductDescRevFaq;
