import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/AuthProvider'

// HOC for protected pages
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        router.push('/')
      }
    }, [user, loading, router])

    if (loading) {
      return <div>Loading...</div>
    }

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
