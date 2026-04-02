import { STORAGE_TOKEN_KEY } from '@/constants/app'
import { storage } from './storage'

export const getToken = () => storage.getItem<string>(STORAGE_TOKEN_KEY)

export const setToken = (token: string) => {
  storage.setItem(STORAGE_TOKEN_KEY, token)
}

export const clearToken = () => {
  storage.removeItem(STORAGE_TOKEN_KEY)
}

export const isLoggedIn = () => Boolean(getToken())
