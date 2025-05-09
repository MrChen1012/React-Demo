import { useEffect, forwardRef, useImperativeHandle, useRef, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import useControlledState from '../hooks/useControlledState'
import usePortal from '../hooks/usePortal'
import { useCloseOnEsc, useCloseOverlayClick } from '../hooks/useCloseHandlers'
import './index.scss'

const Modal = forwardRef(
  (
    {
      isOpen: controlledIsOpen,
      onChange,
      title,
      children,
      defaultOpen,
      closeOnEsc = true,
      closeOnOverlayClick = true
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useControlledState(controlledIsOpen, onChange, defaultOpen || false)
    const [portalRootRef, isPortalReady] = usePortal()

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false)
    }))

    // 统一关闭处理函数
    const handleClose = useCallback(() => {
      setIsOpen(false)
      onChange?.(false)
    }, [setIsOpen, onChange])

    // ESC关闭功能
    useCloseOnEsc(handleClose, isOpen, closeOnEsc)

    // 遮罩层点击关闭
    useCloseOverlayClick(handleClose, closeOnOverlayClick)

    return isOpen && isPortalReady
      ? ReactDOM.createPortal(
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>{title}</h3>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <button onClick={handleClose}>确认</button>
                <button onClick={handleClose}>取消</button>
              </div>
            </div>
          </div>,
          portalRootRef.current
        )
      : null
  }
)

export default Modal
