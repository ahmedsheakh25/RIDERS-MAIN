import React from 'react';
import { motion } from 'framer-motion';
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}
const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    delay,
    duration,
    type: 'spring',
    stiffness: 100,
    damping: 15
  }} className={className}>
      {children}
    </motion.div>;
};
export default ScaleIn;