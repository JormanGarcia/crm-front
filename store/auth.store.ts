import create from 'zustand'
import { persist } from 'zustand/middleware'


interface IUserState {
    id: string;
    name: string;
    email: string
}

interface IAuthStore {
    user: IUserState | null;
    setUser: (user: IUserState) => void;
    cleanUser: () => void
}



export const useAuthStore = create(
    persist<IAuthStore>((set) => ({
        user: null,
        setUser: (user) => set({
            user: {
                ...user
            }
        }),
        cleanUser: () => set({
            user: null
        })
    }), {
        name: "auth",
    })
)