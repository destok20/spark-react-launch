
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { UserPlus, FileText, Computer, CreditCard } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-webale-blue" />,
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      icon: <FileText className="h-10 w-10 text-webale-blue" />,
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      icon: <Computer className="h-10 w-10 text-webale-blue" />,
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
    {
      icon: <CreditCard className="h-10 w-10 text-webale-blue" />,
      title: t('how.step4.title'),
      description: t('how.step4.desc'),
    },
  ];

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-webale-darkGray">
          {t('how.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="bg-webale-lightBlue p-4 rounded-full">
                  {step.icon}
                </div>
              </div>
              <div className="bg-webale-blue text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-semibold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-webale-darkGray">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
