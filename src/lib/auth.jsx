import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase/client'
const AuthContext = createContext(null)
const DEMO = { 'resident@demo.com': { id: 'demo-resident', role: 'resident', email: 'resident@demo.com', name: 'Mariel Santos' }, 'toc@demo.com': { id: 'demo-toc', role: 'toc', email: 'toc@demo.com', name: 'TOC Operator' } }
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true)
  useEffect(() => { let live = true
    const restore = async () => { const saved = localStorage.getItem('compass-demo-user'); if (saved) setUser(JSON.parse(saved)); if (supabase) { const { data } = await supabase.auth.getSession(); if (data.session && live) { const { data: p } = await supabase.from('profiles').select('*').eq('id', data.session.user.id).single(); setUser({ ...data.session.user, ...p }) } } if (live) setLoading(false) }; restore()
    const sub = supabase?.auth.onAuthStateChange(async (_e, session) => { if (!session) setUser(null) }); return () => { live = false; sub?.data.subscription.unsubscribe() }
  }, [])
  const login = async (email, password) => { if (DEMO[email] && password === 'demo123') { localStorage.setItem('compass-demo-user', JSON.stringify(DEMO[email])); setUser(DEMO[email]); return DEMO[email] } if (!supabase) throw new Error('Use a demo account (password: demo123), or configure Supabase.')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error; const { data: profile, error: pError } = await supabase.from('profiles').select('*').eq('id', data.user.id).single(); if (pError) throw pError; const account = { ...data.user, ...profile }; setUser(account); return account }
  const signup = async (email, password, fullName) => { if (!supabase) throw new Error('Configure Supabase to create an account. Demo sign-in is available now.'); const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } }); if (error) throw error }
  const logout = async () => { localStorage.removeItem('compass-demo-user'); await supabase?.auth.signOut(); setUser(null) }
  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
