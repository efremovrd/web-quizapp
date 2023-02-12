interface UniversalBtnProps {
    text: string
    disabled: boolean
    height: string
    onClick?: () => void
}

export function UniversalBtn({text, disabled, onClick, height}: UniversalBtnProps) {
    const baseclassname = "text-src font-src px-[10px] text-enabled hover:bg-enabled border-enabled bg-background hover:text-background rounded border items-center disabled:text-disabled disabled:hover:bg-disabled disabled:border-disabled disabled:cursor-not-allowed"

    return (
        <button type="button" disabled={disabled} onClick={onClick} className={height ? baseclassname+" h-["+height+"] " : "py-[5px] "+baseclassname}>
            {text}
        </button>
    )
}
