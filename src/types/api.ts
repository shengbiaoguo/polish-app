export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PaginationParams {
  pageNum: number
  pageSize: number
}

export interface PaginationResult<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}
