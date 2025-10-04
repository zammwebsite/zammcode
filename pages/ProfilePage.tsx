
import React from 'react';
import { ScanResult } from '../types';

interface ProfilePageProps {
  history: ScanResult[];
  setHistory: (history: ScanResult[]) => void;
  setLatestScan: (scan: ScanResult | null) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ history, setHistory, setLatestScan }) => {

  const exportToCSV = () => {
    if (history.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

    const headers = "scanId,timestamp,score,label,fatigueScore,stressScore,tempEstimate,heartRateEstimate";
    const rows = history.map(scan => 
      [
        scan.scanId,
        scan.timestamp,
        scan.score,
        scan.label,
        scan.metrics.fatigueScore,
        scan.metrics.stressScore,
        scan.metrics.tempEstimate,
        scan.metrics.heartRateEstimate
      ].join(',')
    ).join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sehatin_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDeleteHistory = () => {
      if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat scan? Tindakan ini tidak dapat diurungkan.")) {
          setHistory([]);
          setLatestScan(null);
          alert("Riwayat berhasil dihapus.");
      }
  }

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center space-x-4">
        <img src={`https://picsum.photos/seed/user/80/80`} alt="Avatar" className="w-20 h-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengguna Sehatin</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola profil dan pengaturan Anda.</p>
        </div>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Pengaturan Akun</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md divide-y dark:divide-gray-700">
           <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">Login dengan Google</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sinkronkan data Anda (fitur simulasi).</p>
                </div>
                <button className="text-blue-600 font-semibold">Login</button>
           </div>
           <div className="p-4">
                <h3 className="font-semibold">Nomor Darurat</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Atur nomor yang akan dihubungi saat darurat.</p>
                <input type="tel" placeholder="Contoh: 08123456789" className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
           </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Manajemen Data</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md divide-y dark:divide-gray-700">
           <button onClick={exportToCSV} className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <div>
                    <h3 className="font-semibold">Ekspor Data ke CSV</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Unduh riwayat scan Anda.</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </button>
           <button onClick={handleDeleteHistory} className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600">
                <div>
                    <h3 className="font-semibold">Hapus Riwayat</h3>
                    <p className="text-sm text-red-500/80">Hapus semua data scan secara permanen.</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
