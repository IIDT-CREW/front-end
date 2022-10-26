import { useEffect } from 'react'
declare global {
  interface Window {
    AppleID: any
  }
}

const AppleLoginTest = () => {
  useEffect(() => {
    // Listen for authorization success.
    document.addEventListener('AppleIDSignInOnSuccess', (event) => {
      // Handle successful response.
      console.log('AppleIDSignInOnSuccess event ', event)
      console.log(event.detail.data)

      const fetch = async () => {
        try {
          const data = await window.AppleID.auth.signIn()
          // Handle successful response.
          console.log(data)
        } catch (error) {
          console.log('error !!')
          // Handle error.
        }
      }
      fetch()
    })

    // Listen for authorization failures.
    document.addEventListener('AppleIDSignInOnFailure', (event) => {
      console.log('AppleIDSignInOnFailure event ', event)
      // Handle error.
      console.log(event.detail.error)
    })
  }, [])
  useEffect(() => {
    const params = {
      clientId: 'com.bundle.sample.client.test',
      redirectURI: 'https://if-i-die-tomorrow.com/oauth/callback/apple',
      scope: 'name email',
    }
    window.AppleID.auth.init(params)
  }, [])

  return (
    <div style={{ marginTop: '100px' }}>
      <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in">
        버튼
      </div>
      {/* <AppleLoginComponent /> */}
    </div>
  )
}

export default AppleLoginTest
