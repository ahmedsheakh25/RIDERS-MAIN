import React, { useEffect, useRef } from 'react';
interface ParallaxItemProps {
  children: React.ReactNode;
  speed?: number;
}
const ParallaxItem: React.FC<ParallaxItemProps> = ({
  children,
  speed = 0.1
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef<number | null>(null);
  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    const handleScroll = () => {
      if (initialPositionRef.current === null) {
        initialPositionRef.current = item.getBoundingClientRect().top + window.scrollY;
      }
      const scrollPosition = window.scrollY;
      const offset = (scrollPosition - initialPositionRef.current) * speed;
      item.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  return <div ref={itemRef} className="transition-transform duration-300 ease-out">
      {children}
    </div>;
};
export default ParallaxItem;