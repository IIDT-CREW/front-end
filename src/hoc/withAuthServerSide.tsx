import nookies from 'nookies'

import axios from 'api'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getUserInfo, refreshTest } from 'api/auth'
import { authActions } from 'store/auth'
/* getUser */
async function getUser(content: any) {
  // const res = await getUserInfo()
  // if (res.data && res.data.code === 200) {
  //   const { data: userInfo } = res.data
  return {
    id: 'test',
    username: 'oo',
    email: 'test',
  }
  //}
  //return null
}

export function withAuthServerSideProps(getServerSidePropsFunc?) {
  return async (context: any) => {
    context.res.setHeader('set-cookie', '')
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.Cookie = ''

    const nookie = nookies.get(context)
    const accessToken = nookie['access_token']
    //있으면 세팅
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
    //없으면 refresh 호출
    if (!accessToken) {
      await refreshTest()
    }
    console.log('nookie= ', nookie)

    const user = await getUser(context)
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
          authenticated: true,
          accessToken: '',
          name: user.username,
          email: user.email,
        }),
      )
    }
    return <Component {...data.props} />
  }
}
