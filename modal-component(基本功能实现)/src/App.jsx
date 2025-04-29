import { useState, useRef } from 'react'
import Modal from './Modal'
import './App.scss'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef()

  return (
    <div className="App">
      <button onClick={() => modalRef.current.open()}>打开非受控弹窗</button>

      <Modal ref={modalRef} title="非受控弹窗标题">
        <p>这个弹窗完全自己管理状态！</p>
        <p>父组件不需要传递任何状态</p>
      </Modal>
    </div>
  )
}
