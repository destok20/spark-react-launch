
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    console.log("Header component user profile:", profile);
  }, [profile]);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-webale-blue">
              Tabasite
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-webale-blue transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/privacy" className="text-gray-700 hover:text-webale-blue transition-colors">
                {t('nav.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-700 hover:text-webale-blue transition-colors">
                {t('nav.terms')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-webale-blue transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Right side: Language toggle and Auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button onClick={() => navigate('/dashboard')} variant="ghost">
                  {t('nav.dashboard')}
                </Button>
                <Button onClick={() => signOut()} variant="outline">
                  {currentLanguage === 'fr' ? 'Déconnexion' : 'Logout'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button onClick={() => navigate('/login')} variant="ghost">
                  {t('nav.login')}
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-webale-blue hover:bg-opacity-90">
                  {t('nav.signup')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <LanguageToggle />
            <button onClick={toggleMenu} className="ml-2 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-webale-blue transition-colors" onClick={toggleMenu}>
                {t('nav.home')}
              </Link>
              <Link to="/privacy" className="text-gray-700 hover:text-webale-blue transition-colors" onClick={toggleMenu}>
                {t('nav.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-700 hover:text-webale-blue transition-colors" onClick={toggleMenu}>
                {t('nav.terms')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-webale-blue transition-colors" onClick={toggleMenu}>
                {t('nav.contact')}
              </Link>
              
              {user ? (
                <>
                  <Button onClick={() => { navigate('/dashboard'); toggleMenu(); }} variant="ghost" className="justify-start">
                    {t('nav.dashboard')}
                  </Button>
                  <Button onClick={() => { signOut(); toggleMenu(); }} variant="outline" className="justify-start">
                    {currentLanguage === 'fr' ? 'Déconnexion' : 'Logout'}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => { navigate('/login'); toggleMenu(); }} variant="ghost" className="justify-start">
                    {t('nav.login')}
                  </Button>
                  <Button onClick={() => { navigate('/signup'); toggleMenu(); }} className="bg-webale-blue hover:bg-opacity-90 justify-start">
                    {t('nav.signup')}
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
