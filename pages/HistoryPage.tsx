
import React from 'react';
import { ScanResult } from '../types';
import HistoryChart from '../components/HistoryChart';

interface HistoryPageProps {
  history: ScanResult[];
}

const ScanCard: React.FC<{ scan: ScanResult }> = ({ scan }) => {
  let borderColorClass = 'border-green-500';
  if (scan.score <= 50) {
    borderColorClass = 'border-red-500';
  } else if (scan.score <= 75) {
    borderColorClass = 'border-yellow-500';
  }

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 ${borderColorClass} flex justify-between items-center`}>
      <div>
        <p className="font-bold text-lg text-gray-800 dark:text-white">{scan.label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(scan.timestamp).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      <div className="text-3xl font-extrabold text-gray-700 dark:text-gray-200">{scan.score}</div>
    </div>
  );
};

const HistoryPage: React.FC<HistoryPageProps> = ({ history }) => {
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Riwayat Scan</h1>
        <p className="text-gray-500 dark:text-gray-400">Lihat tren kesehatan Anda dari waktu ke waktu.</p>
      </header>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">Tren Skor Kesehatan</h2>
        <HistoryChart data={history} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Semua Catatan</h2>
        {history.length > 0 ? (
          history.map(scan => <ScanCard key={scan.scanId} scan={scan} />)
        ) : (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-400">Belum ada riwayat scan.</p>
            <p className="text-sm text-gray-400">Hasil scan Anda akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
