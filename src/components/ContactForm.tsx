
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-webale-lightBlue">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-webale-darkGray">
          {t('contact.title')}
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-webale-darkGray font-medium">
                  {t('contact.name')} / {t('contact.name.en')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-webale-blue"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-webale-darkGray font-medium">
                  {t('contact.email')} / {t('contact.email.en')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-webale-blue"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-webale-darkGray font-medium">
                  {t('contact.message')} / {t('contact.message.en')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-webale-blue"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-webale-blue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
              >
                {isSubmitting ? '...' : t('contact.submit')} / {isSubmitting ? '...' : t('contact.submit.en')}
              </button>
              
              {isSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {t('contact.success')} / {t('contact.success.en')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
