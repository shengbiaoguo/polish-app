import type { AxiosRequestConfig } from 'axios'

import { http } from './http'
import type { ApiResponse } from '@/types/api'

export const request = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return http.get<never, ApiResponse<T>>(url, config)
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return http.post<unknown, ApiResponse<T>>(url, data, config)
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return http.put<unknown, ApiResponse<T>>(url, data, config)
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return http.delete<never, ApiResponse<T>>(url, config)
  },
}
