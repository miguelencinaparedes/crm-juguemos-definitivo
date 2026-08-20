import { createClient } from '@supabase/supabase-js';

// Usamos el operador '||' para evitar que falle si la variable está indefinida
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-url-de-supabase.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);