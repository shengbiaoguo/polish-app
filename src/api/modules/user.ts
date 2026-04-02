import { request } from '@/api/request'
import { USER_BASE_URL } from '@/constants/app'
import type { UserListParams, UserListResult } from '@/types/user'

export const getUserListApi = (params: UserListParams) => {
  return request.get<UserListResult>('/users', {
    params,
    ...USER_BASE_URL,
  })
}
