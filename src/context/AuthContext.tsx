import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, discordLoginUrl, type User } from '../api/client'

interface AuthContextValue {
  user: User | null
  loading: boolean
  loginWithDiscord: (returnTo?: string) => void
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const r = await api.me()
      setUser(r.user)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('auth') === 'success') {
      refreshUser()
      params.delete('auth')
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`
      window.history.replaceState({}, '', next)
    }
    const authError = params.get('auth_error')
    if (authError) {
      console.warn('Discord Login:', authError)
      params.delete('auth_error')
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`
      window.history.replaceState({}, '', next)
    }
  }, [refreshUser])

  const loginWithDiscord = useCallback((returnTo = '/') => {
    window.location.href = discordLoginUrl(returnTo)
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, loginWithDiscord, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth außerhalb von AuthProvider')
  return ctx
}
