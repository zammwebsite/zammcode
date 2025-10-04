
import React from 'react';
import { ScanResult } from '../types';
import HealthScore from '../components/HealthScore';

interface ResultsPageProps {
  result: ScanResult;
  onSave: () => void;
  onRetake: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onSave, onRetake }) => {
  let bgColorClass = 'from-green-400 to-blue-500';
  let textColorClass = 'text-green-800';
  if (result.score <= 50) {
    bgColorClass = 'from-red-400 to-orange-500';
    textColorClass = 'text-red-800';
  } else if (result.score <= 75) {
    bgColorClass = 'from-yellow-400 to-amber-500';
    textColorClass = 'text-yellow-800';
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColorClass} flex flex-col items-center justify-center p-6 text-white text-center`}>
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-sm animate-fade-in-up">
        <h1 className="text-2xl font-bold mb-2">Hasil Scan Anda</h1>
        
        <div className="my-6 flex justify-center">
            <HealthScore score={result.score} />
        </div>
        
        <h2 className="text-4xl font-extrabold mb-2">{result.label}</h2>
        <p className="text-white/80 mb-6">Berikut adalah beberapa saran berdasarkan hasil scan Anda.</p>

        <div className="space-y-3 text-left">
          {result.suggestions.map((suggestion, index) => (
            <div key={index} className="bg-white/20 p-3 rounded-lg flex items-center space-x-3">
              <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 space-y-3">
            <button
                onClick={onSave}
                className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 transition duration-300"
            >
                Simpan ke Riwayat
            </button>
            <button
                onClick={onRetake}
                className="w-full bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50 transition duration-300"
            >
                Ulangi Scan
            </button>
             <button
                onClick={() => alert("Menghubungi dokter (fitur simulasi)...")}
                className="w-full text-white/80 font-semibold py-2 px-6 rounded-full hover:underline focus:outline-none"
            >
                Hubungi Dokter
            </button>
        </div>
      </div>
      <p className="text-xs text-white/60 mt-4 px-4">Disclaimer: Aplikasi ini bukan pengganti saran medis profesional. Selalu konsultasikan dengan dokter untuk masalah kesehatan.</p>
    </div>
  );
};

export default ResultsPage;
