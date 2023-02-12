import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useJWT } from "./jwt";

export const ProtectRoutes = () => {
    const { token } = useJWT()

    const location = useLocation()

    return token ? <Outlet/> : <Navigate to="/signin" replace={false} state={{from: location.pathname}} />
};