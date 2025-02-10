// hooks/useAuth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 확인
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login')
    }
    return { error }
  }

  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
    getUser
  }
}