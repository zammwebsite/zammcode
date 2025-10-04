
import React from 'react';

interface HealthScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const HealthScore: React.FC<HealthScoreProps> = ({ score, size = 160, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'stroke-green-500';
  if (score <= 50) {
    colorClass = 'stroke-red-500';
  } else if (score <= 75) {
    colorClass = 'stroke-yellow-500';
  }
  
  let textColorClass = 'text-green-600 dark:text-green-400';
  if (score <= 50) {
    textColorClass = 'text-red-600 dark:text-red-400';
  } else if (score <= 75) {
    textColorClass = 'text-yellow-600 dark:text-yellow-400';
  }


  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${textColorClass}`}>{score}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Skor</span>
      </div>
    </div>
  );
};

export default HealthScore;
