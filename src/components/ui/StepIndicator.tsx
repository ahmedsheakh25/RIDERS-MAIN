import React, { Fragment } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CheckIcon } from '@heroicons/react/24/outline';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}
const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  labels
}) => {
  const {
    direction
  } = useLanguage();
  return <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {Array.from({
        length: totalSteps
      }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return <Fragment key={index}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${isCompleted ? 'bg-[#004976] border-[#004976] text-white' : isActive ? 'border-[#004976] text-[#004976] bg-white' : 'border-gray-300 text-gray-300 bg-white'}`}>
                  {isCompleted ? <CheckIcon className="w-5 h-5" /> : <span className="text-sm font-medium">{index + 1}</span>}
                </div>
                <span className={`mt-2 text-xs font-medium ${isCompleted || isActive ? 'text-[#004976]' : 'text-gray-400'}`}>
                  {labels[index]}
                </span>
              </div>
              {/* Connector line (except after the last step) */}
              {index < totalSteps - 1 && <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? 'bg-[#004976]' : 'bg-gray-300'}`}></div>}
            </Fragment>;
      })}
      </div>
    </div>;
};
export default StepIndicator;