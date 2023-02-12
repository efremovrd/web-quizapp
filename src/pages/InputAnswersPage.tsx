import { IconBtn } from "../components/IconBtn";
import { UniversalBtn } from "../components/UniversalBtn";
import { useCreateAnswers } from "../hooks/makeAnswers";
import { useJWT } from "../hooks/jwt";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { InputAnswer } from "../components/inputAnswer";
import { InfoWindow } from "../components/InfoWindow";

export function InputAnswersPage() {
    const navigate = useNavigate()

    const {formid} = useParams()

    const {token, login} = useJWT()

    const {answers, createAnswers, form, error, info, setInfo} = useCreateAnswers(token, formid ? formid : "")

    return (
        <div className="flex flex-col">
            <div className="flex-none">
                <Header title={form.title}>
                    <IconBtn 
                        description={login} 
                        size='75px'
                        onClick={()=>{}}
                        path=<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/>
                    />
                </Header>
            </div>
            <div className="flex flex-col self-center space-y-[30px] p-[30px] w-[63%]">
                <p className="self-center text-main text-src font-src">{form.description}</p>
                {answers.map(answer => <InputAnswer updateValue={answer.setAnswer} question={answer.question} key={answer.id} />)}
                <div className="self-center"><UniversalBtn text="Отправить" disabled={false} onClick={createAnswers} height="80px" /></div>
            </div>
            <div className="fixed bottom-[30px] right-[62px]">
                <IconBtn description="Домой" size="75px" onClick={() => setInfo("Ответы не сохранены.")} path=<path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" /> />
            </div>
            {error && <InfoWindow msg={error} onClose={() => navigate(-1)} />}
            {info && <InfoWindow msg={info} onClose={() => navigate("/forms?limit=2&offset=0")} />}
        </div>
    )
}