
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const formSchema = z.object({
    email: z.string().email({
      message: t('signup.emailRequired'),
    }),
    password: z.string().min(8, {
      message: t('signup.passwordLength'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      console.log("Attempting login with:", values.email);
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        variant: "destructive",
        title: t('login.error'),
        description: t('login.errorMessage'),
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
              {t('login.title')}
            </h1>

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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-black">{t('signup.password')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-webale-blue hover:underline">
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-webale-blue hover:bg-opacity-90 mt-6 h-12 text-lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('signup.processing')}
                    </span>
                  ) : (
                    t('login.submitButton')
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {t('login.noAccount')} {' '}
                <Link
                  to="/signup"
                  className="text-webale-blue hover:underline font-medium"
                >
                  {t('login.signupLink')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
