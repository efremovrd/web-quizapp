import { NaviLink } from "../components/NaviLink";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-main text-src forn-src">Запрашиваемая страница не найдена 404</p>
            <NaviLink path="/" name="Перейти на главную" />
        </div>
    )
}