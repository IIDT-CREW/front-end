// hooks/useAuth.ts
import { useEffect, useState, useMemo } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = useMemo(() => createClientComponentClient(), [])
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true // 컴포넌트 마운트 상태 추적

    // 초기 세션 확인
    const checkUser = async () => {
      setLoading(true)
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) throw error
        console.log('Initial session check:', session)
        if (mounted) {
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Auth error:', error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    checkUser()

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event)
      console.log('Auth state change session:', session)

      if (mounted) {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session?.user ?? null)
        } else if (event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
          // INITIAL_SESSION에서 세션이 있는 경우에만 null로 설정
          if (!session) {
            setUser(null)
          } else {
            setUser(session.user)
          }
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    }
    return { error }
  }

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user, error }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
    getUser,
  }
}
