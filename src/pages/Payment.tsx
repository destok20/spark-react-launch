
import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, CreditCard, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Payment package types
type PackageType = 'basic' | 'standard' | 'premium';

// Payment method types
type PaymentMethod = 'stripe' | 'orange' | 'wave';

const Payment: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('standard');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('stripe');

  // Get package details
  const getPackageDetails = (type: PackageType) => {
    switch (type) {
      case 'basic':
        return {
          title: t('packages.basic.title'),
          price: t('packages.basic.price'),
          description: t('packages.basic.desc'),
          features: [
            t('payment.features.basic.1'),
            t('payment.features.basic.2'),
            t('payment.features.basic.3')
          ]
        };
      case 'standard':
        return {
          title: t('packages.standard.title'),
          price: t('packages.standard.price'),
          description: t('packages.standard.desc'),
          features: [
            t('payment.features.standard.1'),
            t('payment.features.standard.2'),
            t('payment.features.standard.3'),
            t('payment.features.standard.4')
          ]
        };
      case 'premium':
        return {
          title: t('packages.premium.title'),
          price: t('packages.premium.price'),
          description: t('packages.premium.desc'),
          features: [
            t('payment.features.premium.1'),
            t('payment.features.premium.2'),
            t('payment.features.premium.3'),
            t('payment.features.premium.4'),
            t('payment.features.premium.5')
          ]
        };
    }
  };

  // Handle payment processing
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      console.log(`Processing payment: ${selectedPackage} package via ${selectedPaymentMethod}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('payment.success.title'),
        description: t('payment.success.description'),
      });
      
      // Redirect to dashboard with payment complete status
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: t('payment.error.title'),
        description: t('payment.error.description'),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Details of current package
  const packageDetails = getPackageDetails(selectedPackage);

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-webale-darkGray mb-6 text-center">
                {t('payment.title')}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Package Selection */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-webale-darkGray mb-4">
                    {t('payment.packageDetails')}
                  </h2>
                  
                  {/* Package selection cards */}
                  <RadioGroup 
                    value={selectedPackage} 
                    onValueChange={(value) => setSelectedPackage(value as PackageType)}
                    className="space-y-3"
                  >
                    {['basic', 'standard', 'premium'].map((pkg) => {
                      const details = getPackageDetails(pkg as PackageType);
                      const isSelected = selectedPackage === pkg;
                      
                      return (
                        <label 
                          key={pkg}
                          className={`block relative border rounded-lg p-4 cursor-pointer transition-all
                            ${isSelected 
                              ? 'border-webale-blue bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-start">
                            <RadioGroupItem value={pkg} className="sr-only" />
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border mt-1 mr-3 flex items-center justify-center
                              ${isSelected 
                                ? 'border-webale-blue bg-webale-blue text-white' 
                                : 'border-gray-300'}`}
                            >
                              {isSelected && <Check size={12} />}
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-wrap justify-between items-center mb-1">
                                <h3 className="text-lg font-medium text-webale-darkGray">{details.title}</h3>
                                <span className="text-lg font-bold text-webale-blue">{details.price}</span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{details.description}</p>
                              <ul className="space-y-1">
                                {details.features.map((feature, index) => (
                                  <li key={index} className="text-sm text-gray-600 flex items-start">
                                    <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </RadioGroup>
                </div>
                
                {/* Right: Payment Methods */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-webale-darkGray mb-4">
                      {t('payment.paymentMethod')}
                    </h2>
                    
                    <RadioGroup 
                      value={selectedPaymentMethod} 
                      onValueChange={(value) => setSelectedPaymentMethod(value as PaymentMethod)}
                      className="space-y-3"
                    >
                      <label 
                        className={`block border rounded-lg p-3 cursor-pointer
                          ${selectedPaymentMethod === 'stripe' 
                            ? 'border-webale-blue bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="stripe" className="sr-only" />
                          <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center
                            ${selectedPaymentMethod === 'stripe' 
                              ? 'border-webale-blue bg-webale-blue' 
                              : 'border-gray-300'}`}
                          >
                            {selectedPaymentMethod === 'stripe' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Carte bancaire</span>
                              <CreditCard size={18} className="text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </label>
                      
                      <label 
                        className={`block border rounded-lg p-3 cursor-pointer
                          ${selectedPaymentMethod === 'orange' 
                            ? 'border-webale-blue bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="orange" className="sr-only" />
                          <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center
                            ${selectedPaymentMethod === 'orange' 
                              ? 'border-webale-blue bg-webale-blue' 
                              : 'border-gray-300'}`}
                          >
                            {selectedPaymentMethod === 'orange' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Orange Money</span>
                            </div>
                          </div>
                        </div>
                      </label>
                      
                      <label 
                        className={`block border rounded-lg p-3 cursor-pointer
                          ${selectedPaymentMethod === 'wave' 
                            ? 'border-webale-blue bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="wave" className="sr-only" />
                          <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center
                            ${selectedPaymentMethod === 'wave' 
                              ? 'border-webale-blue bg-webale-blue' 
                              : 'border-gray-300'}`}
                          >
                            {selectedPaymentMethod === 'wave' && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Wave</span>
                            </div>
                          </div>
                        </div>
                      </label>
                    </RadioGroup>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="link" 
                        size="sm"
                        className="text-sm text-gray-500 hover:text-webale-blue"
                      >
                        <HelpCircle size={14} className="mr-1" />
                        {t('payment.helpLink')}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold text-webale-darkGray mb-4">
                      {t('payment.summary')}
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('payment.summaryPackage')}</span>
                        <span className="font-medium">{packageDetails.title}</span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200 flex justify-between">
                        <span className="font-medium">{t('payment.summaryTotal')}</span>
                        <span className="font-bold text-webale-blue">{packageDetails.price}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handlePayment}
                      className="w-full mt-6 bg-webale-blue hover:bg-opacity-90"
                      disabled={isProcessing}
                    >
                      {isProcessing 
                        ? t('payment.processing') 
                        : t('payment.payNow')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Payment;
