import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  color
}) => {
  return <motion.div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200" whileHover={{
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <motion.div className="text-white" whileHover={{
          rotate: 15
        }} transition={{
          duration: 0.3
        }}>
            {icon}
          </motion.div>
        </div>
        <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isPositive ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm text-gray-500 font-medium mb-1">{title}</h3>
        <motion.p className="text-2xl font-bold text-gray-800" initial={{
        scale: 0.95
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.5,
        type: 'spring'
      }}>
          {value}
        </motion.p>
      </div>
    </motion.div>;
};
export default StatCard;