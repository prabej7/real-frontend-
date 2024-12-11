import { User } from '@/constants/types/types';
import { create } from 'zustand';

interface UserStore {
    user: User;
    setUser: (user: User) => void
}

const useUser = create<UserStore>((set) => ({

    user: {
        address: "",
        avatar: "",
        createdAt: "",
        email: "",
        fullName: "",
        id: "",
        lat: 0,
        lon: 0,
        password: "",
        phone: "",
        role: "",
        updatedAt: "",
        username: "",
        verified: false
    },
    setUser: (user) => set({ user })

}));

export default useUser;