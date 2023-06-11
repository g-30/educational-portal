import { create } from 'zustand'

interface AppStore {
    isLoggedIn: boolean
    setLoggedIn: (value: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
    isLoggedIn: false,
    setLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
}))
