import { Navigate, Outlet } from 'react-router-dom';
import routes from '~/config/routes';

export const ProtectedRoute = ({ isAllowed, redirectTo = routes.error_404, children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />;
    }
    return children ? children : <Outlet />;
};
