import { useEffect, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import useControlledState from '../hooks/useControlledState'
import './index.scss'

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useControlledState(props.isOpen, props.onClose, false)

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }))

  // 创建 Portal 挂载节点
  const portalRoot = document.createElement('div')

  useEffect(() => {
    document.body.appendChild(portalRoot)
    return () => {
      document.body.removeChild(portalRoot)
    }
  }, [portalRoot])

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
        portalRoot
      )
    : null
})

export default Modal
