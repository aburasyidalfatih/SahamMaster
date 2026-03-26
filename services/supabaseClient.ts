import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://bufcxtjybugefwhdhgtm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZmN4dGp5YnVnZWZ3aGRoZ3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MzcxNTcsImV4cCI6MjA4NDIxMzE1N30.73kOXmaMin9Z4uXz-xN-6K8n0SQIyD0yaXTEbxxLjlk';

// Create a single supabase client for interacting with your database
// We check if url is valid to avoid empty string errors
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;