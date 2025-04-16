
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: t('signup.emailRequired'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Call Supabase password reset
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setResetSent(true);
      toast({
        title: t('forgotPassword.success'),
        description: t('forgotPassword.successMessage'),
      });
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast({
        variant: "destructive",
        title: t('forgotPassword.error'),
        description: t('forgotPassword.errorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-webale-darkGray mb-6 text-center">
              {t('forgotPassword.title')}
            </h1>

            {resetSent ? (
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  {t('forgotPassword.checkEmail')}
                </p>
                <Link to="/login" className="text-webale-blue hover:underline font-medium">
                  {t('forgotPassword.backToLogin')}
                </Link>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {t('forgotPassword.instructions')}
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-black">{t('signup.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-webale-blue hover:bg-opacity-90 mt-6 h-12 text-lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('forgotPassword.processing')}
                        </span>
                      ) : (
                        t('forgotPassword.submitButton')
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    <Link
                      to="/login"
                      className="text-webale-blue hover:underline font-medium"
                    >
                      {t('forgotPassword.backToLogin')}
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
