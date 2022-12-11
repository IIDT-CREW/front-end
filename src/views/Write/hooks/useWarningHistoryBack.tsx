import { useModal } from 'components/Common'
import { useCallback, useEffect } from 'react'
import WarningHistoryBackModal from '../components/modal/WarningHistoryBackModal'

const useWarningHistoryBack = ({ title, contents, goToBack, page }) => {
  const isWriteDown = () => !contents.every((value) => value.length === 0)
  const [presentWarningHistoryBackModal] = useModal(<WarningHistoryBackModal goToBack={goToBack} />)
  const isWriteDownTitleAndContent = title !== '' || contents[page] !== '' || isWriteDown()

  const preventGoBack = useCallback(() => {
    if (isWriteDownTitleAndContent) {
      presentWarningHistoryBackModal()
    } else {
      history.pushState(null, '', location.href)
    }
  }, [isWriteDownTitleAndContent, presentWarningHistoryBackModal])

  useEffect(() => {
    if (!isWriteDownTitleAndContent) return
    if (isWriteDownTitleAndContent) {
      history.pushState(null, '', location.href)
    }
    window.addEventListener('popstate', preventGoBack)
    return () => {
      window.removeEventListener('popstate', preventGoBack)
    }
  }, [isWriteDownTitleAndContent, preventGoBack])

  return ''
}

export default useWarningHistoryBack
