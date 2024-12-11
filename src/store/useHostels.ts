import { Hostel } from '@/constants/types/types';
import { create } from 'zustand';

interface HostelStore {
    hostels: Hostel[];
    setHostels: (hostels: Hostel[]) => void
}

const useHostels = create<HostelStore>((set) => ({
    setHostels: (hostels) => {
        set({ hostels });
    },
    hostels: [],
}));

export default useHostels;