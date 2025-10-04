
import React, { useState } from 'react';
import { Tip } from '../types';

interface TipsPageProps {
  tips: Tip[];
}

const TipCard: React.FC<{ tip: Tip }> = ({ tip }) => {
  const categoryColorMap = {
    'Nutrisi': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Olahraga': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Mental': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Tidur': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex items-start space-x-4">
      <div className={`p-3 rounded-full ${categoryColorMap[tip.category]}`}>
        {tip.icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white">{tip.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{tip.content}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${categoryColorMap[tip.category]}`}>
          {tip.category}
        </span>
      </div>
    </div>
  );
};

const TipsPage: React.FC<TipsPageProps> = ({ tips }) => {
  const [filter, setFilter] = useState<'Semua' | Tip['category']>('Semua');
  
  const categories: ('Semua' | Tip['category'])[] = ['Semua', 'Nutrisi', 'Olahraga', 'Mental', 'Tidur'];

  const filteredTips = filter === 'Semua' ? tips : tips.filter(tip => tip.category === filter);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tips Sehat</h1>
        <p className="text-gray-500 dark:text-gray-400">Kumpulan saran untuk gaya hidup yang lebih baik.</p>
      </header>

      <div>
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-6 px-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredTips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
};

export default TipsPage;
