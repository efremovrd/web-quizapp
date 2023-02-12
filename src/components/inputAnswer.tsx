import { useState } from "react";
import { Input } from "./Input";

interface InputAnswerProps {
    question: string
    updateValue: (value: string) => void
}

export function InputAnswer({question, updateValue}: InputAnswerProps) {
    const [value, setValue] = useState("")

    function valueHandler(newvalue: string) {
        setValue(newvalue)
        updateValue(newvalue)
    }

    return (
        <div className="flex flex-col space-y-[15px] border border-main rounded p-[30px]">
            <p className="text-main text-src font-src">{question}</p>
            <Input type="text" name="answer" label="Ваш ответ" value={value} onChange={valueHandler} />
        </div>
    )
}