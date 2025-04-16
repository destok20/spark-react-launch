
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: { name: string; email: string } | null;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      setLoading(true);

      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log("Auth state changed:", event, session);
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Use setTimeout to prevent supabase callback deadlock
            setTimeout(() => {
              fetchUserProfile(session.user.id);
            }, 0);
          } else {
            setProfile(null);
          }
        }
      );

      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for ID:", userId);
      const { data, error } = await supabase
        .from('users')
        .select('name, email')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erreur de récupération du profil:', error);
        return;
      }
      
      if (data) {
        console.log("User profile data:", data);
        setProfile(data);
      } else {
        console.log("No profile data found");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    try {
      setLoading(true);
      
      console.log("Signing up user with data:", { email, name, phone });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone
          }
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        toast({
          variant: "destructive",
          title: "Erreur d'inscription / Signup error",
          description: error.message,
        });
        return;
      }
      
      console.log("Signup successful:", data);
      toast({
        title: "Inscription réussie / Signup successful",
        description: "Veuillez vous connecter / Please login",
      });
      
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription / Signup error",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer. / An error occurred during signup. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion / Login error",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Connexion réussie / Login successful",
        description: "Bienvenue / Welcome back",
      });
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion / Login error",
        description: "Une erreur s'est produite lors de la connexion. Veuillez réessayer. / An error occurred during login. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de déconnexion / Logout error",
          description: error.message,
        });
        return;
      }
      
      // Redirect to home page after logout
      navigate('/');
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    signUp,
    signIn,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
