'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@repo/ui/src/@/components/breadcrumb";

import Image from "next/image"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@repo/ui/src/@/components/accordion"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import InvoicePdf from "./invoice/invoice-pdf";
import { IOrderDetail } from "~/models/order.model";
import { useCartStore } from "~/store/cart.store";
import { Button } from "~/components/ui/button";
const OrderDetail=({order}:{order:IOrderDetail})=>{
    const {cart} = useCartStore((state)=>({
        cart:state.cart
    }))
 const handleInvoice = () => {
            router.push(`/profile/orders/${order.id}/invoice`);
          };

    const router=useRouter()
    const {buyNow} = useCartStore((state)=>{
        return{
            buyNow:state.buyNow
        }
    })
    return(
        <>
        <div className="flex flex-col items-start w-full">

<div className="2xl:py-[30px] xl:py-7 lg:py-6 py-[18px]">
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/profile/orders">Order</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage >Order Detail</BreadcrumbPage>
    </BreadcrumbItem>


  </BreadcrumbList>
</Breadcrumb>
                </div>

<div className="w-full font-inter 2xl:py-9 2xl:px-6 xl:py-8 lg:py-[28px] lg:px-5 py-4 px-2 border border-[#CDDEAD] rounded-md">
    <div className="2xl:mb-10 xl:mb-9 lg:mb-[30px] mb-6 2xl:text-[28px] 2xl:leading-[38px] xl:text-2xl lg:text-xl text-base font-medium text-black-400 lg:font-semibold">
        <svg className="mr-2 inline 2xl:size-[32px] xl:size-[28px] lg:size-6 size-[18px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3307 16H6.66406" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.9974 25.3334L6.66406 16.0001L15.9974 6.66675" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        Order Details
    </div>
    <div className="lg:grid grid-cols-4 hidden rounded-md  bg-[#F0F7F8] lg:px-4 lg:py-2.5 xl:px-5 xl:py-[14px] 2xl:px-[37px] 2xl:py-[22px]">
        <div className="flex flex-col items-center justify-center gap-[3px]">
            <div className=" text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Order Placed
            </div>
            <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-active xl:text-base">
            {order.orderPlaced && format(order.orderPlaced, "dd MMM yyyy")}                            </div>
        </div>
        <div className="flex flex-col items-center gap-[3px]">
            <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Total
            </div>
            <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-primary xl:text-base">
                {`Rs. ${order.totalInCent/100}`}
            </div>
        </div>
        <div className="flex flex-col items-center gap-[3px]">
            <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Ship To
            </div>
            <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-primary xl:text-base">
                {order.address.name}
            </div>
        </div>
        <div className="flex flex-col items-center gap-[3px]">
            <div className="text-sm font-normal text-black-400 lg:font-semibold xl:text-base 2xl:text-lg">
                Order Id
            </div>{" "}
            <div className="text-xs font-medium text-[#8F8F8F] lg:text-sm lg:text-inactive xl:text-base">
                {`#${order.id}`}
            </div>
        </div>
    </div>
    <div className="lg:px-[15px] lg:py-[30px] xl:px-5 xl:py-9 2xl:px-[41px] 2xl:py-8 ">
        <div>
            <div className="lg:flex hidden 2xl:flex-row justify-between 2xl:mb-9 xl:mb-8 lg:mb-6">
                <div className="flex 2xl:flex-row flex-col lg:gap-y-5 gap-y-4 justify-around w-8/12 2xl:w-10/12">
                    {/* Payment Info */}
                    {/* <div>
                        <div className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-4">Payment Information</div>
                    </div> */}

                    {/* Shipping Info */}
                    <div >
                        <div className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-4">Shipping Information</div>
                        <div className="flex flex-col mb-2">
                            <div className="2xl:text-base text-sm font-medium text-black-300">{order.address.name}</div>
                            <div className="2xl:text-base text-sm font-normal text-black-200">{`Mobile : ${order.address.mobile}`}</div>
                            <div className="2xl:text-base text-sm font-normal text-black-200">{`${order.address.area} ${order.address.pincode}`}</div>
                        </div>

                    </div>

                    {/* Order summary */}
                    <div className="2xl:w-[289px]">
                        <div className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-4">Order Summary <span>{`(${order.lineItems.length} item)`}</span></div>
                        <div className="p-3 border border-[#E5E5E5] rounded-md flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="2xl:text-base text-sm font-normal text-black-200">Subtotal</div>
                                <div className="2xl:text-base text-sm font-medium  text-black-400">{`Rs. ${order.subTotalInCent/100}`}</div>
                            </div>

                            {order.coupon && order.couponId &&(

               <div className="flex items-center justify-between">
               <div className="2xl:text-base text-sm font-normal text-black-200">
                 {`Discount ${ order.discountInCent && order.discountInCent > 0 ? order.coupon.isPercent ? `(${order.coupon.amount})%`:`(${order.coupon.amount}off)`:""}`}
               </div>
               <div className="font-medium 2xl:text-base text-sm text-[#CA0000]">
                {`-Rs. ${order.discountInCent}`}

               </div>
             </div>
            )}

                            <div className="flex items-center justify-between">
                                <div className="2xl:text-base text-sm font-normal text-black-200">Delivery Fee</div>
                                <div className="font-medium 2xl:text-base text-sm text-black-400">{`Rs. ${order.deliveryFeesInCent}`}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="2xl:text-base text-sm font-normal text-black-400">Total</div>
                                <div className="font-medium 2xl:text-base text-sm text-black-400">{`Rs. ${order.totalInCent/100}`}</div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Buttons */}
                <div className="flex flex-col gap-4">
                    <Button variant="buyAgain" className="hover:bg-primary hover:text-white hover:border hover:border-transparent" size="large">Track Order</Button>
                    <Button variant="buyAgain" className="hover:bg-primary hover:text-white hover:border hover:border-transparent flex items-center justify-center" size="large">Cancel Order</Button>
                    <Button onClick={handleInvoice} variant="buyAgain" className="hover:bg-primary hover:text-white hover:border hover:border-transparent flex items-center justify-center" size="large">Invoice</Button>
                </div>
            </div>
            <div className="mb-[28px] flex items-start justify-between xl:mb-8 2xl:mb-9 ">
                <div className="">
                    <div className="mb-5 2xl:mb-[28px] ">
                        <div className="text-2xl font-semibold text-primary md:text-xl xl:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
                           {order.expectedDelivery && `Delivery on ${format(order.expectedDelivery,"dd MMM yyyy")}`}
                        </div>
                        {/* <div className="lg:block hidden text-sm font-normal text-inactive">
                            Delivery to resident location
                        </div> */}
                    </div>

                    {order.lineItems.map((item) => (
                        <div className="flex flex-row gap-3 lg:gap-5 xl:gap-6 2xl:gap-10 mb-5 ">
                            <div className="xs:h-24 relative aspect-[1/1] h-20 sm:h-[113px] md:h-40 lg:h-[125px] xl:h-[167px]">
                    <Image
                      fill={true}
                      src={
                        item.productVariant.product?.media[0]?.media?.fileUrl ||
                        "/product-fallback.png"
                      }
                      alt="product-img"
                    />
                  </div>
                            <div className="flex flex-col gap-2 lg:gap-4 xl:gap-[18px] 2xl:gap-[21px]">
                                <div className="text-primary text-xs block lg:hidden font-semibold ">
                                    Order Id : <span className="font-normal text-black-200">{`# ${order.id}`}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-base truncate w-[150px] sm:w-[250px] font-semibold text-active xl:text-lg">
                                        {item.productVariant.product?.name}
                                    </div>

                                </div>
                                <div className="flex flex-row gap-4 lg:gap-8 ">

                 <Button className="py-1 px-2 text-sm flex md:hidden" variant="buyAgain" size="small" onClick={()=>{
                                        router.push('/cart');
                                        buyNow(item.productVariant.product!,1,item.productVariant)
                                    }}>
                                        Buy Again
                                    </Button>

                                    <Button className="hidden md:block" variant="buyAgain" size="small" onClick={()=>{
                                        router.push('/cart');
                                        buyNow(item.productVariant.product!,1,item.productVariant)
                                    }}>
                                        Buy Again
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            <div className="block lg:hidden">
                <div className="text-base font-semibold text-black-300 mb-3">
                    Order Information
                </div>
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="Track order" className="py-[18px] border-b border-b-[#CDDEAD]">
                        <AccordionTrigger  className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-3">Track order</AccordionTrigger>
                        <AccordionContent className="px-[6px]">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    {/* <AccordionItem value="Payment Method" className="py-[18px] border-b border-b-[#CDDEAD]">
                        <AccordionTrigger  className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-3">Payment Method</AccordionTrigger>
                        <AccordionContent className="px-[6px]" >

                            <div className="flex flex-col mb-2">
                                <div className="2xl:text-base text-sm font-normal text-black-200">UPI ID - 980288320@paytm</div>
                                <div className="2xl:text-base text-sm font-normal text-black-200">Transcation on 14:56pm by upi id</div>
                            </div>

                        </AccordionContent>
                    </AccordionItem > */}
                    <AccordionItem value="Shipping Information" className="py-[18px] border-b border-b-[#CDDEAD]">
                        <AccordionTrigger  className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-3">Shipping Information</AccordionTrigger>
                        <AccordionContent className="px-[6px]">

                            <div className="flex flex-col mb-2">
                                <div className="2xl:text-base text-sm font-medium text-black-300">{order.address.name}</div>
                                <div className="2xl:text-base text-sm font-normal text-black-200">{`Mobile : ${order.address.mobile}`}</div>
                                <div className="2xl:text-base text-sm font-normal text-black-200">{`${order.address.area} ${order.address.pincode}`}</div>
                            </div>


                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Order Summary" className="py-[18px] border-b border-b-[#CDDEAD]">
                        <AccordionTrigger className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-3">{`Order Summary (${order.lineItems.length} item)`}</AccordionTrigger>
                        <AccordionContent className="px-[6px]">

                            <div className="p-3 border border-[#E5E5E5] rounded-md flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <div className="2xl:text-base text-sm font-normal text-black-200">Subtotal</div>
                                    <div className="2xl:text-base text-sm font-medium  text-black-400">{`Rs. ${order.subTotalInCent/100}`}</div>
                                </div>
                                {order.coupon && order.couponId && (
                                    <>
                                      <div className="flex items-center justify-between">
                                    <div className="2xl:text-base text-sm font-normal text-black-200">
                                    {`Discount ${ order.discountInCent && order.discountInCent > 0 ? order.coupon.isPercent ? `(${order.coupon.amount})%`:`(${order.coupon.amount}off)`:""}`}
                                    </div>
                                    <div className="font-medium 2xl:text-base text-sm text-[#CA0000]">{`- Rs.${order.discountInCent}`}</div>
                                </div>
                                    </>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="2xl:text-base text-sm font-normal text-black-200">Delivery Fee</div>
                                    <div className="font-medium 2xl:text-base text-sm text-black-400">{`Rs. ${order.deliveryFeesInCent}`}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="2xl:text-base text-sm font-normal text-black-400">Total</div>
                                    <div className="font-medium 2xl:text-base text-sm text-black-400">{`Rs. ${order.totalInCent/100}`}</div>
                                </div>
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Invoice" className="py-[18px] border-b border-b-[#CDDEAD]">
                        <AccordionTrigger className="2xl:text-lg lg:text-base text-sm font-semibold text-black-300 mb-3 " >Invoice</AccordionTrigger>
                        <AccordionContent className="px-[6px]">
<InvoicePdf orderInfo={order} orderId={order.id}/>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </div>
    </div>
</div>
</div>


        </>
    )
}

export default OrderDetail;
