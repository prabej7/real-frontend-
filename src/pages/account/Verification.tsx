import { OTPForm, Spinner } from "@/components/user";
import api from "@/constants/api";
import { useUser } from "@/store";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const Verification: React.FC = () => {
    const { user } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(['otp']);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [requestingOPT, setOTPRequesting] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);

    const getOTP = async () => {
        setOTPRequesting(true);
        try {
            const { data } = await axios.get(`${api}otp/${user?.email}`);
            setCookie('otp', data.token, { path: '/', maxAge: 300 });

            toast.success("OTP sent successfully!");
            setTimer(60); // Set timer for 60 seconds
        } catch (err) {
            console.error("Error retrieving OTP:", err);
            toast.error("Failed to send OTP. Please try again later.");
        } finally {
            setOTPRequesting(false);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = async (value: string) => {
        if (value.length === 6) {
            setLoading(true);
            try {
                await axios.post(`${api}verify-otp`, {
                    otp: value,
                    token: cookies.otp,
                });
                toast.success("OTP verified successfully!");
                window.location.reload();
            } catch (err) {
                const axiosError = err as AxiosError;
                if (axiosError.response?.status === 401) {
                    toast.error("Invalid OTP. Please try again.");
                    removeCookie('otp');
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex gap-3 border p-6 rounded-lg">
                <div>
                    <img src="/verify.svg" className="h-60" alt="Verification" />
                </div>
                <div className="border"></div>
                <div>
                    <h1 className="text-gradient text-3xl font-bold">Verification</h1>
                    {!cookies.otp ? (
                        <div>
                            <p className="font-light text-slate-700">
                                An OTP will be sent to <strong>{user?.email}</strong>
                            </p>
                            <Button
                                variant="primary"
                                onClick={getOTP}
                                disabled={requestingOPT || timer > 0}
                                className="mt-3"
                            >
                                {requestingOPT ? <Spinner /> : "Request OTP"}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <p className="font-light text-slate-700">
                                An OTP has been sent to <strong>{user?.email}</strong>
                            </p>
                            <div className="mt-6"></div>
                            <div className="flex gap-6">
                                <OTPForm onChange={handleChange} disabled={isLoading} />
                                {isLoading && <Spinner />}
                            </div>
                            <p className="w-64 font-light text-slate-800 text-sm mt-6">
                                Note: It may take some time. Don't forget to check your spam folder.
                            </p>
                            <p className="flex gap-1 font-light mt-3">
                                Didn't receive an OTP?
                                <span
                                    className={`font-normal ${timer > 0 ? "text-gray-500" : "text-indigo-500 underline cursor-pointer"
                                        }`}
                                    onClick={timer === 0 ? getOTP : undefined}
                                >
                                    {timer > 0 ? `Resend in ${timer}s` : (requestingOPT ? <Spinner /> : "Resend")}
                                </span>
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Verification;
