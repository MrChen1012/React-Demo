import { useEffect, useCallback } from 'react'

export function useCloseOnEsc(handleClose, isOpen, closeOnEsc) {
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return

    const handler = e => e.key === 'Escape' && handleClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeOnEsc, handleClose])
}

export function useCloseOverlayClick(handleClose, closeOnOverlayClick) {
  return useCallback(
    e => {
      if (
        closeOnOverlayClick &&
        e.target === e.currentTarget // 确保点击的是遮罩层本身
      ) {
        handleClose()
      }
    },
    [closeOnOverlayClick, handleClose]
  )
}
