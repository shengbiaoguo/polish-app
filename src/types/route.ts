import type { ReactNode } from 'react'

export interface RouteMeta {
  title: string
  requiresAuth?: boolean
  hideInMenu?: boolean
}

export interface MenuItem {
  key: string
  label: string
  path: string
  icon?: ReactNode
}
