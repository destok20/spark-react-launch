import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-webale-darkGray mb-8 text-center">
              {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? 'Introduction' : 'Introduction'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'Chez Webale, nous respectons votre vie privée. Cette politique explique comment nous recueillons, utilisons et protégeons vos informations.'
                  : 'At Webale, we value your privacy. This policy explains how we collect, use, and protect your information.'}
              </p>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '1. Données collectées' : '1. Data We Collect'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Informations personnelles (nom, email, numéro WhatsApp)'
                    : 'Personal information (name, email, WhatsApp number)'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Détails de votre entreprise (nom commercial, description, liens, contenu fourni)'
                    : 'Business details (business name, description, links, provided content)'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Médias (logos, images, fichiers uploadés)'
                    : 'Media (logos, images, uploaded files)'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Statut de progression du projet'
                    : 'Project progress status'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Historique des interactions et paiements'
                    : 'Interaction and payment history'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '2. Utilisation des données' : '2. How We Use Your Data'}
              </h2>
              <p className="mb-2 text-gray-700">
                {language === 'fr' ? 'Nous utilisons vos données pour :' : 'We use your data to:'}
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Créer et livrer votre site Web personnalisé'
                    : 'Build and deliver your custom website'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Vous envoyer des mises à jour par email ou WhatsApp'
                    : 'Send updates via email or WhatsApp'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Améliorer nos services et notre expérience utilisateur'
                    : 'Improve our platform and service'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Gérer votre compte et assurer le suivi des paiements'
                    : 'Manage your account and payment flow'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '3. Partage des données' : '3. Data Sharing'}
              </h2>
              <p className="mb-2 text-gray-700">
                {language === 'fr' 
                  ? 'Nous ne vendons ni ne partageons vos données personnelles avec des tiers, sauf :'
                  : 'We do not sell or share your personal data except:'}
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Pour les paiements (Stripe, Wave, Orange Money)'
                    : 'With payment processors (Stripe, Wave, Orange Money)'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Si requis par la loi'
                    : 'When legally required'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '4. Stockage et sécurité' : '4. Data Security'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'Vos données sont stockées de manière sécurisée. Seul notre personnel autorisé peut y accéder.'
                  : 'Your data is securely stored and only accessible to authorized Webale team members.'}
              </p>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '5. Suppression de données' : '5. Data Deletion'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'Vous pouvez demander la suppression de vos données à tout moment en envoyant un email à support@webale.com.'
                  : 'You may request to delete your data at any time by emailing support@webale.com.'}
              </p>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '6. Modifications' : '6. Changes to Policy'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'Nous pouvons mettre à jour cette politique. Toute modification sera affichée ici.'
                  : 'We may update this policy. All changes will be reflected on this page.'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
