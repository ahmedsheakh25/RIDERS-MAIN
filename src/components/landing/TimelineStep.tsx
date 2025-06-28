import React, { useEffect, useRef } from 'react';
interface TimelineStepProps {
  title: string;
  description: string;
  icon: string;
  position: 'left' | 'right';
  isLast: boolean;
  delay?: number;
}
const TimelineStep: React.FC<TimelineStepProps> = ({
  title,
  description,
  icon,
  position,
  isLast,
  delay = 0
}) => {
  const stepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const step = stepRef.current;
    if (!step) return;
    // Add entrance animation with delay
    setTimeout(() => {
      step.classList.add('opacity-100');
      step.classList.remove('opacity-0');
      if (position === 'left') {
        step.classList.add('translate-x-0');
        step.classList.remove('-translate-x-10');
      } else {
        step.classList.add('translate-x-0');
        step.classList.remove('translate-x-10');
      }
    }, delay * 1000);
  }, [position, delay]);
  return <div ref={stepRef} className={`md:flex items-center mb-12 opacity-0 transition-all duration-500 ease-out ${position === 'left' ? 'md:flex-row -translate-x-10' : 'md:flex-row-reverse translate-x-10'}`} style={{
    transitionDelay: `${delay}s`
  }}>
      {/* Content */}
      <div className={`md:w-5/12 ${position === 'right' ? 'md:text-right' : ''}`}>
        <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 ${position === 'right' ? 'md:ml-8' : 'md:mr-8'}`}>
          <h3 className="text-xl font-bold text-congress-blue-700 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      {/* Center dot with icon */}
      <div className="md:w-2/12 flex justify-center items-center relative my-4 md:my-0">
        <div className="w-16 h-16 bg-congress-blue-600 rounded-full flex items-center justify-center z-10 shadow-md">
          <span className="text-2xl text-white">{icon}</span>
        </div>
        {!isLast && <div className="absolute w-1 bg-congress-blue-200 h-24 top-16 hidden md:block"></div>}
      </div>
      {/* Empty space for alignment */}
      <div className="md:w-5/12"></div>
    </div>;
};
export default TimelineStep;