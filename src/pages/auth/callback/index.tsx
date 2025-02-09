// pages/auth/callback/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // 인증 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      console.log('Session:', session)

      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const { data: existingUser, error: fetchError } = await supabase
            .from('iidt_member')
            .select()
            .eq('mem_email', session.user.email)
            .single()
      
          console.log('Existing user check:', existingUser)
          
          const userData = {
            mem_userid: `${session.user.app_metadata.provider}_${session.user.id.substring(0, 8)}`,
            mem_email: session.user.email,
            mem_nickname: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
            mem_social: session.user.app_metadata.provider,
            mem_status: 'active',
            profile_img: session.user.user_metadata.avatar_url,
            is_deleted: false,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          }
          console.log('userData', userData)
          if (!existingUser) {
            // 새 사용자인 경우에만 created_at 추가
            userData.created_at = new Date().toISOString()
          }
      
          const { data, error } = await supabase
            .from('iidt_member')
            .upsert(userData, {
              onConflict: 'mem_email', // email을 기준으로 upsert
              ignoreDuplicates: true  // 중복 무시하지 않음
            })
            .select()
      
          if (error) {
            console.error('Upsert Error:', error)
            throw error
          }
      
          // console.log('Upsert success:', data)
          router.push('/')
        } catch (error) {
          console.error('DB Error:', error)
          router.push('/error')
        }
      }
    })

    // cleanup
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <div>로그인 처리 중...</div>
}