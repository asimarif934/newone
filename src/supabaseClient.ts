import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sodzcfdzfrlshfcbyuho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZHpjZmR6ZnJsc2hmY2J5dWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODUyODcsImV4cCI6MjA3MDg2MTI4N30.KVH_DMMVghojmb7Le7l6hJShtZ-MZ9GBff6JZHXloNY';
export const supabase = createClient(supabaseUrl, supabaseKey);
