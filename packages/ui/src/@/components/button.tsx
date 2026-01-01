import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        appointment:
          "bg-black text-white inter font-medium text-base hover:bg-primary	",
        subscribe:
          "bg-white text-primary font-inter font-medium text-base rounded-full hover:text-black",
        login: "bg-black text-white font-inter font-medium text-sm leading-6",
        green: "bg-secondary text-white",
        OTP: " bg-[#00898F] rounded-md text-white",
        nonOTP: "bg-white rounded-md text-primary border border-primary",
        blog: "bg-black text-white inter font-medium text-base hover:bg-secondary",
        search: "bg-black text-white font-inter font-medium text-[14px] leading-[20px] rounded-md hover:bg-primary ",
        profile: "bg-black text-white font-inter font-medium text-[14px] leading-[20px] rounded-md",
        offlineAppointment: "text-black font-inter font-medium	text-base	border border-black rounded-md",
        onlineAppointment: "font-inter font-medium text-sm md:text-base	bg-secondary hover:bg-primary text-white"
      },
      size: {
        default: "h-10 px-4 py-2",
        // sm: "h-9 rounded-md px-3",
        // lg: "h-11 rounded-md px-8",
        // icon: "h-10 w-10",
        // xl: "py-3 px-4",
        // large: "py-2 px-[94.5px]",
        // extraLarge: "py-2 px-[132px]",
        small: "py-2 px-4",
        large: "py-2 px-[26.5px] lg:px-[12.5px] 2xl:px-[20px] ",
        offlineAppointment: "py-2 px-[38.5px] xl:px-4",
        onlineAppointment: "py-2 px-6 md:px-4 "
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
