import { useEffect, useRef, useState } from 'react'

export default function usePortal() {
  const portalRootRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    portalRootRef.current = root
    setIsReady(true)

    return () => {
      document.body.removeChild(root)
    }
  }, [])

  return [portalRootRef, isReady]
}
