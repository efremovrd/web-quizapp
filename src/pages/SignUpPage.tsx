import { Modal } from "../components/Modal"
import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { IAuth } from "../models"
import { InfoWindow } from "../components/InfoWindow"
import axios from 'axios'
import { useState } from "react"

export function SignUpPage() {

    const navigate = useNavigate()

    const [error, setError] = useState(false)

    const [info, setInfo] = useState("")

    async function signup(user: IAuth) {
        try {
            const response = await axios.post<IAuth>("http://localhost:9090/api/v1/auth/signup", user)
            if (response.status === 201) {
                setInfo("Вы успешно зарегистрированы.\nТеперь можно использовать введенные данные для входа.")
            }
            setError(false)
        } catch {
            setInfo("Такой логин уже занят")
            setError(true)
          }
    }

    const signUpHandler = (user: IAuth) => {
        signup(user)
    }

    const closeInfoWindowHandler = (error: boolean) => {
        setInfo("")
        if (!error) {
            navigate(`/`)
        }
    }

    return (
        <>
            <Modal onClose={() => navigate(`/`)}>
                <Auth type="Зарегистрироваться" onAuth={signUpHandler}/>
            </Modal>
            {info && <InfoWindow msg={info} onClose={() => closeInfoWindowHandler(error)} />}
        </>
    )
}