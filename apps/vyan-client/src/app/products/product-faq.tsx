import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@repo/ui/src/@/components/accordion";
  import { Button } from "@repo/ui/src/@/components/button";
const ProductFAQ = () => {
    return(
        <>
        <div id="3" className="flex flex-col gap-5 xl:gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <h3 className="xl:text-6 font-inter text-base font-semibold md:text-[20px] md:leading-[30px] ">
                Frequently Asked Questions
              </h3>
              <div>
                <Button>Ask Question</Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem
                    className="rounded-xl border border-border-color p-4 md:p-6"
                    value="item-1"
                  >
                    <AccordionTrigger className=" py-0 font-inter text-sm font-medium text-active no-underline hover:no-underline md:text-base  xl:text-lg">
                      This is my accordions heading. I hope you like it!
                    </AccordionTrigger>
                    <AccordionContent className="mt-6 text-justify font-inter text-sm font-normal text-inactive">
                      Aliquam vel convallis felis, id rhoncus nibh. Integer quis
                      interdum massa, quis mollis leo. Proin a magna sit amet
                      leo sagittis varius. Vestibulum sit amet accumsan justo.
                      Quisque ornare, eros sit amet maximus rutrum, orci odio
                      varius mauris, ut pretium urna dui ac quam. Nunc in
                      fringilla velit, eget volutpat urna.Aliquam vel convallis
                      felis, id rhoncus nibh. Integer quis interdum massa, quis
                      mollis leo. Proin a magna sit amet leo sagittis varius.
                      Vestibulum sit amet accumsan justo. Quisque ornare, eros
                      sit amet maximus rutrum, orci odio varius mauris, ut
                      pretium urna dui ac quam. Nunc in fringilla velit, eget
                      volutpat urna.Aliquam vel convallis felis, id rhoncus
                      nibh. Integer quis interdum massa, quis mollis leo. Proin
                      a magna sit amet leo sagittis varius. Vestibulum sit amet
                      accumsan justo. Quisque ornare, eros sit amet maximus
                      rutrum, orci odio varius mauris, ut pretium urna dui ac
                      quam. Nunc in fringilla velit, eget volutpat urna.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem
                    className="rounded-xl border border-border-color p-4 md:p-6"
                    value="item-1"
                  >
                    <AccordionTrigger className=" py-0 font-inter text-sm font-medium text-active no-underline hover:no-underline md:text-base  xl:text-lg">
                      This is my accordions heading. I hope you like it!
                    </AccordionTrigger>
                    <AccordionContent className="mt-6 text-justify font-inter text-sm font-normal text-inactive">
                      Aliquam vel convallis felis, id rhoncus nibh. Integer quis
                      interdum massa, quis mollis leo. Proin a magna sit amet
                      leo sagittis varius. Vestibulum sit amet accumsan justo.
                      Quisque ornare, eros sit amet maximus rutrum, orci odio
                      varius mauris, ut pretium urna dui ac quam. Nunc in
                      fringilla velit, eget volutpat urna.Aliquam vel convallis
                      felis, id rhoncus nibh. Integer quis interdum massa, quis
                      mollis leo. Proin a magna sit amet leo sagittis varius.
                      Vestibulum sit amet accumsan justo. Quisque ornare, eros
                      sit amet maximus rutrum, orci odio varius mauris, ut
                      pretium urna dui ac quam. Nunc in fringilla velit, eget
                      volutpat urna.Aliquam vel convallis felis, id rhoncus
                      nibh. Integer quis interdum massa, quis mollis leo. Proin
                      a magna sit amet leo sagittis varius. Vestibulum sit amet
                      accumsan justo. Quisque ornare, eros sit amet maximus
                      rutrum, orci odio varius mauris, ut pretium urna dui ac
                      quam. Nunc in fringilla velit, eget volutpat urna.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem
                    className="rounded-xl border border-border-color p-4 md:p-6"
                    value="item-1"
                  >
                    <AccordionTrigger className=" py-0 font-inter text-sm font-medium text-active no-underline hover:no-underline md:text-base  xl:text-lg">
                      This is my accordions heading. I hope you like it!
                    </AccordionTrigger>
                    <AccordionContent className="mt-6 text-justify font-inter text-sm font-normal text-inactive">
                      Aliquam vel convallis felis, id rhoncus nibh. Integer quis
                      interdum massa, quis mollis leo. Proin a magna sit amet
                      leo sagittis varius. Vestibulum sit amet accumsan justo.
                      Quisque ornare, eros sit amet maximus rutrum, orci odio
                      varius mauris, ut pretium urna dui ac quam. Nunc in
                      fringilla velit, eget volutpat urna.Aliquam vel convallis
                      felis, id rhoncus nibh. Integer quis interdum massa, quis
                      mollis leo. Proin a magna sit amet leo sagittis varius.
                      Vestibulum sit amet accumsan justo. Quisque ornare, eros
                      sit amet maximus rutrum, orci odio varius mauris, ut
                      pretium urna dui ac quam. Nunc in fringilla velit, eget
                      volutpat urna.Aliquam vel convallis felis, id rhoncus
                      nibh. Integer quis interdum massa, quis mollis leo. Proin
                      a magna sit amet leo sagittis varius. Vestibulum sit amet
                      accumsan justo. Quisque ornare, eros sit amet maximus
                      rutrum, orci odio varius mauris, ut pretium urna dui ac
                      quam. Nunc in fringilla velit, eget volutpat urna.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </>
    )
}
export default ProductFAQ