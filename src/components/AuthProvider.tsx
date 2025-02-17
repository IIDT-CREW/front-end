import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router' // next/router 사용

const AuthContext = createContext<{
  user: User | null
  loading: boolean
  signOut: () => Promise<{ error: Error | null }>
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<{ error: Error | null }>
}>({
  user: null,
  loading: true,
  signOut: async () => ({ error: null }),
  isAuthenticated: false,
  signInWithGoogle: async () => ({ error: null }),
})
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    // 1. 먼저 localStorage에서 상태 복구 시도
    const restoreAuthState = () => {
      const savedAuth = localStorage.getItem('authState')
      if (savedAuth) {
        const { isAuthenticated: saved, user: savedUser } = JSON.parse(savedAuth)
        setIsAuthenticated(saved)
        setUser(savedUser)
      }
    }

    // 2. 초기 세션 체크
    const initializeAuth = async () => {
      try {
        restoreAuthState() // localStorage 복구 먼저 시도

        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setIsAuthenticated(true)
          setUser(session.user)
          localStorage.setItem(
            'authState',
            JSON.stringify({
              isAuthenticated: true,
              user: session.user,
            }),
          )
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // 3. 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)

      if (session) {
        setIsAuthenticated(true)
        setUser(session.user)
        localStorage.setItem(
          'authState',
          JSON.stringify({
            isAuthenticated: true,
            user: session.user,
          }),
        )
      } else {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('authState')
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem('authState')
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
