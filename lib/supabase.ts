import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dycwhzsnwmrcjyuddmwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Y3doenNud21yY2p5dWRkbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzE4MTQsImV4cCI6MjA3OTcwNzgxNH0.Jt13SOblmmmPoHn5TyzFoaUhwimbDCgAA0Hdx1Tw4nQ';

export const supabase = createClient(supabaseUrl, supabaseKey);