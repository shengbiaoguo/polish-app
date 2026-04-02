import axios from 'axios'
import { message } from 'antd'

import { clearToken, getToken } from '@/utils/auth'

export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

http.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

http.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 0) {
      message.error(res.message || '请求失败')

      if (res.code === 401) {
        clearToken()
        window.location.href = '/login'
      }

      return Promise.reject(res)
    }

    return res
  },
  (error) => {
    const errorMessage = error?.response?.data?.message || error?.message || '网络异常，请稍后重试'

    message.error(errorMessage)

    if (error?.response?.status === 401) {
      clearToken()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)
