"use client";
import UIFormLabel from "@repo/ui/src/@/components/form/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import AddFormInput from "./address-form-input";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";

const paymentFormSchema = z.object({
  cardNumber: z
    .string({ required_error: "Please enter the card number" })
    .min(14, { message: "Minimum 14 digits are required" })
    .max(14, { message: "Maximum 14 digits are allowed " })
    .regex(new RegExp(/^\d{14}$/), {
      message: "Please enter valid card number",
    }),
  expiryDate: z
    .string({ required_error: "Please enter the expiry date" })
    .regex(new RegExp(/^(0[1-9]|1[0-2])\/\d{2}$/), {
      message: "Expiry date must be in MM/YY format",
    }),
  cvv: z
    .string({ required_error: "Please enter the cvv" })
    .regex(new RegExp(/^\d{3,4}$/), {
      message: "CVV must be 3 or 4 digits",
    }),
  securityCode: z.string({ required_error: "Please enter the security code" }),
  holderName: z.string({ required_error: "Please enter the Holder Name" }),
  billingAddress: z.boolean().default(false).optional(),
});
const PaymentForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
  });
  return (
    <>
      <div className="px-2 md:px-[18px] xl:px-5 2xl:px-8">
        <div className="flex flex-col gap-4 xl:gap-[18px]">
          {/* div-heading */}
          <div>
            <h3 className="mb-[4px] font-inter text-base font-semibold text-active md:text-[20px] md:leading-[30px] xl:mb-2 xl:text-base 2xl:text-[28px] 2xl:leading-[38px]">
              Payment
            </h3>
            <div className="font-inter text-[12px] font-normal leading-4 text-inactive md:text-sm xl:text-base ">
              All transaction are secure and encrypted
            </div>
          </div>
          {/* div-payment-form */}
          <div className="flex flex-col gap-6">
            {/* div-1 */}
            <div>
              <UIFormLabel>Card Number </UIFormLabel>
              <Controller
                control={control}
                name="cardNumber"
                render={({ field }) => {
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="Enter 14 digit number of your card"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors && errors.cardNumber && (
                        <p className="text-red-500">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            {/* div-2 */}
            <div className="flex flex-col gap-6 md:flex-row md:gap-6">
              <div className="w-full">
                <UIFormLabel>Expiry Date </UIFormLabel>
                <Controller
                  control={control}
                  name="expiryDate"
                  render={({ field }) => {
                    return (
                      <>
                        <AddFormInput
                          type="text"
                          placeholder="(MM/YY)"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors && errors.expiryDate && (
                          <p className="text-red-500">
                            {errors.expiryDate.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <div className="w-full">
                <UIFormLabel>CVV</UIFormLabel>
                <Controller
                  control={control}
                  name="cvv"
                  render={({ field }) => {
                    return (
                      <>
                        <AddFormInput
                          type="text"
                          placeholder="Please enter your cvv"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors && errors.cvv && (
                          <p className="text-red-500">{errors.cvv.message}</p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            {/* div-3 */}
            <div>
              <UIFormLabel>Security Code</UIFormLabel>
              <Controller
                control={control}
                name="securityCode"
                render={({ field }) => {
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="Please enter your security code"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors && errors.securityCode && (
                        <p className="text-red-500">
                          {errors.securityCode.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            {/* div-4 */}
            <div>
              <UIFormLabel>Name on card</UIFormLabel>
              <Controller
                control={control}
                name="holderName"
                render={({ field }) => {
                  return (
                    <>
                      <AddFormInput
                        type="text"
                        placeholder="eg.. Mohit"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {errors && errors.holderName && (
                        <p className="text-red-500">
                          {errors.holderName.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            {/* div-5 */}
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="billingAddress"
                render={({ field }) => {
                  return (
                    <>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      {errors && errors.billingAddress && (
                        <p className="text-red-500">{errors.billingAddress.message}</p>
                      )}
                    </>
                  );
                }}
              />
              <div className="font-inter font-normal text-sm xl:text-base text-inactive">
              Use shipping address as billing address
              </div>
            </div>
          </div>
          {/* div-select-visa-card */}
          <div></div>
        </div>
      </div>
    </>
  );
};
export default PaymentForm;
