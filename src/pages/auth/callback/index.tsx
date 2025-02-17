// pages/auth/callback/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { code } = router.query

    // code 파라미터가 있을 경우 세션 교환
    if (code) {
      supabase.auth.exchangeCodeForSession(code as string).catch((error) => {
        console.error('Session exchange error:', error)
        router.push('/error')
      })
    }

    // 인증 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      console.log('Session:', session)

      if (event === 'SIGNED_IN' && session?.user) {
        try {
          // 기존 사용자 체크
          const { data: existingUser, error: fetchError } = await supabase
            .from('iidt_member')
            .select()
            .eq('mem_email', session.user.email)
            .single()

          if (fetchError && fetchError.code !== 'PGRST116') {
            // PGRST116는 결과가 없을 때의 에러
            throw fetchError
          }

          console.log('Existing user check:', existingUser)

          // 사용자 데이터 준비
          const userData = {
            mem_userid: `${session.user.app_metadata.provider}_${session.user.id.substring(0, 8)}`,
            mem_email: session.user.email,
            mem_nickname: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
            mem_social: session.user.app_metadata.provider,
            mem_status: 'active',
            profile_img: session.user.user_metadata.avatar_url,
            is_deleted: false,
            updated_at: new Date().toISOString(),
          }

          // 새 사용자인 경우에만 created_at 설정
          if (!existingUser) {
            // userData.created_at = new Date().toISOString()
          }

          // upsert 수행
          const { data, error } = await supabase
            .from('iidt_member')
            .upsert(userData, {
              onConflict: 'mem_email',
              ignoreDuplicates: false,
            })
            .select()

          if (error) {
            console.error('Upsert Error:', error)
            throw error
          }

          console.log('User data updated successfully')
          router.push('/')
        } catch (error) {
          console.error('DB Error:', error)
          // 더 구체적인 에러 처리
          // if (error.code === '23505') {
          //   // 유니크 제약조건 위반
          //   router.push('/error?type=duplicate')
          // } else {
          //   router.push('/error?type=database')
          // }
        }
      } else if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })

    // cleanup
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, supabase]) // 의존성 추가

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}
