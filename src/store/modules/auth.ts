import { create } from 'zustand'

import {
  clearToken,
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
  clearUserInfo,
} from '@/utils/auth'
import { UserRole } from '@/constants/permission'

export interface UserInfo {
  id: string
  username: string
  nickname: string
  role: UserRole
}

interface AuthState {
  token: string
  userInfo: UserInfo | null
  setLogin: (payload: { token: string; userInfo: UserInfo }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken() ?? '',
  userInfo: getUserInfo(),

  setLogin: ({ token, userInfo }) => {
    setToken(token)
    setUserInfo(userInfo)
    set({ token, userInfo })
  },

  logout: () => {
    clearToken()
    clearUserInfo()
    set({ token: '', userInfo: null })
  },
}))
