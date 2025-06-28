import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';
import { DocumentTextIcon, ArrowDownTrayIcon, CalendarIcon } from '@heroicons/react/24/outline';
const ReportsTab: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [reportType, setReportType] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Mock saved reports
  const savedReports = [{
    id: '1',
    name: t('wallet.reports.transactionHistory'),
    date: '2023-05-01',
    type: 'pdf'
  }, {
    id: '2',
    name: t('wallet.reports.monthlySummary'),
    date: '2023-04-01',
    type: 'csv'
  }];
  const handleExport = (format: string) => {
    // In a real app, this would trigger an API call to generate the report
    alert(t('wallet.reports.exportSuccess'));
  };
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('wallet.reports.exportReports')}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wallet.reports.reportType')}
              </label>
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">{t('common.select')}</option>
                <option value="transaction">{t('reports.delivery')}</option>
                <option value="financial">{t('reports.financial')}</option>
                <option value="activity">{t('reports.activity')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wallet.reports.timeRange')}
              </label>
              <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">{t('common.select')}</option>
                <option value="today">{t('reports.today')}</option>
                <option value="week">{t('reports.thisWeek')}</option>
                <option value="month">{t('reports.thisMonth')}</option>
                <option value="quarter">{t('reports.thisQuarter')}</option>
                <option value="year">{t('reports.thisYear')}</option>
                <option value="custom">{t('reports.customRange')}</option>
              </select>
            </div>
            {timeRange === 'custom' && <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('wallet.reports.startDate')}
                  </label>
                  <div className="relative">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('wallet.reports.endDate')}
                  </label>
                  <div className="relative">
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>}
            <div className="pt-2 space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('pdf')} disabled={!reportType || !timeRange}>
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                {t('wallet.reports.exportPDF')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('csv')} disabled={!reportType || !timeRange}>
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                {t('wallet.reports.exportCSV')}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('excel')} disabled={!reportType || !timeRange}>
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                {t('wallet.reports.exportExcel')}
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('wallet.reports.savedReports')}
          </h3>
          {savedReports.length > 0 ? <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              {savedReports.map(report => <div key={report.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-gray-100 mr-3">
                    <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {report.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    {t('wallet.reports.download')}
                  </Button>
                </div>)}
            </div> : <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-3">
                <DocumentTextIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {t('wallet.reports.noSavedReports')}
              </h3>
              <p className="text-gray-500">
                {t('wallet.reports.generateReportDescription')}
              </p>
            </div>}
        </div>
      </div>
    </div>;
};
export default ReportsTab;