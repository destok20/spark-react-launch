
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuestionnaireFormProps {
  onSubmit: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onSubmit }) => {
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Form validation schema
  const formSchema = z.object({
    businessName: z.string().min(2, {
      message: currentLanguage === 'fr' ? "Le nom de l'entreprise est requis" : "Business name is required",
    }),
    businessDescription: z.string().min(10, {
      message: currentLanguage === 'fr' ? "La description de l'entreprise est requise" : "Business description is required",
    }),
    siteType: z.enum(['basic', 'standard', 'premium']),
    description: z.string().min(10, {
      message: t('questionnaire.validation.descriptionRequired'),
    }),
    hasDomain: z.enum(['yes', 'no']),
    domain: z.string().optional(),
    wantDomain: z.boolean().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    references: z.string().min(5, {
      message: t('questionnaire.validation.referencesRequired'),
    }),
  });

  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      businessDescription: '',
      siteType: 'basic',
      description: '',
      hasDomain: 'no',
      domain: '',
      wantDomain: false,
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      references: '',
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
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
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
      
      // Call the parent's onSubmit to update status
      onSubmit();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Business Name Field */}
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-webale-darkGray">
                {currentLanguage === 'fr' ? t('questionnaire.businessName.label') : t('questionnaire.businessName.label.en')}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Description Field */}
        <FormField
          control={form.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-webale-darkGray">
                {currentLanguage === 'fr' ? t('questionnaire.businessDescription.label') : t('questionnaire.businessDescription.label.en')}
              </FormLabel>
              <FormControl>
                <Textarea 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Site Type Field */}
        <FormField
          control={form.control}
          name="siteType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-webale-darkGray">
                {currentLanguage === 'fr' ? t('questionnaire.siteType.label') : t('questionnaire.siteType.label.en')}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={currentLanguage === 'fr' ? "Sélectionnez le type de site" : "Select site type"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="basic">
                    {currentLanguage === 'fr' ? t('questionnaire.siteType.basic') : t('questionnaire.siteType.basic.en')}
                  </SelectItem>
                  <SelectItem value="standard">
                    {currentLanguage === 'fr' ? t('questionnaire.siteType.standard') : t('questionnaire.siteType.standard.en')}
                  </SelectItem>
                  <SelectItem value="premium">
                    {currentLanguage === 'fr' ? t('questionnaire.siteType.premium') : t('questionnaire.siteType.premium.en')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-webale-darkGray">
                {currentLanguage === 'fr' ? t('questionnaire.description.label') : t('questionnaire.description.label.en')}
              </FormLabel>
              <p className="text-sm text-gray-500 mb-2">
                {currentLanguage === 'fr' ? t('questionnaire.description.helpText') : t('questionnaire.description.helpText.en')}
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

        {/* Reference Sites */}
        <FormField
          control={form.control}
          name="references"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-webale-darkGray">
                {currentLanguage === 'fr' ? t('questionnaire.references.label') : t('questionnaire.references.label.en')}
              </FormLabel>
              <p className="text-sm text-gray-500 mb-2">
                {currentLanguage === 'fr' ? t('questionnaire.references.helpText') : t('questionnaire.references.helpText.en')}
              </p>
              <FormControl>
                <Textarea 
                  placeholder="https://example.com, https://anothersite.com"
                  className="min-h-[100px]"
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
                {currentLanguage === 'fr' ? t('questionnaire.domain.question') : t('questionnaire.domain.question.en')}
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
                      {currentLanguage === 'fr' ? t('questionnaire.domain.yes') : t('questionnaire.domain.yes.en')}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      {currentLanguage === 'fr' ? t('questionnaire.domain.no') : t('questionnaire.domain.no.en')}
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
                  {currentLanguage === 'fr' ? t('questionnaire.domain.enter') : t('questionnaire.domain.enter.en')}
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
                    {currentLanguage === 'fr' ? t('questionnaire.domain.register') : t('questionnaire.domain.register.en')}
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    {currentLanguage === 'fr' ? t('questionnaire.domain.price') : t('questionnaire.domain.price.en')}
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

        {/* Social Media Links */}
        <div className="space-y-4">
          <FormLabel className="font-medium text-webale-darkGray">
            {currentLanguage === 'fr' ? t('questionnaire.social.label') : t('questionnaire.social.label.en')}
          </FormLabel>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {currentLanguage === 'fr' ? t('questionnaire.social.facebook') : t('questionnaire.social.facebook.en')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://facebook.com/yourpage" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {currentLanguage === 'fr' ? t('questionnaire.social.instagram') : t('questionnaire.social.instagram.en')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://instagram.com/yourhandle" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {currentLanguage === 'fr' ? t('questionnaire.social.twitter') : t('questionnaire.social.twitter.en')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://twitter.com/yourhandle" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {currentLanguage === 'fr' ? t('questionnaire.social.linkedin') : t('questionnaire.social.linkedin.en')}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://linkedin.com/in/yourprofile" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <FormLabel className="font-medium text-webale-darkGray">
            {currentLanguage === 'fr' ? t('questionnaire.files.label') : t('questionnaire.files.label.en')}
          </FormLabel>
          <p className="text-sm text-gray-500">
            {currentLanguage === 'fr' ? t('questionnaire.files.helpText') : t('questionnaire.files.helpText.en')}
          </p>
          
          <div className="flex justify-center w-full">
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    {currentLanguage === 'fr' ? t('questionnaire.files.dragDrop') : t('questionnaire.files.dragDrop.en')}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {currentLanguage === 'fr' ? t('questionnaire.files.formats') : t('questionnaire.files.formats.en')}
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
                {currentLanguage === 'fr' ? t('questionnaire.files.selected') : t('questionnaire.files.selected.en')} ({selectedFiles.length})
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
              {currentLanguage === 'fr' ? t('questionnaire.submitting') : t('questionnaire.submitting.en')}
            </>
          ) : (
            currentLanguage === 'fr' ? t('questionnaire.submit') : t('questionnaire.submit.en')
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
