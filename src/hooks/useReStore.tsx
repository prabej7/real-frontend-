import api from "@/constants/api";
import { useHostels, useLands, useRooms, useUser } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const useRestore = () => {
    const [{ token }] = useCookies(['token']);
    const { setRooms } = useRooms();
    const { setLands } = useLands();
    const { setHostels } = useHostels();
    const { setUser } = useUser();

    const fetchUserData = async () => {
        const { data } = await axios.get(`${api}user/${token}`);
        return data;
    }

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

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUserData,
    })

    useEffect(() => {
        setRooms(roomData?.rooms);
        setHostels(hostelData?.hostels);
        setLands(landData?.lands);
        setUser(userData?.user)
        //eslint-disable-next-line
    }, [isRoomLoading, isLandLoading, isHostelLaoding, isUserLoading]);
}

export default useRestore;