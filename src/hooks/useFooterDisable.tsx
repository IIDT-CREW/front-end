import { usePathname } from 'next/navigation'
const useFooterDisable = () => {
  const pathname = usePathname()
  const isWritePage = pathname.indexOf('/write') !== -1
  return isWritePage
}

export default useFooterDisable
