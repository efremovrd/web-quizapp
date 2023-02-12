export interface IForm {
    id: string
    user_id: string
    title: string
    description: string
}

export interface IQuestion {
    id: string
    form_id: string
    header: string
}

export interface IPoolAnswer {
    id?: string
    user_id: string
    form_id: string
}

export interface IAnswer {
    id?: string
	question_id: string
	pool_answer_id: string
	value: string
}

export interface IAuth {
    id?: string
    login: string
    password: string
}