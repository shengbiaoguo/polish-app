import type { ReactNode } from 'react'
import type { UserRole } from '@/constants/permission'

export interface AppRouteMeta {
  title: string
  requiresAuth?: boolean
  hideInMenu?: boolean
  roles?: UserRole[]
  icon?: ReactNode
}

export interface AppRouteConfig {
  path: string
  element: ReactNode
  meta: AppRouteMeta
  children?: AppRouteConfig[]
}
