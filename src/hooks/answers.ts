import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react"
import { IAnswer, IPoolAnswer, IQuestion } from "../models"
import api from "../services/Api"

interface IUseAnswersProps {
    token: string
    formid: string
    questions: IQuestion[]
    setError: (newerror: string) => void
}

interface IQA {
    id: string
    question: string
    answer: string
}

interface PoolAnswer {
    id: string
    login: string
    expanded: boolean
    answers: IQA[]
    setExpanded: () => void
}

export function useAnswers({token, formid, questions, setError}: IUseAnswersProps) {

    const [poolsanswers, setPoolsAnswers] = useState<PoolAnswer[]>([])

    const [waitforchange, setWaitforchange] = useState(false)
    const [waitforchange2, setWaitforchange2] = useState(false)

    function getQuestion(id: string) {
        return (questions.filter(el => el.id === id)[0].header)
    }

    async function fetchLogins() {
        try {
            var i = 0
            var err = false
            while (i < poolsanswers.length && !err) {
                const response = await api.get("users/"+poolsanswers[i].id)
                if (response.status === 200) {
                    setPoolsAnswers(prev => prev.map(el => {return ({...el, login: response.data["login"]})}))
                } else {
                    err = true
                }
                i++
            }

            if (err) {
                setError("Ошибка загрузки!\nВы будете перенаправлены на предыдущую страницу.")
            } else if (i > 0) {
                setWaitforchange2(true)
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchAnswers() {
        try {
            var i = 0
            var err = false
            while (i < poolsanswers.length && !err) {
                const response = await api.get("forms/"+formid+"/poolsanswer/"+poolsanswers[i].id+"?limit=5000&offset=0")
                if (response.status === 200) {
                    setPoolsAnswers(prev => prev.map(el => {return ({...el, answers: response.data["answers"].map((el: IAnswer) => {return ({id: el.id, answer: el.value, question: getQuestion(el.question_id)})})})}))
                } else {
                    err = true
                }
                i++
            }
            
            if (err) {
                setError("Ошибка загрузки ответов!\nВы будете перенаправлены на предыдущую страницу.")
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchPoolsAnswers() {
        try {
            const response = await api.get("forms/"+formid+"/poolsanswer?limit=5000&offset=0")
            if (response.status === 204) {
                setError("Такого опроса не существует!\nВы будете перенаправлены на предыдущую страницу.")
            } else if (response.status === 200) {
                setPoolsAnswers(response.data["pools_answer"].map((el: IPoolAnswer) => {return({id: el.id,
                    login: "",
                    expanded: false,
                    answers: [],
                    setExpanded: () => {
                        setPoolsAnswers(prev => prev.map(cur => {
                            if (cur.id === el.id) {
                                return ({...cur, expanded: !cur.expanded})
                            }
                            return ({...cur})
                        }))
                    }})}))
                setWaitforchange(true)
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchPoolsAnswers()
    }, [])

    useEffect(() => {
        fetchLogins()
    }, [waitforchange])

    useEffect(() => {
        fetchAnswers()
    }, [waitforchange2])

    return {poolsanswers}
}
