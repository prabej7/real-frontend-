import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const AuthLayout: React.FC = () => {
    useAuth();
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
