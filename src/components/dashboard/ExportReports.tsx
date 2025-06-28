import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DocumentTextIcon, DocumentArrowDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
const ExportReports: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const reportTypes = [{
    id: 'delivery',
    name: t('reports.delivery')
  }, {
    id: 'financial',
    name: t('reports.financial')
  }, {
    id: 'activity',
    name: t('reports.activity')
  }, {
    id: 'performance',
    name: t('reports.performance')
  }];
  const timeRanges = [{
    id: 'today',
    name: t('reports.today')
  }, {
    id: 'week',
    name: t('reports.thisWeek')
  }, {
    id: 'month',
    name: t('reports.thisMonth')
  }, {
    id: 'quarter',
    name: t('reports.thisQuarter')
  }, {
    id: 'year',
    name: t('reports.thisYear')
  }, {
    id: 'custom',
    name: t('reports.customRange')
  }];
  const exportFormats = [{
    id: 'pdf',
    name: 'PDF',
    icon: '📄'
  }, {
    id: 'csv',
    name: 'CSV',
    icon: '📊'
  }, {
    id: 'xlsx',
    name: 'Excel',
    icon: '📑'
  }];
  return <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden" whileHover={{
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-congress-blue-800">
          {t('dashboard.reports')}
        </h2>
      </div>
      <div className="p-6">
        <motion.div className="mb-4" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('dashboard.reportType')}
          </label>
          <motion.select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500" whileFocus={{
          scale: 1.01
        }} whileTap={{
          scale: 0.99
        }}>
            {reportTypes.map(type => <option key={type.id} value={type.id}>
                {type.name}
              </option>)}
          </motion.select>
        </motion.div>
        <motion.div className="mb-4" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('dashboard.timeRange')}
          </label>
          <motion.select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500" whileFocus={{
          scale: 1.01
        }} whileTap={{
          scale: 0.99
        }}>
            {timeRanges.map(range => <option key={range.id} value={range.id}>
                {range.name}
              </option>)}
          </motion.select>
        </motion.div>
        <motion.div className="relative" ref={dropdownRef} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }}>
          <motion.button className="w-full flex items-center justify-between px-4 py-3 bg-congress-blue-600 text-white rounded-lg hover:bg-congress-blue-700 transition-colors" onClick={() => setIsOpen(!isOpen)} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <div className="flex items-center">
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
              <span>{t('dashboard.exportReport')}</span>
            </div>
            <motion.div animate={{
            rotate: isOpen ? 180 : 0
          }} transition={{
            duration: 0.3
          }}>
              <ChevronDownIcon className="w-5 h-5" />
            </motion.div>
          </motion.button>
          <AnimatePresence>
            {isOpen && <motion.div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2" initial={{
            opacity: 0,
            y: -10,
            scale: 0.95
          }} animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }} exit={{
            opacity: 0,
            y: -10,
            scale: 0.95
          }} transition={{
            duration: 0.2
          }}>
                {exportFormats.map((format, index) => <motion.button key={format.id} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center" onClick={() => setIsOpen(false)} whileHover={{
              x: 5,
              backgroundColor: '#f9fafb'
            }} initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.1
            }}>
                    <span className="mr-2">{format.icon}</span>
                    <span>
                      {t('dashboard.exportAs')} {format.name}
                    </span>
                  </motion.button>)}
              </motion.div>}
          </AnimatePresence>
        </motion.div>
        <motion.div className="mt-5 pt-5 border-t border-gray-100" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.4
      }}>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {t('dashboard.savedReports')}
          </h3>
          <div className="space-y-2">
            <motion.div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" whileHover={{
            x: 5,
            backgroundColor: '#f3f4f6'
          }} whileTap={{
            scale: 0.98
          }}>
              <div className="flex items-center">
                <DocumentTextIcon className="w-5 h-5 text-congress-blue-600 mr-2" />
                <span className="text-sm">
                  {t('dashboard.monthlyDelivery')}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {language === 'en' ? 'May 2023' : 'مايو 2023'}
              </span>
            </motion.div>
            <motion.div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" whileHover={{
            x: 5,
            backgroundColor: '#f3f4f6'
          }} whileTap={{
            scale: 0.98
          }} transition={{
            delay: 0.05
          }}>
              <div className="flex items-center">
                <DocumentTextIcon className="w-5 h-5 text-congress-blue-600 mr-2" />
                <span className="text-sm">
                  {t('dashboard.financialReport')} Q1
                </span>
              </div>
              <span className="text-xs text-gray-500">2023</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>;
};
export default ExportReports;