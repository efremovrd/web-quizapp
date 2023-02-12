import React from 'react'
import { IconBtn } from './IconBtn'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div className="fixed bg-black/50 inset-0" onClick={onClose} />
      <div className="w-[500px] p-px rounded border border-main bg-background absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className='fixed top-px right-px'>
            <IconBtn size="35px" path=<path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"></path> onClick={onClose} />
        </div>
        { children }
      </div>
    </>
  )
}
