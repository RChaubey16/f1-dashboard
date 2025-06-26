"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type FadeInOnViewProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  yOffset?: number;
};

const FadeInOnView = ({
  children,
  duration = 0.5,
  delay = 0,
  yOffset = 20,
}: FadeInOnViewProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnView;
