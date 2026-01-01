import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "./card";

type MotionCardProps = React.ComponentProps<typeof Card> & {
  hoverExpand?: boolean;
  expandedFlex?: number;
};

export const MotionCard = React.forwardRef<
  HTMLDivElement,
  MotionCardProps
>(
  (
    {
      className,
      hoverExpand = false,
      expandedFlex = 2,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ flexGrow: 1 }}
        whileHover={
          hoverExpand && !shouldReduceMotion
            ? { flexGrow: expandedFlex }
            : undefined
        }
        whileFocus={
          hoverExpand && !shouldReduceMotion
            ? { flexGrow: expandedFlex }
            : undefined
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
        className="flex outline-none"
        tabIndex={hoverExpand ? 0 : -1}
        aria-expanded={hoverExpand}
      >
        <Card
          {...props}
          className={className}
        />
      </motion.div>
    );
  }
);

MotionCard.displayName = "MotionCard";