import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from "@/constants/api";
import axios, { AxiosError } from 'axios'
import { toast } from "react-toastify";
import { useCookies } from 'react-cookie'
import { useState } from "react";
import { Spinner } from "@/components/user";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

const schema = z.object({
    email: z.string().min(1, {
        message: "Email is required.",
    }),
    password: z.string().min(8, { message: "Password must contain at least 8 characters." }),
});

type formField = z.infer<typeof schema>;

const Login: React.FC = () => {
    // eslint-disable-next-line
    const [_, setCookie] = useCookies(['token']);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<formField>({
        resolver: zodResolver(schema)
    });
    const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (formData: formField) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${api}login`, formData);
            setCookie('token', data.token, { path: "/" });
            navigate("/account")
        } catch (err) {
            const { status } = err as AxiosError;
            let message = "";
            if (status == 404) {
                message = "User doesn't exists"
            } else if (status == 401) {
                message = "Either email or password is wrong.";
            } else {
                toast.error("Something went wrong.");
            }
            setError('root', { message })
        } finally {
            setLoading(false)
        }
    }

    return <div className="h-screen w-screen flex justify-center items-center overflow-x-clip" >
        <div className="border flex rounded-xl" >
            <div className="p-12" >
                <img src="/login.svg" className="h-72" alt="" />
            </div>
            <div className="border" ></div>
            <form className="p-12 flex flex-col gap-3 w-80" onSubmit={handleSubmit(onSubmit)} >
                <h1 className="font-bold text-3xl text-indigo-500 text-gradient" >Login</h1>
                {errors.root && <p className="text-red-500 font-light" >{errors.root.message}</p>}
                <Input placeholder="Email or username" autoFocus  {...register('email')} />
                {errors.email && <p className="text-red-500 font-light" >{errors.email.message}</p>}
                <div className="relative" >
                    <Input placeholder="Password" type={isPasswordVisible ? 'text' : 'password'} {...register('password')} />
                    {isPasswordVisible ? <Eye className="absolute right-2 top-2 cursor-pointer" size={20} onClick={() => setPasswordVisibility(false)} /> : <EyeOff className="absolute right-2 top-2 cursor-pointer" size={20} onClick={() => setPasswordVisibility(true)} />}

                </div>
                {errors.password && <p className="text-red-500 font-light" >{errors.password.message}</p>}
                <Button variant="primary" disabled={isLoading} type="submit"  >
                    {isLoading ? <Spinner /> : "Login"}
                </Button>
                <div className="border" ></div>
                <Button variant="outline" className="text-slate-600" onClick={() => navigate('/register')}  >Register</Button>
                <p className="text-sm text-slate-800 text-center" >Forgot password ? <Link to='/forgot-password' >Click here.</Link></p>
            </form>

        </div>
    </div>
};

export default Login;