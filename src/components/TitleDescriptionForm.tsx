import { Input } from "./Input";

interface TDFormProps {
    currentTitle: string
    currentDescription: string
    updateTitle: (title: string) => void
    updateDescription: (description: string) => void
}

export function TDForm({currentTitle, currentDescription, updateTitle, updateDescription}: TDFormProps) {
    const titleHandler = (newtitle: string) => {
        updateTitle(newtitle)
    }

    const descriptionHandler = (newdescription: string) => {
        updateDescription(newdescription)
    }

    return (
        <div className="border border-main flex flex-col gap-y-[20px] p-[30px]">
            <Input type="text" name="title" label="Название опроса:" value={currentTitle} onChange={titleHandler} />
            <Input type="text" name="description" label="Описание:" value={currentDescription} onChange={descriptionHandler} />
        </div>
    )
}