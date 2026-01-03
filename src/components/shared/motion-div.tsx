'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type MotionDivProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  delay?: number;
};

export function MotionDiv({ children, className, delay = 0, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
