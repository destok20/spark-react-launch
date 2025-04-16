
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-webale-darkGray text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <img 
              src="/lovable-uploads/c964f706-c910-4b6e-a59d-369419bb85fa.png" 
              alt="Tabasite Logo" 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-4">
              {t('footer.description')} / {t('footer.description.en')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                      {t('footer.privacy')} / {t('footer.privacy.en')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                      {t('footer.terms')} / {t('footer.terms.en')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                      Admin / Admin
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">
                    Email: contact@tabasite.sn
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {t('nav.contact')} / {t('nav.contact.en')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Tabasite. {t('footer.rights')} / {t('footer.rights.en')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
