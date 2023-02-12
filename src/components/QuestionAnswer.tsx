interface QAProps {
    question: string
    answer: string
}

export function QuestionAnswer({question, answer}: QAProps) {
    return (
        <div className="border border-main p-[30px] flex flex-row space-x-[40px] items-center">
            <p className="basis-1/2 text-main text-src font-src">{question}</p>
            <p className="basis-1/2 text-main text-src font-src">{answer}</p>
        </div>
    )
}
