
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-webale-lightBlue to-white py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-webale-darkGray mb-6 leading-tight">
            {t('hero.headline')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {t('hero.subheadline')}
          </p>
          <Link
            to="/signup"
            className="bg-webale-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-all inline-block"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
