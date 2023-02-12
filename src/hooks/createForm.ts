import axios, { AxiosError } from "axios"
import { useState } from "react"
import { IQuestion } from "../models"

interface ICreateQuestion {
    id: number
    question: IQuestion
    setHeader: (newheader: string) => void
}

export function useCreateForm(token: string) {
    const [info, setInfo] = useState("")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [curid, setCurid] = useState(0)

    const [questions, setQuestions] = useState<ICreateQuestion[]>([])

    function addQuestion() {
        const q = {
            id: "",
            header: "",
            form_id: ""
        }
        setQuestions(prev => prev.concat([{id: curid, question: q, setHeader: (newheader: string) => {q.header = newheader}}]))
        setCurid(prev => prev+1)
    }

    function delQuestion(id: number) {
        setQuestions(prev => prev.filter(function(el){return el.id !== id}))
    }

    async function createForm() {
        try {
            var err = false
            const response_create_form = await axios.post("http://localhost:9090/api/v1/forms", {
                    title: title,
                    description: description
                },
                {headers: {"Authorization": "Bearer "+token}})
            
            var i = 0
            while (err === false && i < questions.length) {
                const response_create_question = await axios.post("http://localhost:9090/api/v1/forms/"+response_create_form.data["id"]+"/questions", {
                    header: questions[i].question.header
                },
                {headers: {"Authorization": "Bearer "+token}})
                
                i++
                err = response_create_question.status === 201 ? false : true
            }

            if (err) {
                await axios.delete("http://localhost:9090/api/v1/forms/"+response_create_form.data["id"], {headers: {"Authorization": "Bearer "+token}})
            } else {
                setInfo("Опрос успешно создан.")
            }
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error.message)
        }
    }

    return {title, setTitle, description, setDescription, createForm, questions, addQuestion, delQuestion, info, setInfo}
}