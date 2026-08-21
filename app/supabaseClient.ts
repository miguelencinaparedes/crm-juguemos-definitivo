import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hozvongacraetwmyipqv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Vv9XycgQnSMRvqQ0e8EeGQ_4w71DYqb';

export const supabase = createClient(supabaseUrl, supabaseKey); 