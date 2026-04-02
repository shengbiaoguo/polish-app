import { STORAGE_TOKEN_KEY, STORAGE_USER_INFO_KEY } from '@/constants/app'
import { storage } from './storage'
import type { UserInfo } from '@/store/modules/auth'

export const getToken = () => storage.getItem<string>(STORAGE_TOKEN_KEY)

export const setToken = (token: string) => {
  storage.setItem(STORAGE_TOKEN_KEY, token)
}

export const clearToken = () => {
  storage.removeItem(STORAGE_TOKEN_KEY)
}

export const getUserInfo = () => storage.getItem<UserInfo>(STORAGE_USER_INFO_KEY)

export const setUserInfo = (userInfo: UserInfo) => {
  storage.setItem(STORAGE_USER_INFO_KEY, userInfo)
}

export const clearUserInfo = () => {
  storage.removeItem(STORAGE_USER_INFO_KEY)
}

export const isLoggedIn = () => Boolean(getToken())
