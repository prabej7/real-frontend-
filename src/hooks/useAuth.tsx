import api from "@/constants/api";
import { useUser } from "@/store";

import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    //eslint-disable-next-line
    const [{ token }, _, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`${api}user/${token}`);
                setUser(data.user);
                //eslint-disable-next-line
            } catch (err) {
                removeCookie('token');
                navigate("/login");
            }
        };



        fetchUserData();
    }, [token, navigate, setUser, removeCookie]);

};

export default useAuth;
