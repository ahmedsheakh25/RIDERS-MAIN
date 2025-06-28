import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface IndustryCardProps {
  title: string;
  description: string;
  illustration?: string;
}
const IndustryCard: React.FC<IndustryCardProps> = ({
  title,
  description,
  illustration
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // Default to the flowers image
  const imageUrl = illustration || "/__-__1.png.webp";
  return <motion.div className="h-full relative rounded-3xl overflow-hidden bg-gray-100" onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="p-6 pb-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="flex justify-center items-center px-4 py-6">
        <img src={imageUrl} alt={title} className="w-auto h-40 object-contain" />
      </div>
      <AnimatePresence>
        {isHovered && <motion.div className="absolute inset-x-0 bottom-0 bg-white p-6 rounded-3xl" initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}>
            <p className="text-gray-700">{description}</p>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};
export default IndustryCard;