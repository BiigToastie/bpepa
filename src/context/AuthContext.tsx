import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, type User } from '../api/client'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName?: string) => Promise<void>
  logout: () => Promise<void>
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.me()
      .then((r) => setUser(r.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const r = await api.login(email, password)
    setUser(r.user)
  }, [])

  const register = useCallback(async (email: string, password: string, displayName?: string) => {
    const r = await api.register(email, password, displayName)
    setUser(r.user)
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setUser(null)
  }, [])

  const requireAuth = useCallback(() => !!user, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth außerhalb von AuthProvider')
  return ctx
}
