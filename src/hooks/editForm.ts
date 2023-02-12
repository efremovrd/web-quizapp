import { IForm, IQuestion } from "../models"
import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react"
import api from "../services/Api"

interface IEdited {
    updated: boolean
    deleted: boolean
}

interface IEditQuestion {
    question: IQuestion
    edited: IEdited
    setHeader: (newheader: string) => void
}

interface IUseEditFormProps {
    token: string
    formid: string
    setError: (newerror: string) => void
    setInfo: (newinfo: string) => void
}

export function useEditForm({token, formid, setError, setInfo}: IUseEditFormProps) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [questions, setQuestions] = useState<IEditQuestion[]>([])

    function addQuestion(id: string, baseheader: string) {
        const q = {
            id: id,
            header: baseheader,
            form_id: formid
        }
        const ed = {
            updated: false,
            deleted: false
        }
        setQuestions(prev => prev.concat([{edited:ed, question: q, setHeader: (newheader: string) => {
            q.header = newheader
            ed.updated = true
        }}]))
    }

    function delQuestion(id: string, local: boolean = true) {
        if (local) {
            setQuestions(prev => prev.map(el => {
                if (el.question.id === id) {
                    return ({...el, edited: {...el.edited, deleted: true}})
                }
                return ({...el})
            }))
        } else {
            setQuestions(prev => prev.filter(el => el.question.id !== id))
        }
    }

    function updateQuestion(i: number, newid: string = "") {
        setQuestions(prev => prev.map((el, ind) => {
            if (i === ind) {
                const q = {
                    id: el.question.id,
                    header: el.question.header,
                    form_id: formid
                }
                const ed = {
                    updated: false,
                    deleted: false
                }
                if (newid) {
                    q.id = newid
                }
                return ({edited: ed, question: q, setHeader: (newheader: string) => {
                    q.header = newheader
                    ed.updated = true
                }})
            }
            return el
        }))
    }

    async function updateForm() {
        try {
            var err = false

            const response = await api.patch("forms/"+formid, {title: title, description: description})
            if (response.status !== 200) {
                err = true
            }

            var i = 0
            while (!err && i < questions.length) {
                if (questions[i].question.id[0] === "-") {
                    const response = await api.post("forms/"+formid+"/questions", {header: questions[i].question.header})
                    if (response.status !== 201) {
                        err = true
                    } else {
                        updateQuestion(i, response.data['id'])
                    }
                } else if (questions[i].edited.deleted) {
                    const response = await api.delete("forms/"+formid+"/questions/"+questions[i].question.id)
                    if (response.status !== 200) {
                        err = true
                    } else {
                        delQuestion(questions[i].question.id, false)
                    }
                } else if (questions[i].edited.updated) {
                    const response = await api.put("forms/"+formid+"/questions/"+questions[i].question.id, {header: questions[i].question.header})
                    if (response.status !== 200) {
                        err = true
                    } else {
                        updateQuestion(i)
                    }
                }

                i++
            }

            if (err) {
                setError("Ошибка обновления опроса.\nПопробуйте позднее.")
            } else {
                setInfo("Опрос обновлен.")
            }

        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchQuestions() {
        try {
            const response = await api.get("forms/"+formid+"/questions?limit=5000&offset=0")
            if (response.status === 200) {
                response.data['questions'].map((question: IQuestion) => addQuestion(question.id, question.header))
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            setError(error.message)
        }
    }

    async function fetchForm() {
        try {
            const response = await api.get<IForm>("forms/"+formid)
            if (response.status === 204) {
                setError("Такого опроса не существует!\nВы будете перенаправлены на предыдущую страницу.")
            } else {
                setTitle(response.data.title)
                setDescription(response.data.description)
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

    return {title, setTitle, description, setDescription, questions, addQuestion, delQuestion, updateForm}
}