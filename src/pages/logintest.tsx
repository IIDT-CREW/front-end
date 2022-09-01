import { login, userInfoTest } from 'api/auth'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth'
const LoginTestPage = () => {
  const dispatch = useDispatch()
  const handleLogin = async () => {
    try {
      const res = await login()
      console.log(res.data.result)
      const accessToken = res.data.result
      dispatch(
        authActions.setAuth({
          isAuthenticated: true,
          accessToken: accessToken,
          userid: 'TEST',
          name: 'TEST',
          email: 'TEST',
        }),
      )
      localStorage.setItem('accessToken', accessToken)
    } catch (e) {
      console.log(e)
    }
  }

  const handleUserInfoTest = async () => {
    try {
      const res = await userInfoTest()
      console.log('res = ', res)
      //localStorage.setItem('accessToken', accessToken)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div style={{ marginTop: '100px' }}>
      <button onClick={handleLogin}>로그인 테스트</button>
      <button onClick={handleUserInfoTest}>handleUserInfoTest 테스트</button>
    </div>
  )
}

export default LoginTestPage
