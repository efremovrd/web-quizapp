import { useState } from "react";
import { Input } from "./Input";
import { IconBtn } from "./IconBtn";

interface InputQuestionProps {
    currentHeader: string
    updateHeader: (header: string) => void
    onDelete: () => void
}

export function InputQuestion({currentHeader, updateHeader, onDelete}: InputQuestionProps) {
    const [temp, setTemp] = useState(currentHeader)

    function headerHandler(newheader: string) {
        setTemp(newheader)
        updateHeader(newheader)
    }

    return (
        <div className="relative border border-main rounded p-[30px]">
            <div className='absolute top-px right-px'>
                <IconBtn size="35px" path=<path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/> onClick={onDelete} />
            </div>
            <Input type="text" name="question" label="Вопрос" value={temp} onChange={headerHandler} />
        </div>
    )
}
