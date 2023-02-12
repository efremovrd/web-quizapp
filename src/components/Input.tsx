import { useCallback } from "react"

interface InputProps {
    label?: string
    type: string
    name: string
    value: string
    onChange: (value: string) => void
}

export function Input({label, type, name, value, onChange}: InputProps) {
    const changeHandler = useCallback((event:any) => {
        onChange(event.target.value)
    }, [onChange])

    return (
        <div className="flex flex-col space-y-[3px]">
            <label className="px-[10px] text-main text-caption font-caption">
                {label}
            </label>
            <input value={value} type={type} name={name} onChange={changeHandler} className="text-main text-src font-src appearance-none border border-enabled rounded p-[10px] focus:outline-none" />
        </div>
    )
}