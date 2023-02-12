import { useState } from "react"
import { IAuth } from "../models"
import { Input } from "./Input"
import { UniversalBtn } from "./UniversalBtn"

const authData: IAuth = {
    login: "",
    password: ""
}

interface AuthProps {
    type: string
    onAuth: (user: IAuth) => void
}

export function Auth({type, onAuth}: AuthProps) {
    const [login, setLogin] = useState("")
    const [pswd, setPswd] = useState("")

    return (
        <div className="flex flex-col p-[30px] space-y-[20px]">
            <Input type="text" name="login" label="Логин:" value={login} onChange={setLogin} />
            <Input type="password" name="password" label="Пароль:" value={pswd} onChange={setPswd} />
            <div className="self-center">
                <UniversalBtn text={type} disabled={!login || !pswd} height="" onClick={() => {
                    authData.login = login
                    authData.password = pswd
                    onAuth(authData)
                    }
                }/>
            </div>
        </div>
    )
}
