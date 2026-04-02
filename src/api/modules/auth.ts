import { request } from '@/api/request'
import { ADMIN_BASE_URL } from '@/constants/app'
import type { LoginParams, LoginResult } from '@/types/auth'

export const loginApi = (params: LoginParams) => {
  return request.post<LoginResult>('/auth/login', params, ADMIN_BASE_URL)
}
