import { OTPForm, Spinner } from "@/components/user";
import api from "@/constants/api";
import { useUser } from "@/store";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast for notifications

const Verification: React.FC = () => {
    const { user } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(['otp']);
    const [isLoading, setLoading] = useState<boolean>(false);

    const getOTP = () => {
        setTimeout(async () => {

            if (!cookies.otp) {
                try {
                    const { data } = await axios.get(`${api}otp/${user?.email}`);
                    setCookie('otp', data.token);
                    toast.success("OTP sent successfully!");
                } catch (err) {
                    console.error("Error retrieving OTP:", err);
                }
            }
        }, 2000)

    };

    useEffect(() => {
        getOTP();
        //eslint-disable-next-line
    }, [user?.email]);

    const handleChange = async (value: string) => {
        if (value.length == 6) {
            setLoading(true);
            try {
                await axios.post(`${api}verify-otp`, {
                    otp: value,
                    token: cookies.otp
                });

                toast.success("Verified!")
            } catch (err) {
                const { status } = err as AxiosError;
                if (status == 401) {
                    toast.error("Invalid OTP");
                    window.location.reload();
                    removeCookie('otp');
                    return
                }
                toast.error("Something went wrong!");

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
                    <p className="font-light text-slate-700">
                        An OTP has been sent to <strong>{user?.email}</strong>
                    </p>
                    <div className="mt-6"></div>
                    <div className="flex gap-6" >
                        <OTPForm onChange={handleChange} disabled={isLoading} />
                        {isLoading && <Spinner />}
                    </div>

                    <p className="w-64 font-light text-slate-800 text-sm mt-6">
                        Note: It may take some time. Don't forget to check your spam folder.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Verification;
