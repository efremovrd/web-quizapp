import { useState } from "react"
import { IconBtn } from "./IconBtn"

interface PaProps {
    login: string
    showdetails: (newstate: boolean) => void
}

export function Poolanswer({login, showdetails}: PaProps) {
    const [details, setDetails] = useState(false)

    function detailsHandler(newstate: boolean) {
        setDetails(newstate)
        showdetails(newstate)
    }

    return (
        <div className="border border-main p-[30px] flex flex-row space-x-[40px] items-center">
            <p className="basis-full text-main text-src font-src">{login}</p>
            {details
            ? <IconBtn size="35px" onClick={() => detailsHandler(false)} path=<path d="m7.4 15.375l-1.4-1.4l6-6l6 6l-1.4 1.4l-4.6-4.6Z" /> />
            : <IconBtn size="35px" onClick={() => detailsHandler(true)} path=<path d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4Z" /> />
            }
        </div>
    )
}
