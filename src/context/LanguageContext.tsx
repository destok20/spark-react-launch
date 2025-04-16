
import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
};

const translations = {
  // Hero Section
  'hero.headline.fr': 'Faites créer votre site web en 24h. Payez seulement si vous l\'aimez.',
  'hero.headline.en': 'Get your website built in 24h. Pay only if you love it.',
  'hero.subheadline.fr': 'Créez un compte, remplissez un formulaire, recevez un aperçu.',
  'hero.subheadline.en': 'Create an account, fill out a form, and get a preview.',
  'hero.cta.fr': 'Créer un compte',
  'hero.cta.en': 'Create Account',
  
  // Navigation
  'nav.home.fr': 'Accueil',
  'nav.home.en': 'Home',
  'nav.howItWorks.fr': 'Comment ça marche',
  'nav.howItWorks.en': 'How it works',
  'nav.pricing.fr': 'Tarifs',
  'nav.pricing.en': 'Pricing',
  'nav.contact.fr': 'Contact',
  'nav.contact.en': 'Contact',
  'nav.login.fr': 'Connexion',
  'nav.login.en': 'Login',
  'nav.signup.fr': 'S\'inscrire',
  'nav.signup.en': 'Sign up',
  'nav.admin.fr': 'Admin',
  'nav.admin.en': 'Admin',
  
  // How It Works Section
  'how.title.fr': 'Comment ça marche',
  'how.title.en': 'How It Works',
  'how.step1.title.fr': 'Créer un compte',
  'how.step1.title.en': 'Create an account',
  'how.step1.desc.fr': 'Inscrivez-vous en quelques clics',
  'how.step1.desc.en': 'Sign up in a few clicks',
  'how.step2.title.fr': 'Remplir le questionnaire',
  'how.step2.title.en': 'Fill out the questionnaire',
  'how.step2.desc.fr': 'Décrivez vos besoins et partagez vos ressources',
  'how.step2.desc.en': 'Describe your needs and share your resources',
  'how.step3.title.fr': 'Obtenir votre site web',
  'how.step3.title.en': 'Get your website',
  'how.step3.desc.fr': 'Recevez un aperçu en 24 à 72 heures',
  'how.step3.desc.en': 'Receive a preview in 24 to 72 hours',
  'how.step4.title.fr': 'Approuver et payer',
  'how.step4.title.en': 'Approve and pay',
  'how.step4.desc.fr': 'Validez votre site et procédez au paiement',
  'how.step4.desc.en': 'Validate your site and proceed to payment',
  
  // Packages Section
  'packages.title.fr': 'Nos Forfaits',
  'packages.title.en': 'Our Packages',
  'packages.basic.title.fr': 'Basique',
  'packages.basic.title.en': 'Basic',
  'packages.basic.price.fr': '50,000 XOF',
  'packages.basic.price.en': '50,000 XOF',
  'packages.basic.desc.fr': 'Site vitrine simple jusqu\'à 3 pages',
  'packages.basic.desc.en': 'Simple showcase site up to 3 pages',
  'packages.standard.title.fr': 'Standard',
  'packages.standard.title.en': 'Standard',
  'packages.standard.price.fr': '100,000 XOF',
  'packages.standard.price.en': '100,000 XOF',
  'packages.standard.desc.fr': 'Site professionnel jusqu\'à 5 pages',
  'packages.standard.desc.en': 'Professional site up to 5 pages',
  'packages.premium.title.fr': 'Premium',
  'packages.premium.title.en': 'Premium',
  'packages.premium.price.fr': '200,000 XOF',
  'packages.premium.price.en': '200,000 XOF',
  'packages.premium.desc.fr': 'Site complet avec fonctionnalités avancées',
  'packages.premium.desc.en': 'Complete site with advanced features',
  
  // FAQ Section
  'faq.title.fr': 'Questions Fréquentes',
  'faq.title.en': 'Frequently Asked Questions',
  'faq.q1.fr': 'Combien de temps faut-il pour créer mon site web?',
  'faq.q1.en': 'How long does it take to create my website?',
  'faq.a1.fr': 'Nous livrons un aperçu de votre site web en 24 à 72 heures après la soumission du questionnaire.',
  'faq.a1.en': 'We deliver a preview of your website within 24 to 72 hours after submitting the questionnaire.',
  'faq.q2.fr': 'Comment fonctionne le paiement?',
  'faq.q2.en': 'How does payment work?',
  'faq.a2.fr': 'Vous ne payez qu\'après avoir approuvé l\'aperçu de votre site web. Nous acceptons Orange Money, Wave et les cartes bancaires via Stripe.',
  'faq.a2.en': 'You only pay after approving the preview of your website. We accept Orange Money, Wave, and credit cards via Stripe.',
  'faq.q3.fr': 'Puis-je apporter des modifications après la livraison?',
  'faq.q3.en': 'Can I make changes after delivery?',
  'faq.a3.fr': 'Oui, des révisions mineures sont incluses dans tous nos forfaits. Des modifications plus importantes peuvent entraîner des frais supplémentaires.',
  'faq.a3.en': 'Yes, minor revisions are included in all our packages. More significant changes may incur additional fees.',
  
  // Contact Form
  'contact.title.fr': 'Contactez-nous',
  'contact.title.en': 'Contact Us',
  'contact.name.fr': 'Nom',
  'contact.name.en': 'Name',
  'contact.email.fr': 'Email',
  'contact.email.en': 'Email',
  'contact.message.fr': 'Message',
  'contact.message.en': 'Message',
  'contact.submit.fr': 'Envoyer',
  'contact.submit.en': 'Send',
  'contact.success.fr': 'Message envoyé avec succès!',
  'contact.success.en': 'Message sent successfully!',
  'contact.messagePlaceholder.fr': 'Veuillez décrire exactement ce dont vous avez besoin...',
  'contact.messagePlaceholder.en': 'Please describe exactly what you need help with...',
  
  // Footer
  'footer.rights.fr': 'Tous droits réservés',
  'footer.rights.en': 'All rights reserved',
  'footer.privacy.fr': 'Politique de confidentialité',
  'footer.privacy.en': 'Privacy Policy',
  'footer.terms.fr': 'Termes et conditions',
  'footer.terms.en': 'Terms & Conditions',
  'footer.description.fr': 'Sites web pour entreprises sénégalaises, livrés en 24-72 heures.',
  'footer.description.en': 'Websites for Senegalese businesses, delivered in 24-72 hours.',
  
  // Signup/Login
  'signup.title.fr': 'Créer un compte',
  'signup.title.en': 'Create an account',
  'signup.name.fr': 'Nom',
  'signup.name.en': 'Name',
  'signup.namePlaceholder.fr': 'Votre nom complet',
  'signup.namePlaceholder.en': 'Your full name',
  'signup.nameRequired.fr': 'Le nom est requis',
  'signup.nameRequired.en': 'Name is required',
  'signup.email.fr': 'Email',
  'signup.email.en': 'Email',
  'signup.password.fr': 'Mot de passe',
  'signup.password.en': 'Password',
  'signup.phoneNumber.fr': 'Numéro de téléphone',
  'signup.phoneNumber.en': 'Phone number',
  'signup.submitButton.fr': 'Créer un compte',
  'signup.submitButton.en': 'Create Account',
  'signup.processing.fr': 'Traitement...',
  'signup.processing.en': 'Processing...',
  'signup.alreadyHaveAccount.fr': 'Vous avez déjà un compte?',
  'signup.alreadyHaveAccount.en': 'Already have an account?',
  'signup.loginLink.fr': 'Se connecter',
  'signup.loginLink.en': 'Log in',
  'signup.success.fr': 'Compte créé avec succès',
  'signup.success.en': 'Account created successfully',
  'signup.redirecting.fr': 'Redirection vers votre tableau de bord',
  'signup.redirecting.en': 'Redirecting to your dashboard',
  'signup.error.fr': 'Erreur',
  'signup.error.en': 'Error',
  'signup.tryAgain.fr': 'Veuillez réessayer',
  'signup.tryAgain.en': 'Please try again',
  'signup.emailRequired.fr': 'Email requis',
  'signup.emailRequired.en': 'Email is required',
  'signup.passwordLength.fr': 'Le mot de passe doit contenir au moins 8 caractères',
  'signup.passwordLength.en': 'Password must be at least 8 characters',
  'signup.phoneRequired.fr': 'Numéro de téléphone requis',
  'signup.phoneRequired.en': 'Phone number is required',
  
  // Login
  'login.title.fr': 'Connexion',
  'login.title.en': 'Login',
  'login.submitButton.fr': 'Se connecter',
  'login.submitButton.en': 'Login',
  'login.noAccount.fr': 'Vous n\'avez pas de compte?',
  'login.noAccount.en': 'Don\'t have an account?',
  'login.signupLink.fr': 'Créer un compte',
  'login.signupLink.en': 'Create an account',
  
  // Dashboard
  'dashboard.welcome.fr': 'Bienvenue',
  'dashboard.welcome.en': 'Welcome',
  'dashboard.addPhone.fr': 'Veuillez ajouter votre numéro de téléphone',
  'dashboard.addPhone.en': 'Please add your phone number',
  'dashboard.savePhone.fr': 'Enregistrer le numéro',
  'dashboard.savePhone.en': 'Save phone number',
  'dashboard.progressTracker.fr': 'Suivi de progression',
  'dashboard.progressTracker.en': 'Progress Tracker',
  
  'dashboard.steps.form.fr': 'Questionnaire',
  'dashboard.steps.form.en': 'Questionnaire',
  'dashboard.steps.inProgress.fr': 'En cours de création',
  'dashboard.steps.inProgress.en': 'Website in progress',
  'dashboard.steps.preview.fr': 'Aperçu disponible',
  'dashboard.steps.preview.en': 'Preview available',
  'dashboard.steps.approval.fr': 'Approbation',
  'dashboard.steps.approval.en': 'Approval',
  'dashboard.steps.payment.fr': 'Paiement',
  'dashboard.steps.payment.en': 'Payment',
  
  'dashboard.preview.title.fr': 'Aperçu de votre site',
  'dashboard.preview.title.en': 'Website Preview',
  'dashboard.preview.frameText.fr': 'Aperçu du site web',
  'dashboard.preview.frameText.en': 'Website preview',
  'dashboard.preview.openInNewTab.fr': 'Ouvrir dans un nouvel onglet',
  'dashboard.preview.openInNewTab.en': 'Open in new tab',
  'dashboard.buttons.approveSite.fr': 'Approuver le site',
  'dashboard.buttons.approveSite.en': 'Approve Site',
  
  'dashboard.inProgress.title.fr': 'Site web en cours de création',
  'dashboard.inProgress.title.en': 'Website In Progress',
  'dashboard.inProgress.message.fr': 'Votre site web est en cours de création',
  'dashboard.inProgress.message.en': 'Your website is being built',
  'dashboard.inProgress.timeRemaining.fr': 'Nous terminerons votre site dans',
  'dashboard.inProgress.timeRemaining.en': 'We\'ll complete your website within',
  
  // Time units
  'days.fr': 'jours',
  'days.en': 'days',
  'hours.fr': 'heures',
  'hours.en': 'hours',
  'and.fr': 'et',
  'and.en': 'and',
  
  // Questionnaire
  'questionnaire.title.fr': 'Questionnaire de création de site',
  'questionnaire.title.en': 'Website Creation Questionnaire',
  
  'questionnaire.businessName.label.fr': 'Nom de l\'entreprise',
  'questionnaire.businessName.label.en': 'Business name',
  
  'questionnaire.businessDescription.label.fr': 'Description de l\'activité',
  'questionnaire.businessDescription.label.en': 'Description of business',
  
  'questionnaire.siteType.label.fr': 'Quel type de site souhaitez-vous ?',
  'questionnaire.siteType.label.en': 'What type of site do you want?',
  'questionnaire.siteType.basic.fr': 'Basique',
  'questionnaire.siteType.basic.en': 'Basic',
  'questionnaire.siteType.standard.fr': 'Standard',
  'questionnaire.siteType.standard.en': 'Standard',
  'questionnaire.siteType.premium.fr': 'Premium',
  'questionnaire.siteType.premium.en': 'Premium',
  
  'questionnaire.description.label.fr': 'Décrivez votre site',
  'questionnaire.description.label.en': 'Describe your site',
  'questionnaire.description.helpText.fr': 'Décrivez exactement ce que vous voulez que votre site soit et fasse en détail',
  'questionnaire.description.helpText.en': 'Describe exactly what you want your site to be and do in detail',
  'questionnaire.description.placeholder.fr': 'Veuillez fournir une description détaillée des fonctionnalités, caractéristiques et objectifs souhaités pour votre site web...',
  'questionnaire.description.placeholder.en': 'Please provide a detailed description of your desired website functionality, features, and purpose...',
  
  'questionnaire.references.label.fr': 'Sites de référence',
  'questionnaire.references.label.en': 'Reference Sites',
  'questionnaire.references.helpText.fr': 'Veuillez partager des liens vers des sites web qui ont un design ou une fonctionnalité que vous aimez',
  'questionnaire.references.helpText.en': 'Please share links to websites that have a design or functionality you like',
  
  'questionnaire.social.label.fr': 'Liens des réseaux sociaux',
  'questionnaire.social.label.en': 'Social Media Links',
  'questionnaire.social.facebook.fr': 'Facebook',
  'questionnaire.social.facebook.en': 'Facebook',
  'questionnaire.social.instagram.fr': 'Instagram',
  'questionnaire.social.instagram.en': 'Instagram',
  'questionnaire.social.twitter.fr': 'Twitter',
  'questionnaire.social.twitter.en': 'Twitter',
  'questionnaire.social.whatsapp.fr': 'WhatsApp',
  'questionnaire.social.whatsapp.en': 'WhatsApp',
  'questionnaire.social.linkedin.fr': 'LinkedIn',
  'questionnaire.social.linkedin.en': 'LinkedIn',
  
  'questionnaire.domain.question.fr': 'Avez-vous un nom de domaine ?',
  'questionnaire.domain.question.en': 'Do you have a domain name?',
  'questionnaire.domain.yes.fr': 'Oui',
  'questionnaire.domain.yes.en': 'Yes',
  'questionnaire.domain.no.fr': 'Non',
  'questionnaire.domain.no.en': 'No',
  'questionnaire.domain.enter.fr': 'Entrez votre nom de domaine',
  'questionnaire.domain.enter.en': 'Enter your domain name',
  'questionnaire.domain.register.fr': 'Voulez-vous que nous en enregistrions un pour 20.000 XOF ?',
  'questionnaire.domain.register.en': 'Would you like us to register one for 20,000 XOF?',
  'questionnaire.domain.price.fr': '20,000 XOF pour l\'enregistrement d\'un domaine pour 1 an',
  'questionnaire.domain.price.en': '20,000 XOF for 1-year domain registration',
  
  'questionnaire.files.label.fr': 'Logo et Images',
  'questionnaire.files.label.en': 'Logo & Images',
  'questionnaire.files.helpText.fr': 'Téléchargez votre logo ou des images à inclure sur votre site',
  'questionnaire.files.helpText.en': 'Upload your logo or images to include on your site',
  'questionnaire.files.dragDrop.fr': 'Cliquez ou glissez des fichiers ici',
  'questionnaire.files.dragDrop.en': 'Click or drag files here',
  'questionnaire.files.formats.fr': 'PNG, JPG, PDF, ZIP (max 10 MB)',
  'questionnaire.files.formats.en': 'PNG, JPG, PDF, ZIP (max 10 MB)',
  'questionnaire.files.selected.fr': 'Fichiers sélectionnés',
  'questionnaire.files.selected.en': 'Selected files',
  
  'questionnaire.submit.fr': 'Soumettre',
  'questionnaire.submit.en': 'Submit',
  'questionnaire.submitting.fr': 'Envoi en cours...',
  'questionnaire.submitting.en': 'Submitting...',
  
  'questionnaire.validation.descriptionRequired.fr': 'Une description est requise',
  'questionnaire.validation.descriptionRequired.en': 'Description is required',
  'questionnaire.validation.referencesRequired.fr': 'Des sites de référence sont requis',
  'questionnaire.validation.referencesRequired.en': 'Reference sites are required',
  
  'questionnaire.success.title.fr': 'Questionnaire soumis avec succès',
  'questionnaire.success.title.en': 'Questionnaire submitted successfully',
  'questionnaire.success.description.fr': 'Nous avons reçu vos informations et commencerons à créer votre site web. Vous recevrez un aperçu dans les 24 à 72 heures.',
  'questionnaire.success.description.en': 'We have received your information and will start building your website. You will receive a preview within 24-72 hours.',
  
  'questionnaire.error.title.fr': 'Erreur lors de la soumission',
  'questionnaire.error.title.en': 'Submission error',
  'questionnaire.error.description.fr': 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.',
  'questionnaire.error.description.en': 'An error occurred while submitting the form. Please try again.',
  
  // Admin
  'admin.title.fr': 'Portail Administrateur',
  'admin.title.en': 'Admin Portal',
  'admin.login.title.fr': 'Connexion Admin',
  'admin.login.title.en': 'Admin Login',
  'admin.dashboard.title.fr': 'Tableau de bord Admin',
  'admin.dashboard.title.en': 'Admin Dashboard',
  'admin.requests.title.fr': 'Demandes de sites web',
  'admin.requests.title.en': 'Website Requests',
  'admin.requests.customer.fr': 'Client',
  'admin.requests.customer.en': 'Customer',
  'admin.requests.contact.fr': 'Contact',
  'admin.requests.contact.en': 'Contact',
  'admin.requests.status.fr': 'Statut',
  'admin.requests.status.en': 'Status',
  'admin.requests.submitted.fr': 'Soumis le',
  'admin.requests.submitted.en': 'Submitted',
  'admin.requests.actions.fr': 'Actions',
  'admin.requests.actions.en': 'Actions',
  'admin.requests.view.fr': 'Voir',
  'admin.requests.view.en': 'View',
  'admin.details.title.fr': 'Détails de la demande',
  'admin.details.title.en': 'Request Details',
  'admin.actions.markInProgress.fr': 'Marquer en cours',
  'admin.actions.markInProgress.en': 'Mark In Progress',
  'admin.actions.markComplete.fr': 'Marquer terminé',
  'admin.actions.markComplete.en': 'Mark Complete',
  'admin.actions.download.fr': 'Télécharger le questionnaire',
  'admin.actions.download.en': 'Download Questionnaire',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const t = (key: string): string => {
    const translationKey = `${key}.${language}`;
    return translations[translationKey as keyof typeof translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
