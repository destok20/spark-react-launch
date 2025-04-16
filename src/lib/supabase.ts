
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rovsglwcwlajfoehobiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdnNnbHdjd2xhamZvZWhvYml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NTE2NTIsImV4cCI6MjA2MDMyNzY1Mn0.JrthPFHyVF6T-btTZco529jcqUnzu5n-AASIOYjtxnc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
