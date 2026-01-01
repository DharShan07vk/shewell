'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/src/@/components/button";
import {Label} from "@repo/ui/src/@/components/label";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import UpdatePassword from "./password-actions";
import { signOut } from "next-auth/react";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import AddFormInput from "~/components/address-form-input";
import forgetPasswordAction from "~/app/auth/forgot-password/forget-password-action";
const passwordFormSchema = z
.object({
  password: z
    .string({ required_error: "Please enter the password" })
    .min(8, { message: "Password can be of minimum 8 charcters" }),
  newPassword: z
  .string({ required_error: "Please enter the new password" })
  .min(8, { message: "New password must have 8 characters" })
  .regex(
    new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i,
    ),
    {
      message:
        "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character is required",
    },
  ),
    
  confirmPassword: z.string({
    required_error: "Please retype new password",
  }),
})
.refine((data) => data.password !== data.newPassword, {
  message: "New password must be different from the old password",
  path: ["newPassword"],
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password don't match",
  path: ["confirmPassword"],
});
type IManagePassword={

  email:string;
}
const ManagePasswordForm = ({email}:IManagePassword) => {
  const {toast}=useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });
  const callServerAction = (oldPass: string,newPass:string) => {
    return UpdatePassword(oldPass,newPass);
  };
  const submitPassword = (data: z.infer<typeof passwordFormSchema>) => {
    return callServerAction(data.password,data.newPassword)
      .then((resp) => {
        if (resp?.error) {
          toast({
            title: resp?.error,
            variant: "destructive",
          });
          console.log(resp.error);
        
        }
        if (resp?.message) {
          toast({
            title: resp.message,
          });
       signOut({callbackUrl:"/"});

        }
      })
      .catch((err) => {
        toast({
          title: err,
          variant: "destructive",
        });
        console.log(err);
      })
      .finally(() => {});
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitPassword)}>
        <div className="flex flex-col items-center justify-center border-t-2 border-t-[#F2F7EA] pt-10 font-inter md:flex-row">
          <div className="flex flex-col gap-5 px-2 md:gap-6 xl:gap-[30px] w-10/12 2xl:gap-8">
            <div className="text-center text-sm font-normal text-black-300">
              Strong passwords are essential for security. This subheading will
              show you how to create a new one.
            </div>
            <div className="flex flex-col gap-3 md:gap-4 xl:gap-5 2xl:gap-6">
              <div className="w-full">
                <div className="flex justify-between">
                <Label>Current Password*</Label>
                <div className="text-sm text-primary font-medium underline cursor-pointer" onClick={()=>
                  forgetPasswordAction({email})
                  .then((resp)=>{
                    toast({
                      title: resp.message,
                    });
                  })
                  .catch((err)=>{
                    toast({
                      title:err,
                      variant:"destructive"
                  })
                  })}>Forgot Password?</div>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <AddFormInput
                          type="password"
                          placeholder="Enter your current password"
                          value={field.value}
                          onChange={field.onChange}
                          // disabled={accountType === 'google'}
                        />
                        {errors && errors.password && (
                          <p className="text-sm text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <div className="w-full">
                <Label>New Password*</Label>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <AddFormInput
                          type="password"
                          placeholder="Enter your new password"
                          value={field.value}
                          onChange={field.onChange}
                          // disabled={accountType === 'google'}
                        />
                        {errors && errors.newPassword && (
                          <p className="text-sm text-red-500">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <div className="w-full">
                <Label>Retype Password*</Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <AddFormInput
                          type="password"
                          placeholder="Retype your new password"
                          value={field.value}
                          onChange={field.onChange}
                          // disabled={accountType === 'google'}
                        />
                        {errors && errors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mx-auto w-fit bg-primary px-[49px] py-2 font-inter text-[14px] font-medium leading-6 shadow-[2px_2px_4px_0px_rgba(64,64,64,0.4)] hover:bg-primary"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ManagePasswordForm;