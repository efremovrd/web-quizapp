import React from 'react'

interface IconBtnProps {
    description?: string
    size: string
    path: React.ReactNode
    onClick: () => void
  }

export function IconBtn({ description, size, path, onClick }: IconBtnProps) {
    return (
        <div>
            <button type='button' onClick={onClick} className='flex flex-col text-main bg-background hover:bg-main hover:text-background rounded items-center'>
                <svg fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    {path}
                </svg>
                {description && <span className='text-caption font-caption'>{description}</span>}
            </button>
        </div>
    )
}
