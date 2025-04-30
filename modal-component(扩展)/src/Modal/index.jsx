import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import ReactDOM from 'react-dom'
import useControlledState from '../hooks/useControlledState'
import './index.scss'

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useControlledState(props.isOpen, props.onChange, false)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }))

  const portalRootRef = useRef(null)

  useEffect(() => {
    const portalRoot = document.createElement('div')
    document.body.appendChild(portalRoot)
    portalRootRef.current = portalRoot

    return () => {
      if (portalRootRef.current) {
        document.body.removeChild(portalRootRef.current)
      }
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
