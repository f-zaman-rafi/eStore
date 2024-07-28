/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingComponent from "../SharedComponents/Loading/LoadingComponent";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p><LoadingComponent /></p>
    }
    if (user) return children
    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRoute;