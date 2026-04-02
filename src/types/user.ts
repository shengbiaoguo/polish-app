import type { PaginationParams, PaginationResult } from './api'

export interface UserItem {
  id: string
  username: string
  nickname: string
  status: 'enabled' | 'disabled'
}

export interface UserListParams extends PaginationParams {
  keyword?: string
}

export type UserListResult = PaginationResult<UserItem>
