import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } else {
      setProfile(data)
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    console.log('signOut function called in AuthContext')

    // Manually clear Supabase session from storage
    const storageKey = `sb-${supabase.supabaseUrl.split('//')[1].split('.')[0]}-auth-token`
    console.log('Clearing storage with key:', storageKey)
    localStorage.removeItem(storageKey)
    sessionStorage.removeItem(storageKey)

    // Clear state immediately
    console.log('Clearing user and profile state')
    setUser(null)
    setProfile(null)
    console.log('Sign out complete!')

    // Try Supabase signOut in background (don't await)
    supabase.auth.signOut().then(() => {
      console.log('Background Supabase signOut completed')
    }).catch(err => {
      console.error('Background signOut error:', err)
    })
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
