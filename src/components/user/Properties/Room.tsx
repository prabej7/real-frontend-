import api from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../LoadingPage";
import { RoomsTable, HostelTable, LandsTable } from "../Table";
import { useState } from "react";
import SelectC from "../Select";
import { useCookies } from "react-cookie";

type Options = "rooms" | "lands" | "hostels";


const Rooms: React.FC = () => {
    const [selected, setSelected] = useState<Options>("rooms");
    const [page, setPage] = useState<number>(1);
    const [{ token }] = useCookies(['token']);
    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: [selected, page],
        queryFn: () =>
            axios.get(`${api}${selected}?page=${page}&token=${token}`).then((res) => res.data),
    });

    // Show loading spinner while data is loading
    if (isLoading) {
        return <LoadingPage />;
    }



    return (
        <div className="relative z-10">
            <div className="flex flex-col gap-3 mt-3">
                <SelectC
                    values={[
                        { title: "Rooms", value: "rooms" },
                        { title: "Hostels", value: "hostels" },
                        { title: "Lands", value: "lands" },
                    ]}
                    onChange={(value) => {
                        setSelected(value as Options);
                        setPage(1); // Reset to the first page when changing type
                    }}
                />

                {isFetching && <LoadingPage />} {/* Show fetching spinner */}

                {selected === "rooms" && <RoomsTable rows={data?.data || []} onDelete={refetch} />}
                {selected === "hostels" && <HostelTable onDelete={refetch} rows={data?.data || []} />}
                {selected === "lands" && <LandsTable rows={data?.data || []} onDelete={refetch} />}

                {/* Pagination Controls */}

            </div>
        </div>
    );
};

export default Rooms;
