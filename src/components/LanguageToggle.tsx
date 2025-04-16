
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 border border-gray-200 rounded-full p-1">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 text-sm rounded-full transition-all ${
          language === 'fr'
            ? 'bg-webale-blue text-white font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm rounded-full transition-all ${
          language === 'en'
            ? 'bg-webale-blue text-white font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
