
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, CreditCard, PenTool, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireForm from '@/components/QuestionnaireForm';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Define project status types
type ProjectStatus = 'form_not_submitted' | 'in_progress' | 'preview_available' | 'approval_pending' | 'payment_complete';

const Dashboard: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Project status state
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('form_not_submitted');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(72); // 72 hours countdown
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user project data
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Check if user has submitted a questionnaire
        const { data: questionnaire, error: questionnaireError } = await supabase
          .from('questionnaires')
          .select('id')
          .eq('user_id', user.id)
          .single();
          
        if (questionnaireError && questionnaireError.code !== 'PGRST116') {
          console.error('Error fetching questionnaire:', questionnaireError);
          return;
        }
        
        // If no questionnaire, set status as not submitted
        if (!questionnaire) {
          setProjectStatus('form_not_submitted');
          setIsLoading(false);
          return;
        }
        
        // Check project status
        const { data: project, error: projectError } = await supabase
          .from('website_projects')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (projectError && projectError.code !== 'PGRST116') {
          console.error('Error fetching project:', projectError);
          return;
        }
        
        if (project) {
          // Map project status to UI status
          switch (project.status) {
            case 'in_progress':
              setProjectStatus('in_progress');
              
              // Calculate remaining time based on creation date
              const createdDate = new Date(project.created_at);
              const currentDate = new Date();
              const diffHours = Math.max(0, 72 - Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60)));
              setCountdown(diffHours);
              break;
              
            case 'preview_ready':
              setProjectStatus('preview_available');
              setPreviewUrl(project.preview_url);
              break;
              
            case 'paid':
              setProjectStatus('payment_complete');
              setPreviewUrl(project.preview_url);
              break;
              
            default:
              // If no recognized status, start from form submitted
              setProjectStatus('in_progress');
              break;
          }
        } else if (questionnaire) {
          // Questionnaire exists but no project yet
          setProjectStatus('in_progress');
        }
        
      } catch (error) {
        console.error('Error in useEffect:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjectData();
  }, [user]);

  // Format countdown time
  const formatCountdown = () => {
    const hours = countdown;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days} ${t('days')} ${t('and')} ${remainingHours} ${t('hours')}`;
  };

  // Handle form submission
  const handleQuestionnaireSubmit = async () => {
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: currentLanguage === 'fr' ? "Erreur d'authentification" : "Authentication error",
          description: currentLanguage === 'fr' ? "Vous devez être connecté" : "You must be logged in",
        });
        navigate('/login');
        return;
      }
      
      // Update project status
      setProjectStatus('in_progress');
      
      toast({
        title: currentLanguage === 'fr' ? "Questionnaire soumis avec succès" : "Questionnaire submitted successfully",
        description: currentLanguage === 'fr' ? "Nous avons reçu votre demande" : "We have received your request",
      });
      
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      toast({
        variant: "destructive",
        title: currentLanguage === 'fr' ? "Erreur" : "Error",
        description: currentLanguage === 'fr' ? "Une erreur est survenue" : "An error occurred",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-webale-blue"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-webale-darkGray mb-2">
              {t('dashboard.welcome')}, {profile?.name || ''}
            </h1>
            
            <p className="text-gray-600">
              {projectStatus === 'form_not_submitted' 
                ? currentLanguage === 'fr' 
                  ? 'Veuillez remplir le questionnaire ci-dessous pour commencer' 
                  : 'Please fill out the questionnaire below to get started'
                : projectStatus === 'in_progress'
                ? currentLanguage === 'fr'
                  ? 'Votre site web est en cours de création'
                  : 'Your website is being built'
                : currentLanguage === 'fr'
                  ? 'Votre site web est prêt à être consulté'
                  : 'Your website is ready to be viewed'
              }
            </p>
          </div>

          {/* Progress Tracker - Horizontal */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-webale-darkGray mb-6">
              {currentLanguage === 'fr' ? t('dashboard.progressTracker') : t('dashboard.progressTracker.en')}
            </h2>
            
            <div className="relative">
              <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              <div className="flex justify-between relative z-10">
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 mb-2 flex-shrink-0 ${
                    projectStatus !== 'form_not_submitted' 
                      ? 'bg-green-500 text-white' 
                      : projectStatus === 'form_not_submitted' 
                        ? 'bg-webale-blue text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {projectStatus !== 'form_not_submitted' ? <Check size={20} /> : <FileText size={20} />}
                  </div>
                  <span className="text-sm text-center max-w-[100px]">
                    {currentLanguage === 'fr' ? t('dashboard.steps.form') : t('dashboard.steps.form.en')}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 mb-2 flex-shrink-0 ${
                    ['preview_available', 'approval_pending', 'payment_complete'].includes(projectStatus) 
                      ? 'bg-green-500 text-white' 
                      : projectStatus === 'in_progress' 
                        ? 'bg-webale-blue text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {['preview_available', 'approval_pending', 'payment_complete'].includes(projectStatus) ? <Check size={20} /> : <PenTool size={20} />}
                  </div>
                  <span className="text-sm text-center max-w-[100px]">
                    {currentLanguage === 'fr' ? t('dashboard.steps.inProgress') : t('dashboard.steps.inProgress.en')}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 mb-2 flex-shrink-0 ${
                    ['approval_pending', 'payment_complete'].includes(projectStatus) 
                      ? 'bg-green-500 text-white' 
                      : projectStatus === 'preview_available' 
                        ? 'bg-webale-blue text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {['approval_pending', 'payment_complete'].includes(projectStatus) ? <Check size={20} /> : <Eye size={20} />}
                  </div>
                  <span className="text-sm text-center max-w-[100px]">
                    {currentLanguage === 'fr' ? t('dashboard.steps.preview') : t('dashboard.steps.preview.en')}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 mb-2 flex-shrink-0 ${
                    projectStatus === 'payment_complete' 
                      ? 'bg-green-500 text-white' 
                      : projectStatus === 'approval_pending' 
                        ? 'bg-webale-blue text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {projectStatus === 'payment_complete' ? <Check size={20} /> : <Check size={20} />}
                  </div>
                  <span className="text-sm text-center max-w-[100px]">
                    {currentLanguage === 'fr' ? t('dashboard.steps.approval') : t('dashboard.steps.approval.en')}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-full p-2 mb-2 flex-shrink-0 ${
                    projectStatus === 'payment_complete' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <span className="text-sm text-center max-w-[100px]">
                    {currentLanguage === 'fr' ? t('dashboard.steps.payment') : t('dashboard.steps.payment.en')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Questionnaire or Status Section */}
          {projectStatus === 'form_not_submitted' ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-webale-darkGray mb-6">
                {currentLanguage === 'fr' ? t('questionnaire.title') : t('questionnaire.title.en')}
              </h2>
              
              <QuestionnaireForm onSubmit={handleQuestionnaireSubmit} />
            </div>
          ) : projectStatus === 'in_progress' ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-webale-darkGray mb-6">
                {currentLanguage === 'fr' ? t('dashboard.inProgress.title') : t('dashboard.inProgress.title.en')}
              </h2>
              
              <div className="flex items-center justify-center p-8 border border-blue-100 rounded-lg bg-blue-50">
                <div className="text-center">
                  <Clock className="h-16 w-16 text-webale-blue mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {currentLanguage === 'fr' ? t('dashboard.inProgress.message') : t('dashboard.inProgress.message.en')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentLanguage === 'fr' ? t('dashboard.inProgress.timeRemaining') : t('dashboard.inProgress.timeRemaining.en')}:
                  </p>
                  <div className="text-2xl font-bold text-webale-blue">
                    {formatCountdown()}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Preview Section - only visible when preview is available */}
          {previewUrl && projectStatus === 'preview_available' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-webale-darkGray mb-6">
                {currentLanguage === 'fr' ? t('dashboard.preview.title') : t('dashboard.preview.title.en')}
              </h2>
              
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">
                    {currentLanguage === 'fr' ? t('dashboard.preview.frameText') : t('dashboard.preview.frameText.en')}
                  </p>
                </div>
                {/* Preview iframe would go here in production */}
                {/* <iframe src={previewUrl} className="w-full h-full" title="Website Preview" /> */}
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open(previewUrl, '_blank')}
                  variant="outline"
                  className="flex-1"
                >
                  {currentLanguage === 'fr' ? t('dashboard.preview.openInNewTab') : t('dashboard.preview.openInNewTab.en')}
                </Button>
                
                <Button 
                  onClick={() => navigate('/payment')}
                  className="bg-green-500 hover:bg-green-600 flex-1"
                >
                  {currentLanguage === 'fr' ? t('dashboard.buttons.approveSite') : t('dashboard.buttons.approveSite.en')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
