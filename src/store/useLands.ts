import { Land } from '@/constants/types/types';
import { create } from 'zustand';

interface LandStore {
    lands: Land[];
    setLands: (lands: Land[]) => void
}

const useLands = create<LandStore>((set) => ({
    setLands: (lands) => {
        set({ lands });
    },
    lands: [],
}));

export default useLands;