import { useAuthStore } from "store/auth.store";

export function useAuth() {
    const user = useAuthStore(state => state.user);

    const setUserState = useAuthStore(state => state.setUser);
    const cleanUserState = useAuthStore(state => state.cleanUser);

    function logout() {
        cleanUserState()
    }

    function login() {
        setUserState({
            email: "Jormanjgl0@gmail.com",
            id: "1",
            name: "Jorman Garcia"
        })
    }

    return { user, isAuth: user !== null, login, logout }
}