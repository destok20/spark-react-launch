
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-webale-darkGray mb-8 text-center">
              {language === 'fr' ? 'Termes et Conditions' : 'Terms & Conditions'}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? 'Introduction' : 'Introduction'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'En utilisant Webale, vous acceptez ces termes. Veuillez les lire attentivement.'
                  : 'By using Webale, you agree to these terms. Please read them carefully.'}
              </p>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '1. Processus de service' : '1. Service Process'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Vous créez un compte et remplissez un formulaire'
                    : 'You create an account and submit a form'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Webale crée un site de prévisualisation dans les 24 à 72 heures'
                    : 'Webale builds a preview site within 24–72 hours'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Vous payez uniquement après avoir approuvé le site'
                    : 'You only pay after you approve the site'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Le site final vous est livré après paiement'
                    : 'The final site is delivered after payment'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '2. Paiement' : '2. Payment'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Aucun paiement requis avant validation du site'
                    : 'No payment is required before preview approval'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Une fois approuvé, le paiement est obligatoire pour recevoir le site'
                    : 'Once approved, payment is required before delivery'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Aucune annulation après paiement sauf erreur technique prouvée'
                    : 'No cancellations after payment unless due to a proven technical error'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '3. Domaines' : '3. Domains'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Si vous fournissez un nom de domaine, nous le connecterons gratuitement'
                    : 'If you provide your own domain, we\'ll connect it for free'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Si vous demandez un nouveau domaine, un paiement de 20,000 XOF est requis'
                    : 'If you request a new domain, a 20,000 XOF fee applies'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Tous les domaines sont enregistrés au nom du client'
                    : 'All domains are registered under the customer\'s name'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '4. Contenu client' : '4. Customer Content'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Vous êtes responsable de l\'exactitude du contenu fourni (textes, images, etc.)'
                    : 'You are responsible for the accuracy of the content you submit'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Webale ne vérifie pas l\'authenticité des données envoyées'
                    : 'Webale does not verify the authenticity of your inputs'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '5. Limitations' : '5. Limitations of Liability'}
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                <li>
                  {language === 'fr' 
                    ? 'Webale n\'est pas responsable des pertes indirectes liées à votre site Web'
                    : 'Webale is not responsible for any indirect damages related to your site'}
                </li>
                <li>
                  {language === 'fr' 
                    ? 'Nos services sont fournis "tels quels", sans garanties supplémentaires'
                    : 'All services are provided "as is," without additional warranties'}
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold text-webale-darkGray mt-8 mb-4">
                {language === 'fr' ? '6. Modifications' : '6. Changes to Terms'}
              </h2>
              <p className="mb-4 text-gray-700">
                {language === 'fr' 
                  ? 'Nous pouvons modifier ces conditions. Les nouvelles versions seront disponibles ici.'
                  : 'We may modify these terms. New versions will always be published on this page.'}
              </p>
              
              <p className="mt-8 text-sm text-gray-500 italic">
                {language === 'fr' 
                  ? 'Dernière mise à jour: Avril 2025'
                  : 'Last updated: April 2025'}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
