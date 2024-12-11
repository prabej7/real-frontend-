import { Room } from '@/constants/types/types';
import { create } from 'zustand';

interface RoomStore {
    rooms: Room[];
    setRooms: (rooms: Room[]) => void
}

const useRooms = create<RoomStore>((set) => ({
    setRooms: (rooms) => {
        set({ rooms });
    },
    rooms: [],
}));

export default useRooms;