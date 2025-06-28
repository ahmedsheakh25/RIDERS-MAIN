import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
}
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 1.5,
  format = value => value.toFixed(0),
  className = ''
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, latest => format(latest));
  useEffect(() => {
    const controls = animate(count, to, {
      duration
    });
    return controls.stop;
  }, [count, to, duration]);
  return <motion.span className={className}>{rounded}</motion.span>;
};
// Import framer-motion's animate function
function animate(value: {
  set: (value: number) => void;
  get: () => number;
}, to: number, options: {
  duration: number;
}) {
  const startTime = performance.now();
  const startValue = value.get();
  const tick = () => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / (options.duration * 1000), 1);
    const currentValue = startValue + (to - startValue) * progress;
    value.set(currentValue);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };
  tick();
  return {
    stop: () => {}
  };
}
export default AnimatedCounter;