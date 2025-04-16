
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackageSection: React.FC = () => {
  const { t } = useLanguage();

  const packages = [
    {
      title: t('packages.basic.title'),
      price: t('packages.basic.price'),
      description: t('packages.basic.desc'),
      features: [
        'Landing page',
        'Contact form',
        'Mobile responsive',
        'WhatsApp integration'
      ]
    },
    {
      title: t('packages.standard.title'),
      price: t('packages.standard.price'),
      description: t('packages.standard.desc'),
      features: [
        'Up to 5 pages',
        'Contact form',
        'Mobile responsive',
        'WhatsApp integration',
        'Image gallery',
        'Social media links'
      ],
      highlighted: true
    },
    {
      title: t('packages.premium.title'),
      price: t('packages.premium.price'),
      description: t('packages.premium.desc'),
      features: [
        'Unlimited pages',
        'Contact form',
        'Mobile responsive',
        'WhatsApp integration',
        'Image gallery',
        'Social media links',
        'Custom animations',
        'SEO optimization'
      ]
    }
  ];

  return (
    <section id="packages" className="py-16 bg-webale-gray">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-webale-darkGray">
          {t('packages.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                pkg.highlighted 
                  ? 'shadow-xl border-2 border-webale-blue bg-white transform scale-105' 
                  : 'shadow-md border border-gray-100 bg-white'
              }`}
            >
              {pkg.highlighted && (
                <div className="bg-webale-blue text-white py-2 text-center font-semibold text-sm">
                  Recommandé / Recommended
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-webale-darkGray">{pkg.title}</h3>
                <div className="text-3xl font-bold mb-2 text-webale-blue">{pkg.price}</div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-webale-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/signup"
                  className={`block text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                    pkg.highlighted
                      ? 'bg-webale-blue text-white hover:bg-opacity-90'
                      : 'bg-webale-lightBlue text-webale-blue hover:bg-opacity-80'
                  }`}
                >
                  {t('hero.cta')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
