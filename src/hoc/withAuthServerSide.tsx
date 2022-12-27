import nookies from 'nookies'

import axios from 'api'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getUserInfo } from 'api/auth'
import { authActions } from 'store/auth'
/* getUser */
async function getUser(content: any) {
  const res = await getUserInfo()

  if (res.data && res.data.code === '0000') {
    const { result: userInfo } = res.data

    return userInfo
  }
  return null
}

export function withAuthServerSideProps(getServerSidePropsFunc?) {
  return async (context: any) => {
    context.res.setHeader('set-cookie', '')
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.Cookie = ''
    let user = null
    const nookie = nookies.get(context)
    const accessToken = nookie['access_token']
    const refresh_token = nookie['refresh_token']
    //console.log('context = ', nookie)
    if (!accessToken && !refresh_token) {
      return { props: { user, data: { props: { user } } } }
    }
    /* 토큰 세팅 */
    if (context.req && cookie) {
      axios.defaults.headers.common.Cookie = cookie
      const bearer = `Bearer ${accessToken}`
      axios.defaults.headers.common['Authorization'] = bearer
      if (refresh_token) axios.defaults.headers.common['refresh'] = nookie['refresh_token']
      user = await getUser(context)
    }

    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context, user) } }
    }

    return { props: { user, data: { props: { user } } } }
  }
}

// withAuthComponent.tsx
export function withAuthComponent(Component: any, isProtected = true) {
  return ({ user, data }: { user: any; data: any }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    if (isProtected && !user) {
      router.push('/login')
      // return <h1>Denied</h1> // or redirect, we can use the Router because we are client side here
      return null
    }

    if (user) {
      dispatch(
        authActions.setAuth({
          isAuthenticated: true,
          accessToken: '',
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          userid: user.userid,
          memIdx: user.memIdx,
        }),
      )
    }
    return <Component {...data.props} />
  }
}
