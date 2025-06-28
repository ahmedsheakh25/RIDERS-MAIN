import React from 'react';
import { motion } from 'framer-motion';
interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}
const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return {
          x: -50,
          y: 0
        };
      case 'right':
        return {
          x: 50,
          y: 0
        };
      case 'up':
        return {
          x: 0,
          y: -50
        };
      case 'down':
        return {
          x: 0,
          y: 50
        };
      default:
        return {
          x: 0,
          y: 50
        };
    }
  };
  return <motion.div initial={{
    opacity: 0,
    ...getInitialPosition()
  }} animate={{
    opacity: 1,
    x: 0,
    y: 0
  }} transition={{
    delay,
    duration,
    ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for smooth easing
  }} className={className}>
      {children}
    </motion.div>;
};
export default SlideIn;