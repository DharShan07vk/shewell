"use client";

import { useRef } from "react";

import html2pdf from "html2pdf.js";
import { format } from "date-fns";
import { IOrderDetail } from "~/models/order.model";

const InvoicePdf = ({
  orderInfo,
  orderId,
}: {
  orderInfo: IOrderDetail;
  orderId: string;
}) => {
  const invoiceRef = useRef(null);
  const handlePrint = () => {
   

    const opt = {
      margin: 1,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };
    const element = invoiceRef.current;
    html2pdf().from(element!).set(opt).save(`invoice-${orderId}.pdf`);
  };
  return (
    <>
      <div
        ref={invoiceRef}
        className="mx-auto rounded-lg bg-white px-8 py-10 shadow-lg"
      >
        <div className="mb-8 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <div style={{display:"flex",
            flexDirection:"row",
            alignItems:"center"
          }} className="flex flex-row items-center">
            <img
              className="mr-2 h-13 w-13"
              src="/images/vyan-logo.png"
              alt="Logo"
            />
            {/* <div className="text-lg font-semibold text-gray-700">
              NatureHunt
            </div> */}
          </div>
          <div className="text-gray-700">
            <div className="mb-2 text-base sm:text-xl font-bold">INVOICE</div>
            <div className="text-sm">
              Date: {orderInfo.orderPlaced && format(orderInfo.orderPlaced, "dd MMM yyyy")}
            </div>
            <div className="text-sm">Invoice #: INV12345</div>
          </div>
        </div>
        <div className="mb-8 border-b-2 border-gray-300 pb-8">
          <h2 className="mb-4 text-base sm:text-2xl font-bold">Bill To:</h2>
          <div className="mb-2 text-gray-700">{orderInfo?.address.name}</div>
          <div className="mb-2 text-gray-700">{`${orderInfo?.address.landmark}`}</div>
          <div className="mb-2 text-gray-700">{`${orderInfo.address.houseNo} ,${orderInfo?.address.area} ,${orderInfo?.address.city}, ${orderInfo.address.landmark} `}</div>

        </div>
        <table className="mb-8 w-full text-left">
          <thead >
            <tr className="">
              <th className="text-xs sm:text-base py-2 sm:font-bold uppercase text-gray-700">
                Description
              </th>
              <th className="text-xs sm:text-base py-2 sm:font-bold uppercase text-gray-700">
                Quantity
              </th>
              <th className="text-xs sm:text-base py-2 sm:font-bold uppercase text-gray-700">Price</th>
              <th className="text-xs sm:text-base py-2 sm:font-bold uppercase text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderInfo?.lineItems.map((i, index) => (
              <>
                <tr>
                  <td className="text-sm sm:text-base py-4 text-gray-700">Product - {index + 1}</td>
                  <td className="text-sm sm:text-base py-4 text-gray-700">{i.quantity}</td>
                  <td className="text-sm sm:text-base py-4 text-gray-700">{`Rs. ${(i.subTotalInCent / i.quantity)/100 } `}</td>
                  <td className="text-sm sm:text-base py-4 text-gray-700">{`Rs. ${i.subTotalInCent/100}`}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="mb-8 flex justify-end">
          <div className="text-sm sm:text-base mr-2 text-gray-700">Subtotal:</div>
          <div className="text-sm sm:text-base text-gray-700">{`Rs. ${orderInfo?.subTotalInCent!/100}`}</div>
        </div>

{orderInfo.couponId && orderInfo.coupon &&(
  <>
    <div className="mb-8 flex justify-end">
    <div className="text-sm sm:text-base mr-2 text-gray-700">
    {`Discount ${ orderInfo.discountInCent && orderInfo.discountInCent > 0 ? orderInfo.coupon.isPercent ? `(${orderInfo.coupon.amount})%`:`(${orderInfo.coupon.amount}off)`:""}`}
               </div>
               <div className="text-sm sm:text-base text-gray-700">
               {`-Rs. ${orderInfo.discountInCent}`}
              
               </div> 
    </div>
  </>
)}
      
        <div className="mb-8 flex justify-end">
          <div className="text-sm sm:text-base mr-2 text-gray-700">Tax:</div>
          <div className="text-sm sm:text-base text-gray-700">{`Rs. ${(orderInfo?.taxesInCent!)/100 }`}</div>
        </div>
        <div className="mb-8 flex justify-end">
          <div className="mr-2 text-base sm:text-xl font-bold text-gray-700">Total:</div>
          <div className="text-base sm:text-xl font-bold text-gray-700">{`Rs. ${(orderInfo?.totalInCent!)/100 }`}</div>
        </div>
        <div className="text-sm sm:text-base mb-8 border-t-2 border-gray-300 pt-8">
          <div className="mb-2 text-gray-700">
            Payment is due within 30 days. Late payments are subject to fees.
          </div>
          <div className="mb-2 text-gray-700">
            Please make checks payable to Vyan Monorepo and mail to:
          </div>
          <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePrint}
            className="download-button rounded-md border border-primary p-2 text-sm tracking-[0.16px] text-black shadow lg:px-4 lg:py-2 lg:text-base lg:font-medium  lg:leading-6"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};
export default InvoicePdf;
