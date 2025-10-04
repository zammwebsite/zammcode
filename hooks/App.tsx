
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import TipsPage from './pages/TipsPage';
import ProfilePage from './pages/ProfilePage';
import ScanPage from './pages/ScanPage';
import ResultsPage from './pages/ResultsPage';
import BottomNav from './components/BottomNav';
import { Page, ScanResult, Tip } from './types';
import { DUMMY_TIPS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [scanHistory, setScanHistory] = useLocalStorage<ScanResult[]>('scanHistory', []);
  const [latestScan, setLatestScan] = useLocalStorage<ScanResult | null>('latestScan', null);
  const [tips] = useState<Tip[]>(DUMMY_TIPS);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleStartScan = () => {
    setIsScanning(true);
    setCurrentPage(Page.Scan);
  };

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
    setIsScanning(false);
    setCurrentPage(Page.Results);
  };

  const handleSaveResult = () => {
    if (scanResult) {
      const newHistory = [scanResult, ...scanHistory];
      setScanHistory(newHistory);
      setLatestScan(scanResult);
      setScanResult(null);
      setCurrentPage(Page.Home);
    }
  };

  const handleNavigate = (page: Page) => {
    if (isScanning) return;
    setScanResult(null);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onStartScan={handleStartScan} latestScan={latestScan} />;
      case Page.History:
        return <HistoryPage history={scanHistory} />;
      case Page.Tips:
        return <TipsPage tips={tips} />;
      case Page.Profile:
        return <ProfilePage history={scanHistory} setHistory={setScanHistory} setLatestScan={setLatestScan} />;
      case Page.Scan:
        return <ScanPage onScanComplete={handleScanComplete} />;
      case Page.Results:
        return scanResult && <ResultsPage result={scanResult} onSave={handleSaveResult} onRetake={handleStartScan} />;
      default:
        return <HomePage onStartScan={handleStartScan} latestScan={latestScan} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 flex flex-col justify-between max-w-md mx-auto shadow-2xl">
      <main className="flex-grow pb-20">
        {renderPage()}
      </main>
      {!isScanning && currentPage !== Page.Results && (
        <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
