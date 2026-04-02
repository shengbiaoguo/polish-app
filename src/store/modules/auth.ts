import { create } from 'zustand'

import { clearToken, getToken, setToken } from '@/utils/auth'

export interface UserInfo {
  id: string
  username: string
  nickname: string
}

interface AuthState {
  token: string
  userInfo: UserInfo | null
  setLogin: (payload: { token: string; userInfo: UserInfo }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken() ?? '',
  userInfo: null,

  setLogin: ({ token, userInfo }) => {
    setToken(token)
    set({ token, userInfo })
  },

  logout: () => {
    clearToken()
    set({ token: '', userInfo: null })
  },
}))
