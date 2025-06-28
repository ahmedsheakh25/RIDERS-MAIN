import React from 'react';
import { motion } from 'framer-motion';
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    delay,
    duration
  }} className={className}>
      {children}
    </motion.div>;
};
export default FadeIn;