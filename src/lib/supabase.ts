import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const supabaseUrl = "https://vrlepgfekleykzirkwoy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybGVwZ2Zla2xleWt6aXJrd295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0MDIyMTgsImV4cCI6MjA3Mzk3ODIxOH0.x5ii2GoOfOQvZN948Pg9PWk2476wBRl1BsXUkAlsh3s";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});