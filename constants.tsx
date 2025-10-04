
import React from 'react';
import { Tip } from './types';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DumbbellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const DUMMY_TIPS: Tip[] = [
    {
      id: '1',
      title: 'Hidrasi Itu Penting',
      content: 'Pastikan minum setidaknya 8 gelas air putih setiap hari untuk menjaga tubuh tetap terhidrasi dan bugar.',
      category: 'Nutrisi',
      icon: <LeafIcon />
    },
    {
      id: '2',
      title: 'Regangkan Otot Anda',
      content: 'Lakukan peregangan ringan selama 5-10 menit setiap pagi untuk meningkatkan fleksibilitas dan aliran darah.',
      category: 'Olahraga',
      icon: <DumbbellIcon />
    },
    {
      id: '3',
      title: 'Teknik Pernapasan 4-7-8',
      content: 'Tarik napas selama 4 detik, tahan selama 7 detik, dan hembuskan perlahan selama 8 detik untuk meredakan stres.',
      category: 'Mental',
      icon: <BrainIcon />
    },
    {
      id: '4',
      title: 'Jadwal Tidur Konsisten',
      content: 'Cobalah tidur dan bangun pada waktu yang sama setiap hari, bahkan di akhir pekan, untuk mengatur jam biologis tubuh.',
      category: 'Tidur',
      icon: <MoonIcon />
    },
    {
      id: '5',
      title: 'Konsumsi Buah & Sayur',
      content: 'Makan setidaknya 5 porsi buah dan sayur setiap hari untuk mendapatkan vitamin dan mineral yang cukup.',
      category: 'Nutrisi',
      icon: <LeafIcon />
    },
];

export const SCAN_MESSAGES = [
    'Menganalisis rona wajah...',
    'Memeriksa tanda-tanda kelelahan...',
    'Mengestimasi metrik kesehatan...',
    'Menyiapkan hasil Anda...',
    'Hampir selesai!',
];
