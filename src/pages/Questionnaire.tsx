
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Questionnaire: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Form validation schema
  const formSchema = z.object({
    description: z.string().min(10, {
      message: t('questionnaire.validation.descriptionRequired'),
    }),
    hasDomain: z.enum(['yes', 'no']),
    domain: z.string().optional(),
    wantDomain: z.boolean().optional(),
    socialLinks: z.string().optional(),
  });

  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      hasDomain: 'no',
      domain: '',
      wantDomain: false,
      socialLinks: '',
    },
  });

  // Watch hasDomain value to conditionally show domain fields
  const hasDomain = form.watch('hasDomain');

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...fileList]);
    }
  };

  // Remove a selected file
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically upload the form data and files to your backend
      console.log('Form values:', values);
      console.log('Files:', selectedFiles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('questionnaire.success.title'),
        description: t('questionnaire.success.description'),
      });
      
      // Redirect to dashboard and update status
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: t('questionnaire.error.title'),
        description: t('questionnaire.error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-webale-darkGray mb-6">
              {t('questionnaire.title')}
            </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-webale-darkGray">
                        {t('questionnaire.description.label')}
                      </FormLabel>
                      <p className="text-sm text-gray-500 mb-2">
                        {t('questionnaire.description.helpText')}
                      </p>
                      <FormControl>
                        <Textarea 
                          placeholder={t('questionnaire.description.placeholder')}
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Domain Fields */}
                <FormField
                  control={form.control}
                  name="hasDomain"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-medium text-webale-darkGray">
                        {t('questionnaire.domain.question')}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {t('questionnaire.domain.yes')}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {t('questionnaire.domain.no')}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {hasDomain === 'yes' && (
                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-webale-darkGray">
                          {t('questionnaire.domain.enter')}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="exemple.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {hasDomain === 'no' && (
                  <FormField
                    control={form.control}
                    name="wantDomain"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium text-webale-darkGray">
                            {t('questionnaire.domain.register')}
                          </FormLabel>
                          <p className="text-sm text-gray-500">
                            {t('questionnaire.domain.price')}
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                {/* Social Links Field */}
                <FormField
                  control={form.control}
                  name="socialLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-webale-darkGray">
                        {t('questionnaire.social.label')}
                      </FormLabel>
                      <p className="text-sm text-gray-500 mb-2">
                        {t('questionnaire.social.helpText')}
                      </p>
                      <FormControl>
                        <Textarea 
                          placeholder={t('questionnaire.social.placeholder')}
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File Upload */}
                <div className="space-y-3">
                  <FormLabel className="font-medium text-webale-darkGray">
                    {t('questionnaire.files.label')}
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    {t('questionnaire.files.helpText')}
                  </p>
                  
                  <div className="flex justify-center w-full">
                    <label
                      htmlFor="fileUpload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">{t('questionnaire.files.dragDrop')}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('questionnaire.files.formats')}
                        </p>
                      </div>
                      <input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {/* Show selected files */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-webale-darkGray mb-2">
                        {t('questionnaire.files.selected')} ({selectedFiles.length})
                      </h3>
                      <ul className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <li key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
                            <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              ✕
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-webale-blue hover:bg-opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('questionnaire.submitting')}
                    </>
                  ) : (
                    t('questionnaire.submit')
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questionnaire;
