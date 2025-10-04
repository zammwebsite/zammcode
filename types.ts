
import type { ReactElement } from 'react';

export enum Page {
  Home = 'Home',
  History = 'History',
  Tips = 'Tips',
  Profile = 'Profile',
  Scan = 'Scan',
  Results = 'Results',
}

export type ScanMetrics = {
  fatigueScore: number;
  stressScore: number;
  tempEstimate: number | null;
  heartRateEstimate: number | null;
};

export type ScanResult = {
  scanId: string;
  timestamp: string;
  score: number;
  label: 'Sehat' | 'Perlu Istirahat' | 'Perlu Periksa';
  metrics: ScanMetrics;
  suggestions: string[];
};

export type Tip = {
  id: string;
  title: string;
  content: string;
  category: 'Nutrisi' | 'Olahraga' | 'Mental' | 'Tidur';
  // Fix: Use ReactElement type for component icons to resolve JSX namespace error.
  icon: ReactElement;
};
