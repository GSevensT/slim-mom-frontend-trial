import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "redux/authSelectors";

export const PublicRoute = ({ Children, restricted = false }) => {
    const IsLoggedIn = useSelector(getIsLoggedIn);
    const shouldRedirect = isLoggedIn && restricted;
    return shouldRedirect ? <Navigate to="/diary" /> : children;
};