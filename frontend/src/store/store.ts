import { create } from 'zustand'

interface AppStore {
    isLoggedIn: boolean
    setLoggedIn: (value: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
    isLoggedIn: !!localStorage.getItem('accessToken'),
    setLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
}))
