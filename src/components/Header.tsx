import React from 'react'

interface HeaderProps {
  children: React.ReactNode
  title: string
}

export function Header({children, title}: HeaderProps) {
    return (
        <div className='left-0 top-0 flex w-full border-b-[2px] border-main items-center py-[18px] px-[62px] space-x-[10px]'>
            <div className='flex-1 text-main text-title font-title'>
                <h1>
                    {title}
                </h1>
            </div>
            <div className='flex flex-row space-x-[10px]'>
                {children}
            </div>
        </div>
    )
}
