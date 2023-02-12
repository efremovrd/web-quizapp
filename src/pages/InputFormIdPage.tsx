import { Modal } from "../components/Modal"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { InfoWindow } from "../components/InfoWindow"
import { UniversalBtn } from "../components/UniversalBtn"
import { Input } from "../components/Input"

export function InputFormIdPage() {

    const [error, setError] = useState(false)

    const [formid, setFormid] = useState("")

    const navigate = useNavigate()

    const location = useLocation()

    function closeHandler() {
        if (location.state && location.state['from'] && location.state['from'].includes("forms?limit=")) {
            navigate(-1)
        } else {
            navigate("/forms?limit=2&offset=0", {replace: false, state: {}})
        }
    }

    return (
        <>
            <Modal onClose={closeHandler}>
                <div className="flex flex-col p-[30px] space-y-[20px]">
                    <Input type="text" name="form_id" label="Уникальный номер опроса:" value={formid} onChange={setFormid} />
                    <div className="self-center">
                        <UniversalBtn height="" text="Пройти опрос" disabled={!formid} onClick={()=> navigate("/forms/"+formid+"/questions", { replace: false, state:{} })} />
                    </div>
                </div>
            </Modal>
            {error && <InfoWindow msg="Такого опроса не существует" onClose={() => setError(false)}/>}
        </>
    )
}