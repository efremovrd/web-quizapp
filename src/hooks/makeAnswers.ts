import { IAnswer, IForm, IQuestion } from "../models"
import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react"

interface ICreateAnswers {
    id: string
    question: string
    answer: IAnswer
    setAnswer: (newvalue: string) => void
}

export function useCreateAnswers(token: string, formid: string) {

    const [error, setError] = useState("")

    const [info, setInfo] = useState("")
    
    const [form, setForm] = useState<IForm>({
        id: "",
        user_id: "",
        title: "",
        description: ""
    })

    const [answers, setAnswers] = useState<ICreateAnswers[]>([])

    async function createAnswers() {
        try {
            const response = await axios.post("http://localhost:9090/api/v1/forms/"+formid+"/poolsanswer",
                {answers: answers.map(answer => {return {question_id: answer.answer.question_id, value: answer.answer.value}})},
                {headers: {"Authorization": "Bearer "+token}})
            if (response.status === 201) {
                setInfo("Ваши ответы отправлены.")
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    const addAnswer = (question: IQuestion) => {
        const answer = {
            value: "",
            pool_answer_id: "",
            question_id: question.id
        }
        return {id: question.id, question: question.header, answer: answer, setAnswer: (newvalue: string) => {answer.value=newvalue}}
    }

    async function fetchQuestions() {
        try {
            const response = await axios.get("http://localhost:9090/api/v1/forms/"+formid+"/questions?limit=5000&offset=0", {headers: {"Authorization": "Bearer "+token}})
            if (response.status === 200) {
                response.data['questions'].map((question: any) => setAnswers(prev => prev.concat([addAnswer(question)])))
            } else if (response.status === 204) {
                setInfo("Данный опрос пока недоступен")
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchForm() {
        try {
            const response = await axios.get<IForm>("http://localhost:9090/api/v1/forms/"+formid, {headers: {"Authorization": "Bearer "+token}})
            if (response.status === 204) {
                setError("Такого опроса не существует!\nВы будете перенаправлены на предыдущую страницу.")
            } else {
                setForm(response.data)
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchForm()
        fetchQuestions()
    }, [])

    return {answers, createAnswers, form, error, info, setInfo}
}