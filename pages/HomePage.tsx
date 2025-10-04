
import React from 'react';
import { ScanResult, Tip } from '../types';
import { DUMMY_TIPS } from '../constants';
import HealthScore from '../components/HealthScore';

interface HomePageProps {
  onStartScan: () => void;
  latestScan: ScanResult | null;
}

const HomePage: React.FC<HomePageProps> = ({ onStartScan, latestScan }) => {
    const todayTip = React.useMemo(() => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        return DUMMY_TIPS[dayOfYear % DUMMY_TIPS.length];
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 18) return "Selamat Siang";
        return "Selamat Malam";
    }

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{getGreeting()}</h1>
        <p className="text-gray-500 dark:text-gray-400">Siap untuk cek kesehatan harian Anda?</p>
      </header>
      
      {latestScan ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Skor Terakhir Anda</h2>
            <HealthScore score={latestScan.score} />
            <p className="text-xl font-medium text-gray-800 dark:text-white">{latestScan.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(latestScan.timestamp).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
            </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Selamat Datang di Sehatin</h2>
            <p className="text-gray-600 dark:text-gray-300">Lakukan scan pertama Anda untuk melihat skor kesehatan dasar.</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onStartScan}
          className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Scan Wajah Sekarang
        </button>
        <p className="text-xs text-gray-500 mt-2">Proses cepat, hanya ~15 detik</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
        <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Tips Hari Ini</h3>
        <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-3 rounded-full">
                {todayTip.icon}
            </div>
            <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200">{todayTip.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{todayTip.content}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
