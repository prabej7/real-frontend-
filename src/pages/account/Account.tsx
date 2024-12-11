import { CategoryPie, Counts, LoadingPage, Options, Section, UserBarChart } from "@/components/user";
import { useUser } from "@/store";
import Verification from "./Verification";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import api from "@/constants/api";
import { EllipsisVertical } from "lucide-react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Account: React.FC = () => {
    //eslint-disable-next-line
    const [_, __, removeCookie] = useCookies(['token']);
    const { user } = useUser()
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['counts'],
        queryFn: () => axios.get(`${api}stats/count`).then(res => res.data),
    });

    const { data: chartData } = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get(`${api}stats/users`).then(res => res.data as { month: string, verified: number, unverified: number }[]),
    });



    if (isLoading) return <LoadingPage />

    if (!user?.verified) {
        return <Verification />
    }

    const handleOptionClick = (value: string) => {
        if (value == "logout") {
            return removeCookie('token');
        }

        return navigate("/account/" + value);
    }

    return <Section title="Dashboard" selected="Dashboard" titleOptions={<Options icon={<EllipsisVertical />} items={[
        {
            label: "Add Property",
            action: handleOptionClick,
            value: "add-property"
        },
        {
            label: "Properties",
            action: handleOptionClick,
            value: "properties"
        },
        {
            label: "Inbox",
            action: handleOptionClick,
            value: "inbox"
        },
        {
            label: "Logout",
            action: handleOptionClick,
            value: "logout"
        }

    ]} label="Menus" />}  >
        <div>
            <Counts hostelCount={data.hostelCount} landCount={data.landCount} roomCount={data.roomCount} />
            <div className="flex justify-between gap-6" >
                <CategoryPie hostelCount={data.hostelCount} landCount={data.landCount} roomCount={data.roomCount} />
                {chartData && <UserBarChart chartData={chartData} />}</div>
        </div>
    </Section>
};

export default Account;