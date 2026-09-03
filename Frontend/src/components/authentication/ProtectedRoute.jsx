import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
    const {user} = useAuth();

    //  If user is not logged in
    if (!user) {
        return <Navigate to = "/login" replace/>;
    }

    // If user is logged in
    return <Outlet/>

}

export default ProtectedRoute;