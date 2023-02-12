import { Modal } from "../components/Modal"
import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { useJWT } from "../hooks/jwt"
import { useState } from "react"
import { IAuth } from "../models"
import { InfoWindow } from "../components/InfoWindow"

export function SignInPage() {

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const {signin} = useJWT()

    const handleSignIn = (user: IAuth) => {
        signin(user, setError);
    }

    return (
        <>
            <Modal onClose={() => navigate(`/`)}>
                <Auth type="Войти" onAuth={handleSignIn} />
            </Modal>
            {error && <InfoWindow msg="Неверные логин и/или пароль" onClose={() => setError(false)}/>}
        </>
    )
}