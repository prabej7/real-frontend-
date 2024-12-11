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
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
    email: z.string().min(1, {
        message: "Email is required.",
    }),
    password: z.string()
        .min(8, { message: "Password must contain at least 8 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
            message: "Password must include uppercase, lowercase, number, and special character.",
        }),
});

type formField = z.infer<typeof schema>;

const Register: React.FC = () => {
    // eslint-disable-next-line
    const [_, setCookie] = useCookies(['token']);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<formField>({
        resolver: zodResolver(schema)
    });
    const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSubmit = async (formData: formField) => {
        try {
            setLoading(true);
            const { status, data } = await axios.post(`${api}register`, formData);

            if (status == 200) {
                setCookie('token', data.token, { path: '/' });
                navigate("/account");
            };


        } catch (err) {
            const { status } = err as AxiosError;
            if (status == 409) {
                setError('root', {
                    message: "User already exists."
                });
                return;
            };

            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

    const navigate = useNavigate();
    return <div className="h-screen w-screen flex justify-center items-center overflow-x-clip" >
        <div className="border flex rounded-xl" >
            <div className="p-12 flex justify-center items-center" >
                <img src="/register.svg" className="h-64" alt="" />
            </div>
            <div className="border" ></div>
            <form className="p-12 flex flex-col gap-3 w-96" onSubmit={handleSubmit(onSubmit)}  >
                <h1 className="font-bold text-3xl text-indigo-500 text-gradient" >Register</h1>
                {errors.root && <p className="font-light text-red-500" >{errors.root.message}</p>}
                <Input placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-500 font-light" >{errors.email.message}</p>}
                <div className="relative" >
                    <Input placeholder="Password" type={isPasswordVisible ? 'text' : 'password'} {...register('password')} />
                    {isPasswordVisible ? <Eye className="absolute right-2 top-2 cursor-pointer" size={20} onClick={() => setPasswordVisibility(false)} /> : <EyeOff className="absolute right-2 top-2 cursor-pointer" size={20} onClick={() => setPasswordVisibility(true)} />}

                </div>

                {errors.password && <p className="text-red-500 font-light" >{errors.password.message}</p>}
                <Button disabled={isLoading} variant="primary" >{isLoading ? <Spinner /> : "Register"}</Button>
                <div className="border" ></div>
                <p className="text-sm text-slate-800 text-center" >Already have an account ? <Link to='/login'  >Login</Link></p>
                <Button variant="outline" className="text-slate-600" onClick={() => navigate("/login")}  >
                    Login
                </Button>
            </form>

        </div>
    </div>
};

export default Register;