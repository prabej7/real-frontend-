import api from "@/constants/api";
import { useHostels, useLands, useRooms } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const useRestore = () => {

    const { setRooms } = useRooms();
    const { setLands } = useLands();
    const { setHostels } = useHostels();

    const fetchRooms = async () => {
        const response = await axios.get(`${api}all-rooms`);
        return response.data;
    }

    const fetchHostel = async () => {
        const response = await axios.get(`${api}all-hostels`);
        return response.data;
    }

    const fetchLands = async () => {
        const response = await axios.get(`${api}all-lands`);
        return response.data;
    }

    const { data: roomData, isLoading: isRoomLoading } = useQuery({
        queryKey: ['room'],
        queryFn: fetchRooms,
    });

    const { data: landData, isLoading: isLandLoading } = useQuery({
        queryKey: ['lands'],
        queryFn: fetchLands
    })

    const { data: hostelData, isLoading: isHostelLaoding } = useQuery({
        queryKey: ['hostels'],
        queryFn: fetchHostel
    });



    useEffect(() => {
        setRooms(roomData?.rooms);
        setHostels(hostelData?.hostels);
        setLands(landData?.lands);

        //eslint-disable-next-line
    }, [isRoomLoading, isLandLoading, isHostelLaoding]);
}

export default useRestore;