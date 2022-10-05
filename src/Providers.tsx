import { Provider } from 'react-redux'
import { Store } from '@reduxjs/toolkit'

const Providers: React.FC<{ children: any; store: Store }> = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>
}

export default Providers
