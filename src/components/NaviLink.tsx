import { NavLink } from 'react-router-dom'

interface NaviLinkProps {
    path: string
    name: string
  }

export function NaviLink({ path, name }: NaviLinkProps) {
    const basestyle = "underline underline-offset-8 text-section font-section "
    return (
        <NavLink to={path} className={({isActive}) => isActive ? basestyle+"text-enabled" : basestyle+"text-main"}>{name}</NavLink>
    )
}
