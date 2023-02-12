import React from "react";

interface InfoProps {
    msg: string
}
  
export function Info({ msg }: InfoProps) {
    return (
        <div className="flex items-center">
            <div className="flex-none">
                <svg className="fill-main" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path d="m16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-5 5v2h2V7h-2zm0 4v6h2v-6h-2z"/>
                </svg>
            </div>
            <div className="flex-1 text-main text-caption font-caption">
                {msg}
            </div>
        </div>
    )
}