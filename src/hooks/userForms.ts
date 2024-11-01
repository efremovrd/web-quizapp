import { useState, useEffect } from "react"
import { IForm } from "../models"
import axios, {AxiosError} from 'axios'
import api from "../services/Api"

export function useUserForms(token: string, baselimit: string | null, baseoffset: string | null) {

  const [forms, setForms] = useState<IForm[]>([])
  const [error, setError] = useState('')

  const [limit, setLimit] = useState(parseInt(baselimit ? baselimit : ""))

  const [offset, setOffset] = useState(parseInt(baseoffset ? baseoffset : ""))

  async function delUserForm(form: IForm) {
      try {
          setError('')
          await api.delete("forms/"+form.id)
          setForms(prev => prev.filter(function(ele){return ele.id !== form.id}))
      } catch (e: unknown) {
          const error = e as AxiosError
          setError(error.message)
      }
  }

  async function fetchUserForms() {
    try {
      setError('')
      const response = await api.get("forms?limit="+limit+"&offset="+offset)
      if (response.status === 200) {
        setForms(response.data['forms'])
      }
    } catch (e: unknown) {
      const error = e as AxiosError
      if (error.response && error.response.status === 400) {
        setLimit(2)
        setOffset(0)
      } else {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    fetchUserForms()
  }, [limit, offset])

  return { forms, error, delUserForm, setLimit, limit, offset, setError, setOffset}
}