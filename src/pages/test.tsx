import { useEffect } from 'react'
//import AppleLogin from 'react-apple-login';
import axios from 'axios'
import dynamic from 'next/dynamic'

const AppleLoginTest = dynamic(() => import('views/AppleLoginTest'), {
  ssr: false,
})

const Test = () => {
  useEffect(() => {
    // Listen for authorization success.
    document.addEventListener('AppleIDSignInOnSuccess', (event) => {
      // Handle successful response.
      console.log(event.detail.data)
    })

    // Listen for authorization failures.
    document.addEventListener('AppleIDSignInOnFailure', (event) => {
      // Handle error.
      console.log(event.detail.error)
    })
  }, [])
  return (
    <div style={{ marginTop: '100px' }}>
      <AppleLoginTest />
      {/* <AppleLoginComponent /> */}
    </div>
  )
}

export default Test
