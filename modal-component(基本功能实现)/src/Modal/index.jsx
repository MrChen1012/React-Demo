import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import ReactDOM from 'react-dom'
import useControlledState from '../hooks/useControlledState'
import './index.scss'

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useControlledState(props.isOpen, props.onClose, false)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }))

  const portalRootRef = useRef(null)

  useEffect(() => {
    if (!portalRootRef.current) {
      portalRootRef.current = document.createElement('div')
      document.body.appendChild(portalRootRef.current)
    }

    return () => {
      // 确保安全移除
      if (document.body.contains(portalRootRef.current)) {
        document.body.removeChild(portalRootRef.current)
      }
      portalRootRef.current = null // 避免空引用
    }
  }, [])

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal">
            <h3>{props.title}</h3>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
              <button onClick={() => setIsOpen(false)}>确认</button>
              <button onClick={() => setIsOpen(false)}>取消</button>
            </div>
          </div>
        </div>,
        portalRootRef.current
      )
    : null
})

export default Modal
