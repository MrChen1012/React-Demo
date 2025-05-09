import { useState, useRef } from 'react'
import Modal from './Modal'
import './App.scss'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="App">
      <button onClick={() => setIsOpen(true)}>打开弹窗</button>

      <Modal isOpen={isOpen} onChange={setIsOpen} defaultOpen={true}>
        <p>按 ESC 关闭弹窗</p>
      </Modal>
    </div>
  )
}
