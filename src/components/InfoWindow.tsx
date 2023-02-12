import { UniversalBtn } from "./UniversalBtn"
import { Info } from "./info"

interface InfoWindowProps {
  msg: string
  onClose: () => void
}

export function InfoWindow({msg, onClose}: InfoWindowProps) {
  return (
    <>
      <div className="fixed bg-black/50 inset-0" onClick={onClose} />
      <div className="grid justify-items-center w-[365px] p-[30px] rounded border border-main bg-background absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center space-y-[20px]">
        <Info msg={msg} />
        <UniversalBtn disabled={false} text="Ок" onClick={onClose} height="" />
      </div>
    </>
  )
}