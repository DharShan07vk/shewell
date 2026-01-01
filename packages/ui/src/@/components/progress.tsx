"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root> & { parentClass?: string },
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    parentClass?: string;
  }
>(({ className, parentClass, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full ",
      parentClass
    )}
    {...props}
  >
    {/* in parentClass,for background (color : backgroundColor) will be given */}
    {/* in className, for main progress (color : backgroundColor) will be given */}
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1  transition-all",
        className
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
