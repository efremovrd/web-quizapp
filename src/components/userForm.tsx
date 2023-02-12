import { IForm } from "../models";
import { IconBtn } from "./IconBtn";

interface IUserForm {
    form: IForm,
    onDelete: () => void,
    onEnter: () => void
}

export function UserForm({form, onDelete, onEnter}: IUserForm) {
    return (
        <div className="flex flex-col items-center w-[250px]">
            <div className="relative border border-main rounded border-px w-full p-[35px] flex flex-col items-center">
                <div className='absolute top-px right-px'>
                    <IconBtn size="35px" path=<path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/> onClick={onDelete} />
                </div>
                <IconBtn size="90px" path=<path d="M5 13H3.2L5 10.9V10H2v1h1.8L2 13.1v.9h3zm2-8h14v2H7zM5 16H2v1h2v.5H3v1h1v.5H2v1h3zm2 1h14v2H7zM3 8h1V4H2v1h1zm4 3h14v2H7z"/> onClick={onEnter} />
            </div>
            <label className="truncate text-caption font-caption">{[form.id, form.title].join(" ")}</label>
        </div>
    )
}