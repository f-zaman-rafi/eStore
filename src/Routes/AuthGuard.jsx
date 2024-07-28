/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingComponent from "../SharedComponents/Loading/LoadingComponent";

const AuthGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p><LoadingComponent /></p>
    }
    if (user) {
        return <Navigate to='/' state={{ from: location }} replace={true}></Navigate>
    }

    return children
};

export default AuthGuard;