import { useAuthStore } from "store/auth.store";

export function useAuth() {
    const user = useAuthStore(state => state.user);

    const setUserState = useAuthStore(state => state.setUser);
    const cleanUserState = useAuthStore(state => state.cleanUser);

    function logout() {
        cleanUserState()
    }

    function login(user: { email: string; id: string; name: string }) {
        setUserState(user)
    }

    return { user, isAuth: user !== null, login, logout }
}