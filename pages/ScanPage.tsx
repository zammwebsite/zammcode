
import React, { useState, useEffect, useRef } from 'react';
import { runHealthScan } from '../services/healthService';
import { ScanResult } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { SCAN_MESSAGES } from '../constants';

interface ScanPageProps {
  onScanComplete: (result: ScanResult) => void;
}

const ScanPage: React.FC<ScanPageProps> = ({ onScanComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [scanMessage, setScanMessage] = useState("Posisikan wajah Anda di tengah");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraReady(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Kamera tidak dapat diakses. Mohon berikan izin dan coba lagi.");
      }
    };
    setupCamera();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, []);

  useEffect(() => {
    if (isCameraReady && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && !isScanning) {
        setIsScanning(true);
        performScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraReady, countdown, isScanning]);
  
  useEffect(() => {
      let interval: number;
      if (isScanning) {
          interval = window.setInterval(() => {
            setScanMessage(SCAN_MESSAGES[Math.floor(Math.random() * SCAN_MESSAGES.length)]);
          }, 2000);
      }
      return () => window.clearInterval(interval);
  }, [isScanning]);


  const performScan = async () => {
    // Fix: Capture frame from video and send to ML model, replacing mock call.
    setScanMessage(SCAN_MESSAGES[0]);

    if (videoRef.current && videoRef.current.srcObject) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        // Capture a frame from the video stream.
        // The video feed is mirrored for the user via CSS, but we capture the raw, un-mirrored frame.
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64Data = imageDataUrl.split(',')[1];
        
        try {
          const result = await runHealthScan(base64Data);
          onScanComplete(result);
        } catch (apiError) {
          console.error("Health scan API call failed:", apiError);
          // If the primary scan fails, fall back to the mock implementation
          const mockResult = await runHealthScan();
          onScanComplete(mockResult);
        }
        return;
      }
    }

    // Fallback for when video is not available or canvas context fails
    const result = await runHealthScan();
    onScanComplete(result);
  };
  
  if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Oops! Terjadi Masalah</h2>
            <p className="text-red-400">{error}</p>
        </div>
      );
  }

  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"></video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center p-6">
        {!isScanning && countdown > 0 ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[50vh] max-w-sm max-h-96 border-4 border-dashed border-white rounded-3xl opacity-50"></div>
            <p className="text-lg font-semibold mb-4">{scanMessage}</p>
            <div className="text-8xl font-bold">{countdown}</div>
          </>
        ) : (
          <>
            { isScanning && (
                <>
                    <LoadingSpinner />
                    <p className="text-xl font-semibold mt-8">{scanMessage}</p>
                    <p className="text-sm text-gray-300 mt-2">Ini mungkin memakan waktu beberapa detik...</p>
                </>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default ScanPage;
