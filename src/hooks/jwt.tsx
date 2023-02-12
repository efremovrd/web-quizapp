import React, {createContext, useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IAuth } from '../models'
import api from '../services/Api'

interface IJWTContext {
    token: string
    login: string
    signin: (user: IAuth, error: any) => void
}

export const JWTContext = createContext<IJWTContext>({
    token: "",
    login: "",
    signin: () => {}
})

export const JWTState = ({ children }: {children: React.ReactNode}) => {
    const navigate = useNavigate()

    const location = useLocation()

    const [token, setToken] = useState("")
    const [login, setLogin] = useState("")

    const signin = async (user: IAuth, error: any) => {
        try {
            const res = await api.post('/auth/signin', {
                login: user.login,
                password: user.password
            })

            setToken(res.data.token)
            setLogin(user.login)

            api.defaults.headers.common["Authorization"] = "Bearer "+res.data.token

            if (location && location.state && location.state['from']){
                navigate(location.state['from'], {state: {from: location.pathname}})
            } else {
                navigate("/forms?limit=2&offset=0", {replace: false, state:{}})
            }
        } catch {
            error(true)
        }
    }

    return (
        <JWTContext.Provider value={{ token, login, signin }}>
            { children }
        </JWTContext.Provider>
    )
}

export const useJWT = () => {
    return useContext(JWTContext)
};
