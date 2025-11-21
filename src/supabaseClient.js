import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tywlfnxugkcdszapteky.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5d2xmbnh1Z2tjZHN6YXB0ZWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzY2ODcsImV4cCI6MjA3OTI1MjY4N30.81dprrO7YtH_ZM7QESF28eUNhNBXvLGRMtJ9ScWfPRQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
